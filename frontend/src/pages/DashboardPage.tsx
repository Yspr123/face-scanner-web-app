import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useFaces } from '@/hooks/useFaces';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Scan, Users, Brain, TrendingUp } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { userEmail } = useAuth();
  const { data: facesData } = useFaces();

  const stats = [
    {
      title: 'Registered Faces',
      value: facesData?.faces?.length || 0,
      description: 'Total faces in your collection',
      icon: Users,
      color: 'text-primary',
    },
    {
      title: 'Recognition Ready',
      value: (facesData?.faces?.length || 0) > 0 ? 'Yes' : 'No',
      description: 'System ready for face recognition',
      icon: Brain,
      color: (facesData?.faces?.length || 0) > 0 ? 'text-success' : 'text-warning',
    },
  ];

  const quickActions = [
    {
      title: 'Register New Face',
      description: 'Add a new face to your collection',
      icon: UserPlus,
      href: '/register',
      color: 'bg-gradient-primary',
    },
    {
      title: 'Recognize Face',
      description: 'Identify faces using AI recognition',
      icon: Scan,
      href: '/recognize',
      color: 'bg-gradient-scan',
    },
    {
      title: 'View All Faces',
      description: 'Browse your registered faces',
      icon: Users,
      href: '/faces',
      color: 'bg-secondary',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">
          Hello {userEmail}, ready to work with face recognition?
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title} className="card-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <IconComponent className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}

        {/* Trend Card */}
        <Card className="card-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Active</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <Card key={action.title} className="card-glow hover:shadow-glow transition-smooth group">
                <CardHeader>
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-bounce`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to={action.href}>Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Getting Started */}
      {(!facesData?.faces || facesData.faces.length === 0) && (
        <Card className="card-glow border-accent/50">
          <CardHeader>
            <CardTitle className="text-lg">🚀 Getting Started</CardTitle>
            <CardDescription>
              Welcome to FaceAI! Follow these steps to set up your face recognition system.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">1</span>
              </div>
              <span className="text-sm">Register your first face to get started</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                <span className="text-xs text-muted-foreground font-bold">2</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Try face recognition with your registered faces
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                <span className="text-xs text-muted-foreground font-bold">3</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Manage and organize your face collection
              </span>
            </div>
            <div className="mt-4">
              <Button asChild className="bg-gradient-primary">
                <Link to="/register">Register Your First Face</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardPage;