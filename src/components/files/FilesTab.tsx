
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatusColor, getActionColor } from "@/utils/statusUtils";

const filesData = [
  {
    name: "relatório-financeiro-q4.pdf",
    user: "Carlos Silva",
    department: "Financeiro",
    classification: "Confidencial",
    rules: "Restrição de Acesso",
    action: "Criptografar",
    compliance: "Em Risco"
  },
  {
    name: "dados-funcionários.xlsx",
    user: "Ana Oliveira",
    department: "RH",
    classification: "PII Sensível",
    rules: "Retenção 5 anos",
    action: "Restringir Acesso",
    compliance: "Não Atendido"
  },
  {
    name: "contrato-fornecedor.docx",
    user: "Marcos Santos",
    department: "Jurídico",
    classification: "Confidencial",
    rules: "Auditoria Mensal",
    action: "Monitorar",
    compliance: "Atendido"
  },
  {
    name: "campanha-marketing.pptx",
    user: "Juliana Costa",
    department: "Marketing",
    classification: "Interno",
    rules: "Acesso Departamental",
    action: "Monitorar",
    compliance: "Atendido"
  },
  {
    name: "relatório-auditoria.pdf",
    user: "Roberto Almeida",
    department: "Compliance",
    classification: "Restrito",
    rules: "Backup Diário",
    action: "Criptografar",
    compliance: "Em Risco"
  },
  {
    name: "plano-estratégico-2024.xlsx",
    user: "Luisa Mendes",
    department: "Diretoria",
    classification: "Confidencial",
    rules: "Acesso Exclusivo",
    action: "Restringir Acesso",
    compliance: "Atendido"
  },
  {
    name: "base-clientes.csv",
    user: "Fernando Souza",
    department: "Vendas",
    classification: "PII",
    rules: "Retenção 3 anos",
    action: "Criptografar",
    compliance: "Não Atendido"
  }
];

const FilesTab = () => {
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {filesData.map((file, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{file.name}</TableCell>
                  <TableCell>{file.user}</TableCell>
                  <TableCell>{file.department}</TableCell>
                  <TableCell>{file.classification}</TableCell>
                  <TableCell>{file.rules}</TableCell>
                  <TableCell className={getActionColor(file.action)}>{file.action}</TableCell>
                  <TableCell className={getStatusColor(file.compliance)}>{file.compliance}</TableCell>
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
