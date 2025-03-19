
import React from 'react';
import { FileKey, Key, Eye } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { actionsData } from '@/data/mockData';
import { getActionColor } from '@/utils/statusUtils';
import CustomerRequests from '@/components/CustomerRequests';

const ActionsTab = () => {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Ações Prioritárias para Proteção de Dados</h1>
        <p className="text-dashboard-muted">Ações recomendadas para mitigar riscos identificados</p>
      </header>
      
      <div className="dashboard-card mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hash</TableHead>
              <TableHead>URI</TableHead>
              <TableHead>Tamanho</TableHead>
              <TableHead>Permissões</TableHead>
              <TableHead>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actionsData.map((action, index) => (
              <TableRow key={index}>
                <TableCell className="font-mono">{action.hash}</TableCell>
                <TableCell className="max-w-xs truncate">{action.uri}</TableCell>
                <TableCell>{action.size}</TableCell>
                <TableCell>{action.permissions}</TableCell>
                <TableCell className={getActionColor(action.action)}>{action.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-4">
            <FileKey className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-medium">Criptografar</h2>
          </div>
          <p className="text-4xl font-bold text-purple-500">8</p>
          <p className="text-dashboard-muted mt-2">Arquivos a criptografar</p>
        </div>
        
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-4">
            <Key className="w-5 h-5 text-red-400" />
            <h2 className="text-xl font-medium">Restringir Acesso</h2>
          </div>
          <p className="text-4xl font-bold text-red-500">12</p>
          <p className="text-dashboard-muted mt-2">Permissões a modificar</p>
        </div>
        
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-medium">Monitorar</h2>
          </div>
          <p className="text-4xl font-bold text-blue-500">7</p>
          <p className="text-dashboard-muted mt-2">Arquivos a monitorar</p>
        </div>
      </div>
    </>
  );
};

export default ActionsTab;
