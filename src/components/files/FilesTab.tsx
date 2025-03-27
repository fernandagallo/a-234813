
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatusColor, getActionColor } from "@/utils/statusUtils";
import { Button } from "@/components/ui/button";
import { Shield, Eye, FileText, Lock } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const filesData = [
  {
    name: "relatório-financeiro-q4.pdf",
    user: "Carlos Silva",
    department: "Financeiro",
    classification: "Confidencial",
    rules: "Restrição de Acesso",
    action: "Criptografar",
    compliance: "Em Risco",
    accessLevel: "Padrão"
  },
  {
    name: "dados-funcionários.xlsx",
    user: "Ana Oliveira",
    department: "RH",
    classification: "PII Sensível",
    rules: "Retenção 5 anos",
    action: "Restringir Acesso",
    compliance: "Não Atendido",
    accessLevel: "Restrito"
  },
  {
    name: "contrato-fornecedor.docx",
    user: "Marcos Santos",
    department: "Jurídico",
    classification: "Confidencial",
    rules: "Auditoria Mensal",
    action: "Monitorar",
    compliance: "Atendido",
    accessLevel: "Duplo Fator"
  },
  {
    name: "campanha-marketing.pptx",
    user: "Juliana Costa",
    department: "Marketing",
    classification: "Interno",
    rules: "Acesso Departamental",
    action: "Monitorar",
    compliance: "Atendido",
    accessLevel: "Departamental"
  },
  {
    name: "relatório-auditoria.pdf",
    user: "Roberto Almeida",
    department: "Compliance",
    classification: "Restrito",
    rules: "Backup Diário",
    action: "Criptografar",
    compliance: "Em Risco",
    accessLevel: "Gestor-Aprovação"
  },
  {
    name: "plano-estratégico-2024.xlsx",
    user: "Luisa Mendes",
    department: "Diretoria",
    classification: "Confidencial",
    rules: "Acesso Exclusivo",
    action: "Restringir Acesso",
    compliance: "Atendido",
    accessLevel: "Diretoria"
  },
  {
    name: "base-clientes.csv",
    user: "Fernando Souza",
    department: "Vendas",
    classification: "PII",
    rules: "Retenção 3 anos",
    action: "Criptografar",
    compliance: "Não Atendido",
    accessLevel: "Padrão"
  }
];

const accessLevelOptions = [
  { value: "Padrão", label: "Padrão" },
  { value: "Restrito", label: "Restrito" },
  { value: "Departamental", label: "Departamental" },
  { value: "Duplo Fator", label: "Autenticação de Duplo Fator" },
  { value: "Gestor-Aprovação", label: "Aprovação do Gestor" },
  { value: "Diretoria", label: "Acesso Somente Diretoria" }
];

const FilesTab = () => {
  const [files, setFiles] = useState(filesData);

  const handleAccessLevelChange = (index: number, value: string) => {
    const updatedFiles = [...files];
    updatedFiles[index].accessLevel = value;
    setFiles(updatedFiles);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Arquivos</h1>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Arquivos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Arquivo</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead>Classificação</TableHead>
                <TableHead>Regras Aplicadas</TableHead>
                <TableHead>Ações</TableHead>
                <TableHead>Status de Conformidade</TableHead>
                <TableHead>Nível de Acesso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link" className="p-0 h-auto font-medium">
                          {file.name}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center">
                            <FileText className="mr-2 h-5 w-5" />
                            {file.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Usuário</h3>
                            <p>{file.user}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Departamento</h3>
                            <p>{file.department}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Classificação</h3>
                            <p>{file.classification}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Regras Aplicadas</h3>
                            <p>{file.rules}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Ação Recomendada</h3>
                            <p className={getActionColor(file.action)}>{file.action}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Status de Conformidade</h3>
                            <p className={getStatusColor(file.compliance)}>{file.compliance}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Nível de Acesso</h3>
                            <p>{file.accessLevel}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>{file.user}</TableCell>
                  <TableCell>{file.department}</TableCell>
                  <TableCell>{file.classification}</TableCell>
                  <TableCell>{file.rules}</TableCell>
                  <TableCell className={getActionColor(file.action)}>{file.action}</TableCell>
                  <TableCell className={getStatusColor(file.compliance)}>{file.compliance}</TableCell>
                  <TableCell>
                    <Select
                      value={file.accessLevel}
                      onValueChange={(value) => handleAccessLevelChange(index, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {accessLevelOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilesTab;
