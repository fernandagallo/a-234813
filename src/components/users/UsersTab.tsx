
import React from 'react';
import { ShieldAlert, ScanSearch, Eye, Lock } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { risksData } from '@/data/mockData';
import { getStatusColor } from '@/utils/statusUtils';

const UsersTab = () => {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Principais Riscos Identificados</h1>
        <p className="text-dashboard-muted">Documentos com maiores riscos de segurança e privacidade</p>
      </header>
      
      <div className="dashboard-card mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hash</TableHead>
              <TableHead>URI</TableHead>
              <TableHead>Idioma</TableHead>
              <TableHead>Nível de Risco</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {risksData.map((risk, index) => (
              <TableRow key={index}>
                <TableCell className="font-mono">{risk.hash}</TableCell>
                <TableCell className="max-w-xs truncate">{risk.uri}</TableCell>
                <TableCell>{risk.language}</TableCell>
                <TableCell className={getStatusColor(risk.riskLevel)}>{risk.riskLevel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <h2 className="text-xl font-medium">Riscos Críticos</h2>
          </div>
          <p className="text-4xl font-bold text-red-500">2</p>
          <p className="text-dashboard-muted mt-2">Requerem ação imediata</p>
        </div>
        
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-4">
            <ScanSearch className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-medium">Riscos Altos</h2>
          </div>
          <p className="text-4xl font-bold text-amber-500">5</p>
          <p className="text-dashboard-muted mt-2">Requerem atenção prioritária</p>
        </div>
        
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl font-medium">Riscos Médios</h2>
          </div>
          <p className="text-4xl font-bold text-yellow-500">12</p>
          <p className="text-dashboard-muted mt-2">Requerem monitoramento</p>
        </div>
        
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-green-400" />
            <h2 className="text-xl font-medium">Riscos Baixos</h2>
          </div>
          <p className="text-4xl font-bold text-green-500">8</p>
          <p className="text-dashboard-muted mt-2">Sob controle</p>
        </div>
      </div>
    </>
  );
};

export default UsersTab;
