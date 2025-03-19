
import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { MoreHorizontal, FileKey, Key, Eye } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface CustomerRequestsProps {
  type?: 'actions' | 'compliance';
  title?: string;
  description?: string;
}

const CustomerRequests = ({ 
  type, 
  title = "Análise de Documentos",
  description = "Selecione uma análise específica para visualizar detalhes sobre os documentos processados."
}: CustomerRequestsProps) => {
  
  // Dados fictícios para mostrar nos tooltips
  const actionFiles = {
    encrypt: [
      { name: '/storage/finance/2023/q4-report.pdf', hash: '3f8a9b2c1d...' },
      { name: '/storage/legal/compliance/gdpr-audit.pdf', hash: '1e4f7a9d3b...' }
    ],
    restrict: [
      { name: '/storage/hr/employees/personal-data.xlsx', hash: '7d4e2f1a9c...' },
      { name: '/storage/marketing/campaign-analytics.xlsx', hash: '9a3b5c7d2e...' }
    ],
    monitor: [
      { name: '/storage/contracts/nda-2023.docx', hash: '2c5d8e3f1a...' }
    ]
  };
  
  const complianceFiles = [
    { name: '/storage/finance/2023/q4-report.pdf', regulation: 'LGPD', requirement: 'Armazenamento Seguro', hash: '3f8a9b2c1d...' },
    { name: '/storage/hr/employees/personal-data.xlsx', regulation: 'GDPR', requirement: 'Consentimento', hash: '7d4e2f1a9c...' },
    { name: '/storage/legal/compliance/gdpr-audit.pdf', regulation: 'LGPD', requirement: 'Relatório de Impacto', hash: '1e4f7a9d3b...' }
  ];

  const renderTooltipContent = () => {
    if (type === 'actions') {
      return (
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem className="flex flex-col items-start">
            <span className="font-medium flex items-center mb-2 text-purple-500">
              <FileKey className="w-4 h-4 mr-2" /> Arquivos para Criptografar
            </span>
            <ul className="text-xs space-y-1 w-full">
              {actionFiles.encrypt.map((file, idx) => (
                <li key={idx} className="truncate hover:text-purple-500">
                  {file.name}
                </li>
              ))}
            </ul>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex flex-col items-start mt-2">
            <span className="font-medium flex items-center mb-2 text-red-500">
              <Key className="w-4 h-4 mr-2" /> Arquivos para Restringir Acesso
            </span>
            <ul className="text-xs space-y-1 w-full">
              {actionFiles.restrict.map((file, idx) => (
                <li key={idx} className="truncate hover:text-red-500">
                  {file.name}
                </li>
              ))}
            </ul>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex flex-col items-start mt-2">
            <span className="font-medium flex items-center mb-2 text-blue-500">
              <Eye className="w-4 h-4 mr-2" /> Arquivos para Monitorar
            </span>
            <ul className="text-xs space-y-1 w-full">
              {actionFiles.monitor.map((file, idx) => (
                <li key={idx} className="truncate hover:text-blue-500">
                  {file.name}
                </li>
              ))}
            </ul>
          </DropdownMenuItem>
        </DropdownMenuContent>
      );
    } else if (type === 'compliance') {
      return (
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem className="flex flex-col items-start">
            <span className="font-medium flex items-center mb-2 text-red-500">
              Requisitos Pendentes
            </span>
            <ul className="text-xs space-y-1 w-full">
              {complianceFiles.map((file, idx) => (
                <li key={idx} className="truncate hover:text-red-500">
                  <span className="font-semibold">{file.regulation}</span>: {file.name}
                </li>
              ))}
            </ul>
          </DropdownMenuItem>
        </DropdownMenuContent>
      );
    }
    
    return null;
  };

  return (
    <div className="w-full h-96 flex items-center justify-center">
      <Card className="w-full h-full p-6 flex flex-col items-center justify-center relative">
        {(type === 'actions' || type === 'compliance') && (
          <div className="absolute top-2 right-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Mais opções</span>
                    </DropdownMenuTrigger>
                    {renderTooltipContent()}
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ver detalhes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
        <h2 className="text-xl font-medium mb-4">{title}</h2>
        <p className="text-center text-muted-foreground">
          {description}
        </p>
      </Card>
    </div>
  );
};

export default CustomerRequests;
