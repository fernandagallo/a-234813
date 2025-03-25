
import { File, Shield, Eye, Key } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatusColor, getActionColor } from "@/utils/statusUtils";

// Arquivo de dados mockados - em um ambiente real, seria integrado com API
const filesData = [
  {
    id: 1,
    name: "Relatório Financeiro Q1.pdf",
    user: "Ana Silva",
    department: "Financeiro",
    classification: "Confidencial",
    rules: ["Criptografia", "Acesso Restrito"],
    actions: "Criptografar",
    complianceStatus: "Em Risco"
  },
  {
    id: 2,
    name: "Contrato Cliente A.docx",
    user: "Carlos Mendes",
    department: "Legal",
    classification: "Restrito",
    rules: ["Retenção 5 Anos", "Assinatura Digital"],
    actions: "Monitorar",
    complianceStatus: "Atendido"
  },
  {
    id: 3,
    name: "Dados Pessoais Clientes.xlsx",
    user: "Juliana Costa",
    department: "Marketing",
    classification: "Sensível",
    rules: ["Pseudonimização", "Acesso Limitado"],
    actions: "Restringir Acesso",
    complianceStatus: "Não Atendido"
  },
  {
    id: 4,
    name: "Estratégia Produto 2023.pptx",
    user: "Roberto Alves",
    department: "Produto",
    classification: "Interno",
    rules: ["Backup Diário", "Versionamento"],
    actions: "Monitorar",
    complianceStatus: "Atendido"
  },
  {
    id: 5,
    name: "Folha de Pagamento Dez.xlsx",
    user: "Patricia Lima",
    department: "RH",
    classification: "Confidencial",
    rules: ["Criptografia", "Acesso RH"],
    actions: "Criptografar",
    complianceStatus: "Em Risco"
  },
  {
    id: 6,
    name: "Código Fonte Sistema Principal.zip",
    user: "Eduardo Santos",
    department: "TI",
    classification: "Crítico",
    rules: ["Permissão Apenas TI", "Assinatura"],
    actions: "Criptografar",
    complianceStatus: "Atendido"
  },
  {
    id: 7,
    name: "Base de Dados Clientes.csv",
    user: "Mariana Oliveira",
    department: "Vendas",
    classification: "Sensível",
    rules: ["Mascaramento", "Controle Acesso"],
    actions: "Restringir Acesso",
    complianceStatus: "Não Atendido"
  },
  {
    id: 8,
    name: "Política de Privacidade.pdf",
    user: "Felipe Costa",
    department: "Compliance",
    classification: "Público",
    rules: ["Revisão Anual", "Disponibilidade"],
    actions: "Monitorar",
    complianceStatus: "Atendido"
  }
];

// Função para obter a cor da classificação
const getClassificationColor = (classification: string): string => {
  switch (classification) {
    case 'Crítico':
    case 'Confidencial':
      return 'text-red-500';
    case 'Sensível':
    case 'Restrito':
      return 'text-amber-500';
    case 'Interno':
      return 'text-blue-500';
    case 'Público':
      return 'text-green-500';
    default:
      return '';
  }
};

const FilesTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Catálogo de Arquivos</h2>
          <p className="text-muted-foreground">
            Gerenciamento e visualização de arquivos e suas políticas de segurança
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Arquivos</CardTitle>
            <File className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filesData.length}</div>
            <p className="text-xs text-muted-foreground">
              Arquivos cadastrados no sistema
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Arquivos Críticos/Confidenciais</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filesData.filter(file => 
                file.classification === 'Crítico' || file.classification === 'Confidencial'
              ).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Arquivos com classificação de alta segurança
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Arquivos Não Conformes</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filesData.filter(file => file.complianceStatus === 'Não Atendido' || file.complianceStatus === 'Em Risco').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Arquivos que precisam de atenção
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventário de Arquivos</CardTitle>
          <CardDescription>
            Relação completa dos arquivos corporativos e suas classificações de segurança
          </CardDescription>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {filesData.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="font-medium">{file.name}</TableCell>
                  <TableCell>{file.user}</TableCell>
                  <TableCell>{file.department}</TableCell>
                  <TableCell className={getClassificationColor(file.classification)}>
                    {file.classification}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {file.rules.map((rule, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-800"
                        >
                          {rule}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className={getActionColor(file.actions)}>{file.actions}</TableCell>
                  <TableCell className={getStatusColor(file.complianceStatus)}>{file.complianceStatus}</TableCell>
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
