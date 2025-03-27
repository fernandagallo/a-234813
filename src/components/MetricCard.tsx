
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
    <div className="flex flex-col h-full">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm h-full flex flex-col">
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-24 h-24">
            <CircularProgressbar
              value={percentage}
              text={displayValue}
              styles={buildStyles({
                textSize: '1.25rem',
                pathColor: color,
                textColor: color,
                trailColor: 'rgba(200,200,200,0.3)',
              })}
            />
          </div>
        </div>
        <h3 className="text-lg font-medium text-center">{title}</h3>
        {total && (
          <p className="text-sm text-gray-500 text-center mt-1">
            {value} de {total} {unit !== '%' ? unit : ''}
          </p>
        )}
        {action && <div className="mt-auto pt-3 flex justify-center">{action}</div>}
      </div>
    </div>
  );
};

export default MetricCard;
