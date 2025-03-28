
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
  // Garantir que value seja um número válido
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  
  // Garantir que total seja um número válido se fornecido
  const safeTotal = typeof total === 'number' && !isNaN(total) && total > 0 ? total : 1;
  
  // Calcular a porcentagem com segurança
  const percentage = total ? Math.round((safeValue / safeTotal) * 100) : safeValue;
  
  // Formatar valor de exibição
  const displayValue = unit === '%' ? `${percentage}${unit}` : `${safeValue}${unit}`;
  
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white dark:bg-dashboard-card border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm h-full flex flex-col">
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
        <h3 className="text-lg font-medium text-center text-gray-800 dark:text-dashboard-text">{title}</h3>
        {total && (
          <p className="text-sm text-gray-500 dark:text-dashboard-muted text-center mt-1">
            {safeValue} de {safeTotal} {unit !== '%' ? unit : ''}
          </p>
        )}
        {action && <div className="mt-auto pt-3 flex justify-center">{action}</div>}
      </div>
    </div>
  );
};

export default MetricCard;
