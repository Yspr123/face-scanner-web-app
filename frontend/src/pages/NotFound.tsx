import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, Brain } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Logo */}
        <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-glow">
          <Brain className="w-8 h-8 text-white" />
        </div>

        {/* Error Content */}
        <Card className="card-glow">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <h1 className="text-6xl font-bold gradient-text">404</h1>
              <h2 className="text-xl font-semibold text-foreground">Page Not Found</h2>
              <p className="text-muted-foreground">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <div className="text-xs text-muted-foreground bg-secondary/50 rounded p-2">
              <span className="font-mono">{location.pathname}</span>
            </div>

            <div className="flex flex-col space-y-2 pt-4">
              <Button asChild className="bg-gradient-primary">
                <Link to="/dashboard">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </Link>
              </Button>
              
              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>

            <div className="text-xs text-muted-foreground pt-2">
              <p>If you believe this is an error, please contact support.</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Link 
            to="/register" 
            className="text-muted-foreground hover:text-foreground transition-smooth"
          >
            Register Face
          </Link>
          <Link 
            to="/recognize" 
            className="text-muted-foreground hover:text-foreground transition-smooth"
          >
            Recognize Face
          </Link>
          <Link 
            to="/faces" 
            className="text-muted-foreground hover:text-foreground transition-smooth"
          >
            My Faces
          </Link>
          <Link 
            to="/login" 
            className="text-muted-foreground hover:text-foreground transition-smooth"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
