import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecogniseFace } from '@/hooks/useFaces';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FaceInput from '@/components/FaceInput';
import ResultCard from '@/components/ResultCard';
import { Scan, RotateCcw, UserPlus } from 'lucide-react';

const RecognizePage: React.FC = () => {
  const [faceData, setFaceData] = useState<string | null>(null);
  const [result, setResult] = useState<{
    name: string;
    face_match_ratio: number;
  } | null>(null);

  const recognizeFace = useRecogniseFace();

  const handleRecognize = async () => {
    if (!faceData) return;

    try {
      const response = await recognizeFace.mutateAsync({ face_data: faceData });
      setResult(response);
    } catch (error: any) {
      // Handle 404 case (no faces registered)
      if (error.response?.status === 404) {
        setResult(null);
      }
    }
  };

  const resetRecognition = () => {
    setFaceData(null);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Face Recognition</h1>
        <p className="text-muted-foreground">
          Identify faces using AI-powered recognition
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Face Input */}
        {!result && (
          <>
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scan className="w-5 h-5 text-primary" />
                  Capture Face for Recognition
                </CardTitle>
                <CardDescription>
                  Use your camera or upload an image to identify the person
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FaceInput
                  onFaceDataReady={setFaceData}
                  className="w-full"
                />
                
                {faceData && (
                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={handleRecognize}
                      className="bg-gradient-scan shadow-scan px-8"
                      disabled={recognizeFace.isPending}
                    >
                      {recognizeFace.isPending ? 'Analyzing...' : 'Recognize Face'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Loading State */}
            {recognizeFace.isPending && (
              <Card className="card-glow">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-scan rounded-full mx-auto flex items-center justify-center pulse-scan">
                      <Scan className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Analyzing Face...</h3>
                      <p className="text-sm text-muted-foreground">
                        Please wait while we process the image
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Recognition Result */}
        {result && (
          <div className="space-y-6">
            <ResultCard
              name={result.name}
              matchRatio={result.face_match_ratio}
              className="max-w-md mx-auto"
            />

            <div className="flex justify-center space-x-4">
              <Button onClick={resetRecognition} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Another
              </Button>
              
              <Button asChild className="bg-gradient-primary">
                <Link to="/register">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register New Face
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* No Faces Registered Error */}
        {recognizeFace.isError && recognizeFace.error?.response?.status === 404 && (
          <Card className="border-warning/50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-warning/20 rounded-full mx-auto flex items-center justify-center">
                  <UserPlus className="w-8 h-8 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold">No Faces Registered</h3>
                  <p className="text-sm text-muted-foreground">
                    You need to register at least one face before using recognition.
                  </p>
                </div>
                <Button asChild className="bg-gradient-primary">
                  <Link to="/register">Register Your First Face</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Tips */}
        <Card className="border-accent/50">
          <CardContent className="pt-4">
            <h4 className="font-semibold text-sm mb-2">🎯 Recognition Tips:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Use clear, well-lit images for better accuracy</li>
              <li>• Face should be facing forward and clearly visible</li>
              <li>• Higher match ratios indicate better confidence</li>
              <li>• Results above 70% are generally reliable</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecognizePage;