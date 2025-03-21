
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { sharedFiles, userDepartments } from '@/data/insightsData';
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, File, FileText, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

const securityLevelColors = {
  "Alto": "bg-red-100 text-red-800 hover:bg-red-100/80",
  "Médio": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
  "Baixo": "bg-green-100 text-green-800 hover:bg-green-100/80"
};

const securityIcons = {
  "Alto": <ShieldAlert className="h-3.5 w-3.5 mr-1" />,
  "Médio": <Shield className="h-3.5 w-3.5 mr-1" />,
  "Baixo": <ShieldCheck className="h-3.5 w-3.5 mr-1" />
};

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

const FileShareTable = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    key: 'shareCount', 
    direction: 'desc' 
  });

  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction: 
        sortConfig.key === key && sortConfig.direction === 'desc'
          ? 'asc'
          : 'desc',
    });
  };

  const sortedFiles = [...sharedFiles].sort((a, b) => {
    if (sortConfig.key === 'shareCount') {
      return sortConfig.direction === 'asc'
        ? a.shareCount - b.shareCount
        : b.shareCount - a.shareCount;
    } else if (sortConfig.key === 'securityLevel') {
      const securityLevels = { 'Alto': 3, 'Médio': 2, 'Baixo': 1 };
      const levelA = securityLevels[a.securityLevel as keyof typeof securityLevels];
      const levelB = securityLevels[b.securityLevel as keyof typeof securityLevels];
      return sortConfig.direction === 'asc'
        ? levelA - levelB
        : levelB - levelA;
    }
    return 0;
  });

  return (
    <div className="dashboard-card p-6">
      <h2 className="text-xl font-medium mb-6">Arquivos Compartilhados</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Arquivo</TableHead>
              <TableHead>Hash</TableHead>
              <TableHead>Usuários</TableHead>
              <TableHead>Setores</TableHead>
              <TableHead onClick={() => handleSort('securityLevel')} className="cursor-pointer">
                <div className="flex items-center">
                  Nível de Segurança
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort('shareCount')} className="cursor-pointer">
                <div className="flex items-center">
                  Compartilhamentos
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedFiles.map((file) => {
              // Extrair departamentos únicos dos usuários
              const departments = Array.from(
                new Set(file.users.map(user => userDepartments[user as keyof typeof userDepartments]))
              );
              
              return (
                <TableRow key={file.hash}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    {file.filename}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{file.hash}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {file.users.map((user, index) => (
                        <span key={index}>{user}</span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {departments.map((dept, index) => (
                        <span key={index}>{dept}</span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={securityLevelColors[file.securityLevel as keyof typeof securityLevelColors]}
                    >
                      {securityIcons[file.securityLevel as keyof typeof securityIcons]}
                      {file.securityLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{file.shareCount}</span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FileShareTable;
