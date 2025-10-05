import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from './ui/card';

interface LightCurveChartProps {
  data: Array<{ time: number; flux: number; error: number }>;
}

export const LightCurveChart = ({ data }: LightCurveChartProps) => {
  return (
    <Card className="glass-card p-6">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Light Curve Analysis</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Transit detection showing flux dimming when planet passes in front of star
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="time"
            label={{ value: 'Time (days)', position: 'insideBottom', offset: -5 }}
            stroke="hsl(var(--muted-foreground))"
          />
          <YAxis
            label={{ value: 'Normalized Flux', angle: -90, position: 'insideLeft' }}
            stroke="hsl(var(--muted-foreground))"
            domain={[0.996, 1.001]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
              backdropFilter: 'blur(12px)'
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Line
            type="monotone"
            dataKey="flux"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};