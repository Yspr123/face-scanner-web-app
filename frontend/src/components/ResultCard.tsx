import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, User } from 'lucide-react';

interface ResultCardProps {
  name: string;
  matchRatio: number;
  className?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ name, matchRatio, className }) => {
  const getMatchLevel = (ratio: number) => {
    if (ratio >= 80) return { level: 'excellent', color: 'bg-success', icon: CheckCircle };
    if (ratio >= 60) return { level: 'good', color: 'bg-accent', icon: CheckCircle };
    if (ratio >= 40) return { level: 'fair', color: 'bg-warning', icon: AlertCircle };
    return { level: 'poor', color: 'bg-destructive', icon: AlertCircle };
  };

  const match = getMatchLevel(matchRatio);
  const IconComponent = match.icon;

  return (
    <Card className={`card-glow ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <span>Recognition Result</span>
          </div>
          <Badge variant={matchRatio >= 60 ? 'default' : 'destructive'} className="flex items-center gap-1">
            <IconComponent className="w-3 h-3" />
            {match.level.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
          <div className="text-3xl font-bold gradient-text">
            {matchRatio.toFixed(1)}%
          </div>
          <p className="text-sm text-muted-foreground mt-1">Match Confidence</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Confidence Level</span>
            <span className="font-medium">{matchRatio.toFixed(1)}%</span>
          </div>
          <Progress value={matchRatio} className="h-2" />
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Recognition Quality</span>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${match.color}`} />
              <span className="capitalize">{match.level}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;