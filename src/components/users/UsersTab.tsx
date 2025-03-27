
import React, { useState } from 'react';
import { ShieldAlert, ScanSearch, Eye, Lock } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { risksData } from '@/data/mockData';
import { getStatusColor } from '@/utils/statusUtils';
import GroupsTab from './GroupsTab';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Mock user and department data to match with the risk documents
const userAssignments = [
  { hash: "3f8a9b2c1d...", username: "Ana Silva", department: "Segurança", login: "ana.silva" },
  { hash: "7d4e2f1a9c...", username: "Carlos Mendes", department: "RH", login: "carlos.mendes" },
  { hash: "2c5d8e3f1a...", username: "Juliana Costa", department: "Legal", login: "juliana.costa" },
  { hash: "9a3b5c7d2e...", username: "Roberto Alves", department: "Marketing", login: "roberto.alves" },
  { hash: "1e4f7a9d3b...", username: "Patricia Lima", department: "Compliance", login: "patricia.lima" },
];

// Sample files for each risk category
const criticalFiles = [
  { name: "dados_confidenciais.xlsx", path: "/documentos/financeiro/dados_confidenciais.xlsx" },
  { name: "informacoes_sigilosas.pdf", path: "/documentos/legal/informacoes_sigilosas.pdf" },
];

const highFiles = [
  { name: "relatorio_credenciais.docx", path: "/documentos/ti/relatorio_credenciais.docx" },
  { name: "contratos_fornecedores.pdf", path: "/documentos/compras/contratos_fornecedores.pdf" },
  { name: "auditoria_sistemas.xlsx", path: "/documentos/ti/auditoria_sistemas.xlsx" },
];

const mediumFiles = [
  { name: "plano_marketing.pptx", path: "/documentos/marketing/plano_marketing.pptx" },
  { name: "relatorio_trimestral.xlsx", path: "/documentos/financeiro/relatorio_trimestral.xlsx" },
  { name: "planejamento_rh.docx", path: "/documentos/rh/planejamento_rh.docx" },
];

const lowFiles = [
  { name: "calendario_eventos.pdf", path: "/documentos/marketing/calendario_eventos.pdf" },
  { name: "manual_procedimentos.docx", path: "/documentos/operacoes/manual_procedimentos.docx" },
];

const UsersTab = () => {
  const [selectedRisk, setSelectedRisk] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

  // Function to find user assignment by hash
  const getUserAssignment = (hash: string) => {
    return userAssignments.find(user => user.hash === hash) || { username: "Não atribuído", department: "N/A", login: "n/a" };
  };

  const handleCardClick = (riskLevel: string) => {
    setSelectedRisk(riskLevel);
    
    switch(riskLevel) {
      case "Críticos":
        setSelectedFiles(criticalFiles);
        break;
      case "Altos":
        setSelectedFiles(highFiles);
        break;
      case "Médios":
        setSelectedFiles(mediumFiles);
        break;
      case "Baixos":
        setSelectedFiles(lowFiles);
        break;
      default:
        setSelectedFiles([]);
    }
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
            <Dialog>
              <DialogTrigger asChild>
                <div className="dashboard-card cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleCardClick("Críticos")}>
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldAlert className="w-5 h-5 text-red-400" />
                    <h2 className="text-xl font-medium">Riscos Críticos</h2>
                  </div>
                  <p className="text-4xl font-bold text-red-500">2</p>
                  <p className="text-dashboard-muted mt-2">Requerem ação imediata</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Arquivos com Riscos {selectedRisk}</DialogTitle>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do Arquivo</TableHead>
                      <TableHead>Caminho</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedFiles.map((file, index) => (
                      <TableRow key={index}>
                        <TableCell>{file.name}</TableCell>
                        <TableCell className="font-mono text-xs">{file.path}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">Visualizar</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <div className="dashboard-card cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleCardClick("Altos")}>
                  <div className="flex items-center gap-3 mb-4">
                    <ScanSearch className="w-5 h-5 text-amber-400" />
                    <h2 className="text-xl font-medium">Riscos Altos</h2>
                  </div>
                  <p className="text-4xl font-bold text-amber-500">5</p>
                  <p className="text-dashboard-muted mt-2">Requerem atenção prioritária</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Arquivos com Riscos {selectedRisk}</DialogTitle>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do Arquivo</TableHead>
                      <TableHead>Caminho</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedFiles.map((file, index) => (
                      <TableRow key={index}>
                        <TableCell>{file.name}</TableCell>
                        <TableCell className="font-mono text-xs">{file.path}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">Visualizar</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <div className="dashboard-card cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleCardClick("Médios")}>
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-xl font-medium">Riscos Médios</h2>
                  </div>
                  <p className="text-4xl font-bold text-yellow-500">12</p>
                  <p className="text-dashboard-muted mt-2">Requerem monitoramento</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Arquivos com Riscos {selectedRisk}</DialogTitle>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do Arquivo</TableHead>
                      <TableHead>Caminho</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedFiles.map((file, index) => (
                      <TableRow key={index}>
                        <TableCell>{file.name}</TableCell>
                        <TableCell className="font-mono text-xs">{file.path}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">Visualizar</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <div className="dashboard-card cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleCardClick("Baixos")}>
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-5 h-5 text-green-400" />
                    <h2 className="text-xl font-medium">Riscos Baixos</h2>
                  </div>
                  <p className="text-4xl font-bold text-green-500">8</p>
                  <p className="text-dashboard-muted mt-2">Sob controle</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Arquivos com Riscos {selectedRisk}</DialogTitle>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do Arquivo</TableHead>
                      <TableHead>Caminho</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedFiles.map((file, index) => (
                      <TableRow key={index}>
                        <TableCell>{file.name}</TableCell>
                        <TableCell className="font-mono text-xs">{file.path}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">Visualizar</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>
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
