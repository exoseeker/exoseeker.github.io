import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface AIConfidenceCardProps {
  classification: string;
  confidence: number;
}

export const AIConfidenceCard = ({ classification, confidence }: AIConfidenceCardProps) => {
  const getIcon = () => {
    if (classification === "Confirmed Planet") return <CheckCircle className="text-green-500" size={32} />;
    if (classification === "Candidate") return <AlertCircle className="text-yellow-500" size={32} />;
    return <XCircle className="text-red-500" size={32} />;
  };

  const getConfidenceColor = () => {
    if (confidence >= 90) return "bg-green-500";
    if (confidence >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="glass-card p-6 cosmic-glow">
      <div className="flex items-center gap-4 mb-4">
        {getIcon()}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-foreground mb-1">{classification}</h3>
          <p className="text-sm text-muted-foreground">AI Analysis Result</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Confidence Level</span>
          <span className="text-lg font-bold text-primary">{confidence}%</span>
        </div>
        <Progress value={confidence} className="h-3" indicatorClassName={getConfidenceColor()} />
      </div>

      <div className="mt-4 p-3 rounded-lg bg-muted/20 border border-border/30">
        <p className="text-sm text-muted-foreground">
          Based on orbital parameters, transit characteristics, and stellar properties, 
          the AI model has classified this object with {confidence}% confidence.
        </p>
      </div>
    </Card>
  );
};