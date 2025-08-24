import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Upload, Square, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FaceInputProps {
  onFaceDataReady: (base64: string) => void;
  className?: string;
}

const FaceInput: React.FC<FaceInputProps> = ({ onFaceDataReady, className }) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          const cleanBase64 = base64.replace(/^data:[^;]+;base64,/, '');
          setPreviewUrl(base64);
          onFaceDataReady(cleanBase64);
          stopCamera();
        };
        reader.readAsDataURL(blob);
      }
    }, 'image/jpeg', 0.8);
  }, [onFaceDataReady, stopCamera]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const cleanBase64 = base64.replace(/^data:[^;]+;base64,/, '');
      setPreviewUrl(base64);
      onFaceDataReady(cleanBase64);
    };
    reader.readAsDataURL(file);
  }, [onFaceDataReady]);

  const resetCapture = () => {
    setPreviewUrl(null);
    stopCamera();
  };

  return (
    <Card className={`card-glow ${className}`}>
      <CardContent className="p-6">
        <Tabs defaultValue="camera" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="camera" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Camera
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="camera" className="space-y-4">
            <div className="relative">
              {!isStreaming && !previewUrl && (
                <div className="aspect-video bg-secondary/50 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Click to start camera</p>
                  </div>
                </div>
              )}

              {isStreaming && (
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full aspect-video bg-black rounded-lg"
                  />
                  <div className="absolute inset-0 border-2 border-accent rounded-lg pulse-scan" />
                </div>
              )}

              {previewUrl && (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Captured face"
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-scan/20 rounded-lg" />
                </div>
              )}

              <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="flex gap-2 justify-center">
              {!isStreaming && !previewUrl && (
                <Button onClick={startCamera} className="bg-gradient-primary">
                  <Camera className="w-4 h-4 mr-2" />
                  Start Camera
                </Button>
              )}

              {isStreaming && (
                <Button onClick={capturePhoto} className="bg-gradient-scan">
                  <Square className="w-4 h-4 mr-2" />
                  Capture
                </Button>
              )}

              {previewUrl && (
                <Button onClick={resetCapture} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="relative">
              {!previewUrl ? (
                <div
                  className="aspect-video bg-secondary/50 rounded-lg flex items-center justify-center border-2 border-dashed border-border cursor-pointer hover:bg-secondary/70 transition-smooth"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Click to upload image</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 10MB</p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Uploaded face"
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-scan/20 rounded-lg" />
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {previewUrl && (
              <div className="flex justify-center">
                <Button onClick={resetCapture} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Choose Different Image
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FaceInput;