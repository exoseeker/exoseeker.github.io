import { Card } from './ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Info } from 'lucide-react';

interface DataCardProps {
  label: string;
  value: string | number;
  unit?: string;
  tooltip?: string;
}

export const DataCard = ({ label, value, unit, tooltip }: DataCardProps) => {
  return (
    <Card className="glass-card p-4 hover:border-primary/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm text-muted-foreground">{label}</p>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info size={14} className="text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="glass-card">
                <p className="text-xs max-w-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {unit && <p className="text-sm text-muted-foreground">{unit}</p>}
      </div>
    </Card>
  );
};