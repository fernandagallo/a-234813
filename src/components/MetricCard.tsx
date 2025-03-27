
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface MetricCardProps {
  title: string;
  value: number;
  total?: number;
  color: string;
  unit?: string;
  action?: React.ReactNode;
}

const MetricCard = ({ title, value, total, color, unit = '%', action }: MetricCardProps) => {
  const percentage = total ? Math.round((value / total) * 100) : value;
  const displayValue = unit === '%' ? `${percentage}${unit}` : `${value}${unit}`;
  
  return (
    <div className="metric-card">
      <div className="relative w-32 h-32 mb-6">
        <CircularProgressbar
          value={percentage}
          text={displayValue}
          styles={buildStyles({
            textSize: '1.25rem',
            pathColor: color,
            textColor: color,
            trailColor: 'rgba(255,255,255,0.1)',
          })}
        />
      </div>
      <h3 className="text-lg font-medium text-dashboard-text">{title}</h3>
      {total && (
        <p className="text-sm text-dashboard-muted mt-1">
          {value} de {total} {unit !== '%' ? unit : ''}
        </p>
      )}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
};

export default MetricCard;
