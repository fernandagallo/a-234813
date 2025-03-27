
import React, { useState } from 'react';
import { FileKey, Key, Eye, Check } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { actionsData } from '@/data/mockData';
import { getActionColor } from '@/utils/statusUtils';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock user and department data to match with the documents
const userAssignments = [
  { hash: "3f8a9b2c1d...", username: "Ana Silva", department: "Segurança" },
  { hash: "7d4e2f1a9c...", username: "Carlos Mendes", department: "RH" },
  { hash: "2c5d8e3f1a...", username: "Juliana Costa", department: "Legal" },
  { hash: "9a3b5c7d2e...", username: "Roberto Alves", department: "Marketing" },
  { hash: "1e4f7a9d3b...", username: "Patricia Lima", department: "Compliance" },
];

const ActionsTab = () => {
  const filesToEncrypt = actionsData.filter(action => action.action === 'Criptografar');
  const { toast } = useToast();
  const [regularizedFiles, setRegularizedFiles] = useState<string[]>([]);
  
  // Function to find user assignment by hash
  const getUserAssignment = (hash) => {
    return userAssignments.find(user => user.hash === hash) || { username: "Não atribuído", department: "N/A" };
  };
  
  const handleRegularize = (hash: string, action: string) => {
    setRegularizedFiles(prev => [...prev, hash]);
    
    toast({
      title: "Arquivo regularizado",
      description: `A ação "${action}" foi aplicada com sucesso.`,
    });
  };
  
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Ações Prioritárias para Proteção de Dados</h1>
        <p className="text-dashboard-muted">Ações recomendadas para mitigar riscos identificados</p>
      </header>
      
      <div className="dashboard-card mb-6 relative">
        <div className="absolute top-2 right-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-500 hover:text-purple-700">
                <Eye className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h3 className="font-medium text-purple-500 flex items-center gap-2">
                  <FileKey className="h-4 w-4" /> 
                  Arquivos a Criptografar
                </h3>
                <ul className="text-sm space-y-1">
                  {filesToEncrypt.map((file, idx) => (
                    <li key={idx} className="truncate hover:text-purple-500">
                      {file.uri} <span className="text-xs text-gray-500">({file.size})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Hash</TableHead>
              <TableHead>URI</TableHead>
              <TableHead>Tamanho</TableHead>
              <TableHead>Permissões</TableHead>
              <TableHead>Ação</TableHead>
              <TableHead>Regularizar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actionsData.map((action, index) => {
              const { username, department } = getUserAssignment(action.hash);
              const needsRegularization = action.action === 'Criptografar' || action.action === 'Restringir Acesso';
              const isRegularized = regularizedFiles.includes(action.hash);
              
              return (
                <TableRow key={index}>
                  <TableCell>{username}</TableCell>
                  <TableCell>{department}</TableCell>
                  <TableCell className="font-mono">{action.hash}</TableCell>
                  <TableCell className="max-w-xs truncate">{action.uri}</TableCell>
                  <TableCell>{action.size}</TableCell>
                  <TableCell>{action.permissions}</TableCell>
                  <TableCell className={getActionColor(action.action)}>{action.action}</TableCell>
                  <TableCell>
                    {needsRegularization && !isRegularized ? (
                      <Button 
                        size="sm" 
                        onClick={() => handleRegularize(action.hash, action.action)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Regularizar
                      </Button>
                    ) : isRegularized ? (
                      <span className="inline-flex items-center text-green-500">
                        <Check className="h-4 w-4 mr-1" /> Regularizado
                      </span>
                    ) : null}
                  </TableCell>
                </TableRow>
              );
            })}
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
