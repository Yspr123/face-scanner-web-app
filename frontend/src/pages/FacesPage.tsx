import React from 'react';
import { Link } from 'react-router-dom';
import { useFaces } from '@/hooks/useFaces';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, Calendar, Scan } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const FacesPage: React.FC = () => {
  const { data: facesData, isLoading, isError } = useFaces();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">My Faces</h1>
          <p className="text-muted-foreground">Loading your face collection...</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="card-glow animate-pulse">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">My Faces</h1>
          <p className="text-muted-foreground">Error loading faces</p>
        </div>
        
        <Card className="border-destructive/50">
          <CardContent className="pt-6 text-center">
            <p className="text-destructive">Failed to load faces. Please try again.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const faces = facesData?.faces || [];

  if (faces.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">My Faces</h1>
          <p className="text-muted-foreground">Your face collection</p>
        </div>

        {/* Empty State */}
        <Card className="card-glow max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-muted/50 rounded-full mx-auto flex items-center justify-center">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">No Faces Registered</h3>
                <p className="text-sm text-muted-foreground">
                  Get started by registering your first face for recognition.
                </p>
              </div>
              <div className="space-y-2">
                <Button asChild className="w-full bg-gradient-primary">
                  <Link to="/register">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Register First Face
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground">
                  Once registered, you'll be able to use face recognition features.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">My Faces</h1>
          <p className="text-muted-foreground">
            Manage your registered faces ({faces.length} total)
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button asChild variant="outline">
            <Link to="/recognize">
              <Scan className="w-4 h-4 mr-2" />
              Recognize
            </Link>
          </Button>
          <Button asChild className="bg-gradient-primary">
            <Link to="/register">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Face
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Collection Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{faces.length}</div>
              <div className="text-sm text-muted-foreground">Total Faces</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">Active</div>
              <div className="text-sm text-muted-foreground">Recognition Status</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">Ready</div>
              <div className="text-sm text-muted-foreground">System Status</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Faces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faces.map((face, index) => {
          const registeredDate = parseISO(face.created_at);
          
          return (
            <Card key={`${face.name}-${index}`} className="card-glow hover:shadow-glow transition-smooth group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-primary transition-smooth">
                      {face.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      Registered {format(registeredDate, 'MMM dd, yyyy')}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-success">Ready for recognition</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Added:</span>
                      <span>{format(registeredDate, 'h:mm a')}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-border">
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
                    >
                      <Link to="/recognize">
                        <Scan className="w-3 h-3 mr-1" />
                        Use for Recognition
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FacesPage;