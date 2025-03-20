
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { sharingRelationships, departmentSharingStats, departmentColors } from '@/data/insightsData';
import { GitBranch, Share, Users } from 'lucide-react';

const SharingStats = () => {
  // Calcular estatísticas
  const totalConnections = sharingRelationships.length;
  const totalFiles = sharingRelationships.reduce((acc, rel) => acc + rel.files, 0);
  const maxConnection = sharingRelationships.reduce(
    (max, rel) => rel.strength > max ? rel.strength : max, 
    0
  );
  
  // Encontrar os usuários da conexão mais forte
  const strongestConnection = sharingRelationships.find(rel => rel.strength === maxConnection);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-400" />
            <CardTitle>Estatísticas Gerais</CardTitle>
          </div>
          <CardDescription>Resumo de compartilhamentos</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4">
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-dashboard-muted">Total de Conexões:</dt>
              <dd className="text-sm font-bold">{totalConnections}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-dashboard-muted">Arquivos Compartilhados:</dt>
              <dd className="text-sm font-bold">{totalFiles}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-dashboard-muted">Conexão Mais Forte:</dt>
              <dd className="text-sm font-bold">
                {strongestConnection ? 
                  `${strongestConnection.source} → ${strongestConnection.target}` : 
                  'N/A'}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <Share className="w-5 h-5 text-purple-400" />
            <CardTitle>Compartilhamentos</CardTitle>
          </div>
          <CardDescription>Por Departamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentSharingStats.map((dept) => (
              <div key={dept.department} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{dept.department}</span>
                  <span className="text-sm">{dept.filesShared} arquivos</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full" 
                    style={{
                      width: `${(dept.filesShared / 20) * 100}%`,
                      backgroundColor: departmentColors[dept.department as keyof typeof departmentColors] || "#888888"
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <GitBranch className="w-5 h-5 text-green-400" />
            <CardTitle>Distribuição</CardTitle>
          </div>
          <CardDescription>Principais fluxos de dados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sharingRelationships
              .sort((a, b) => b.strength - a.strength)
              .slice(0, 5)
              .map((rel, index) => (
                <div key={index} className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{rel.source}</span>
                    <span className="text-xs">→</span>
                    <span className="text-sm font-medium">{rel.target}</span>
                  </div>
                  <span className="text-sm font-bold">{rel.files} arquivos</span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SharingStats;
