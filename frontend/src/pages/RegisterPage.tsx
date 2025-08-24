import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterFace } from '@/hooks/useFaces';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FormField from '@/components/FormField';
import FaceInput from '@/components/FaceInput';
import { UserPlus, ArrowRight, CheckCircle } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [faceName, setFaceName] = useState('');
  const [faceData, setFaceData] = useState<string | null>(null);
  const [nameError, setNameError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const registerFace = useRegisterFace();
  const navigate = useNavigate();

  const validateName = (name: string) => {
    if (!name.trim()) {
      setNameError('Face name is required');
      return false;
    }
    if (name.length < 2) {
      setNameError('Name must be at least 2 characters');
      return false;
    }
    if (name.length > 50) {
      setNameError('Name must be less than 50 characters');
      return false;
    }
    setNameError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateName(faceName) || !faceData) {
      if (!faceData) {
        // Could add face data error state here
      }
      return;
    }

    try {
      await registerFace.mutateAsync({
        name: faceName.trim(),
        face_data: faceData,
      });
      
      setIsSuccess(true);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFaceName(value);
    if (nameError) {
      validateName(value);
    }
  };

  const resetForm = () => {
    setFaceName('');
    setFaceData(null);
    setNameError('');
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-success rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-success mb-2">Face Registered Successfully!</h1>
          <p className="text-muted-foreground">
            {faceName} has been added to your face collection.
          </p>
        </div>

        <Card className="card-glow max-w-md mx-auto">
          <CardContent className="pt-6 space-y-4">
            <div className="text-center space-y-2">
              <h3 className="font-semibold">What's next?</h3>
              <p className="text-sm text-muted-foreground">
                You can now use face recognition to identify this person.
              </p>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button asChild className="bg-gradient-scan">
                <Link to="/recognize">
                  Try Recognition Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              <Button variant="outline" onClick={resetForm}>
                Register Another Face
              </Button>
              
              <Button variant="ghost" asChild>
                <Link to="/faces">View All Faces</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Register New Face</h1>
        <p className="text-muted-foreground">
          Add a new face to your recognition collection
        </p>
      </div>

      {/* Registration Form */}
      <div className="max-w-2xl mx-auto space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Face Name Input */}
          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-primary" />
                Face Information
              </CardTitle>
              <CardDescription>
                Provide a name to identify this person
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                label="Face Name"
                name="faceName"
                placeholder="Enter person's name (e.g., John Doe)"
                value={faceName}
                onChange={handleNameChange}
                error={nameError}
                required
              />
            </CardContent>
          </Card>

          {/* Face Capture */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Capture Face</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use your camera or upload an image to capture the face data
            </p>
            <FaceInput
              onFaceDataReady={setFaceData}
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              className="bg-gradient-primary shadow-glow px-8"
              disabled={!faceName.trim() || !faceData || registerFace.isPending}
            >
              {registerFace.isPending ? 'Registering...' : 'Register Face'}
            </Button>
          </div>
        </form>

        {/* Help Text */}
        <Card className="border-accent/50">
          <CardContent className="pt-4">
            <h4 className="font-semibold text-sm mb-2">💡 Tips for better recognition:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Ensure good lighting on the face</li>
              <li>• Face should be clearly visible and centered</li>
              <li>• Avoid shadows or strong backlighting</li>
              <li>• Use a neutral expression for best results</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;