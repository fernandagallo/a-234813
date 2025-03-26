
import React from 'react';
import { ShieldAlert, ScanSearch, Eye, Lock } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { risksData } from '@/data/mockData';
import { getStatusColor } from '@/utils/statusUtils';
import GroupsTab from './GroupsTab';

// Mock user and department data to match with the risk documents
const userAssignments = [
  { hash: "3f8a9b2c1d...", username: "Ana Silva", department: "Segurança", login: "ana.silva" },
  { hash: "7d4e2f1a9c...", username: "Carlos Mendes", department: "RH", login: "carlos.mendes" },
  { hash: "2c5d8e3f1a...", username: "Juliana Costa", department: "Legal", login: "juliana.costa" },
  { hash: "9a3b5c7d2e...", username: "Roberto Alves", department: "Marketing", login: "roberto.alves" },
  { hash: "1e4f7a9d3b...", username: "Patricia Lima", department: "Compliance", login: "patricia.lima" },
];

const UsersTab = () => {
  // Function to find user assignment by hash
  const getUserAssignment = (hash) => {
    return userAssignments.find(user => user.hash === hash) || { username: "Não atribuído", department: "N/A", login: "n/a" };
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Gerenciamento de Usuários</h1>
        <p className="text-dashboard-muted">Gerencie usuários e grupos de acesso</p>
      </header>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-6 bg-dashboard-card">
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="groups">Grupos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <h2 className="text-xl font-medium mb-4">Principais Riscos Identificados</h2>
          <p className="text-dashboard-muted mb-6">Documentos com maiores riscos de segurança e privacidade</p>
          
          <div className="dashboard-card mb-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Hash</TableHead>
                  <TableHead>URI</TableHead>
                  <TableHead>Idioma</TableHead>
                  <TableHead>Nível de Risco</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {risksData.map((risk, index) => {
                  const { username, department, login } = getUserAssignment(risk.hash);
                  return (
                    <TableRow key={index}>
                      <TableCell>{username}</TableCell>
                      <TableCell>{login}</TableCell>
                      <TableCell>{department}</TableCell>
                      <TableCell className="font-mono">{risk.hash}</TableCell>
                      <TableCell className="max-w-xs truncate">{risk.uri}</TableCell>
                      <TableCell>{risk.language}</TableCell>
                      <TableCell className={getStatusColor(risk.riskLevel)}>{risk.riskLevel}</TableCell>
                    </TableRow>
                  );
                })}
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
        </TabsContent>
        
        <TabsContent value="groups">
          <GroupsTab />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default UsersTab;
