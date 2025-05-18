
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export function StatusCard({ title, value, icon, trend, trendValue, className = '' }: StatusCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-archon-success';
      case 'down': return 'text-archon-danger';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  };

  return (
    <Card className={`overflow-hidden glass-card ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end">
          <div className="text-2xl font-bold text-archon-primary">{value}</div>
          {trend && trendValue && (
            <div className={`text-xs flex items-center gap-1 ${getTrendColor()}`}>
              <span>{getTrendIcon()}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
