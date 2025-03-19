import { Server, FileText, ShieldAlert, FileKey, FileLock, ScanSearch, Eye, Lock, Key, Bell, Globe, Shield, BookOpen, CheckCircle, AlertCircle, FileCheck, FileX, ListChecks } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import MonthlyChart from '@/components/MonthlyChart';
import CustomerRequests from '@/components/CustomerRequests';
import SidePanel from '@/components/SidePanel';
import { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for data discovery and classification
  const dataOverview = {
    hosts: 24,
    totalDocuments: 12486,
    confidentialDocs: 3245,
    piiDocs: 5678,
    sensitivePiiDocs: 2156,
    corporateDocs: 986,
    governmentDocs: 421
  };
  const risksData = [{
    hash: "3f8a9b2c1d...",
    uri: "/storage/finance/2023/q4-report.pdf",
    language: "Português",
    riskLevel: "Crítico"
  }, {
    hash: "7d4e2f1a9c...",
    uri: "/storage/hr/employees/personal-data.xlsx",
    language: "Inglês",
    riskLevel: "Alto"
  }, {
    hash: "2c5d8e3f1a...",
    uri: "/storage/contracts/nda-2023.docx",
    language: "Português",
    riskLevel: "Médio"
  }, {
    hash: "9a3b5c7d2e...",
    uri: "/storage/marketing/campaign-analytics.xlsx",
    language: "Espanhol",
    riskLevel: "Baixo"
  }, {
    hash: "1e4f7a9d3b...",
    uri: "/storage/legal/compliance/gdpr-audit.pdf",
    language: "Inglês",
    riskLevel: "Alto"
  }];
  const actionsData = [{
    hash: "3f8a9b2c1d...",
    uri: "/storage/finance/2023/q4-report.pdf",
    size: "2.4 MB",
    permissions: "Público",
    action: "Criptografar"
  }, {
    hash: "7d4e2f1a9c...",
    uri: "/storage/hr/employees/personal-data.xlsx",
    size: "4.6 MB",
    permissions: "Departamento RH",
    action: "Restringir Acesso"
  }, {
    hash: "2c5d8e3f1a...",
    uri: "/storage/contracts/nda-2023.docx",
    size: "1.2 MB",
    permissions: "Departamento Legal",
    action: "Monitorar"
  }, {
    hash: "9a3b5c7d2e...",
    uri: "/storage/marketing/campaign-analytics.xlsx",
    size: "3.8 MB",
    permissions: "Equipe Marketing",
    action: "Restringir Acesso"
  }, {
    hash: "1e4f7a9d3b...",
    uri: "/storage/legal/compliance/gdpr-audit.pdf",
    size: "5.1 MB",
    permissions: "Administradores",
    action: "Criptografar"
  }];
  const complianceData = [{
    hash: "3f8a9b2c1d...",
    uri: "/storage/finance/2023/q4-report.pdf",
    regulation: "LGPD",
    requirement: "Armazenamento Seguro",
    status: "Em Risco"
  }, {
    hash: "7d4e2f1a9c...",
    uri: "/storage/hr/employees/personal-data.xlsx",
    regulation: "GDPR",
    requirement: "Consentimento",
    status: "Não Atendido"
  }, {
    hash: "2c5d8e3f1a...",
    uri: "/storage/contracts/nda-2023.docx",
    regulation: "HIPAA",
    requirement: "Controle de Acesso",
    status: "Atendido"
  }, {
    hash: "9a3b5c7d2e...",
    uri: "/storage/marketing/campaign-analytics.xlsx",
    regulation: "CCPA",
    requirement: "Direito de Exclusão",
    status: "Atendido"
  }, {
    hash: "1e4f7a9d3b...",
    uri: "/storage/legal/compliance/gdpr-audit.pdf",
    regulation: "LGPD",
    requirement: "Relatório de Impacto",
    status: "Não Atendido"
  }];
  const getStatusColor = status => {
    switch (status) {
      case 'Alto':
      case 'Crítico':
      case 'Não Atendido':
        return 'text-red-500';
      case 'Médio':
      case 'Em Risco':
        return 'text-amber-500';
      case 'Baixo':
      case 'Atendido':
        return 'text-green-500';
      default:
        return '';
    }
  };
  const getActionColor = action => {
    switch (action) {
      case 'Criptografar':
        return 'text-purple-500';
      case 'Restringir Acesso':
        return 'text-red-500';
      case 'Monitorar':
        return 'text-blue-500';
      default:
        return '';
    }
  };
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <>
            <header className="mb-8">
              <h1 className="text-3xl font-medium mb-2">Visão Geral</h1>
              <p className="text-dashboard-muted">Dashboard de descoberta e classificação de dados para proteção de dados</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <MetricCard title="Hosts" value={dataOverview.hosts} color="#7EBF8E" unit="" />
              <MetricCard title="Total de Documentos" value={dataOverview.totalDocuments} color="#61AAF2" unit="" />
              <MetricCard title="Docs. Confidenciais" value={dataOverview.confidentialDocs} total={dataOverview.totalDocuments} color="#FF6B6B" />
              <MetricCard title="Docs. com PII" value={dataOverview.piiDocs} total={dataOverview.totalDocuments} color="#FFD166" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <MetricCard title="PII Sensível" value={dataOverview.sensitivePiiDocs} total={dataOverview.totalDocuments} color="#8989DE" />
              <MetricCard title="Docs. Corporativos" value={dataOverview.corporateDocs} total={dataOverview.totalDocuments} color="#4ECDC4" />
              <MetricCard title="Docs. Governamentais" value={dataOverview.governmentDocs} total={dataOverview.totalDocuments} color="#F9C80E" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MonthlyChart />
              <CustomerRequests />
            </div>
          </>;
      case 'users':
        return <>
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
                  {risksData.map((risk, index) => <TableRow key={index}>
                      <TableCell className="font-mono">{risk.hash}</TableCell>
                      <TableCell className="max-w-xs truncate">{risk.uri}</TableCell>
                      <TableCell>{risk.language}</TableCell>
                      <TableCell className={getStatusColor(risk.riskLevel)}>{risk.riskLevel}</TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="insira um tool tip no canto superior direito que listem os arquivos com riscos criticos rounded-sm">
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
          </>;
      case 'settings':
        return <>
            <Tabs defaultValue="actions" className="w-full">
              <TabsList className="mb-6 bg-dashboard-card">
                <TabsTrigger value="actions">Ações Prioritárias</TabsTrigger>
                <TabsTrigger value="compliance">Conformidade</TabsTrigger>
              </TabsList>
              
              <TabsContent value="actions">
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
                      {actionsData.map((action, index) => <TableRow key={index}>
                          <TableCell className="font-mono">{action.hash}</TableCell>
                          <TableCell className="max-w-xs truncate">{action.uri}</TableCell>
                          <TableCell>{action.size}</TableCell>
                          <TableCell>{action.permissions}</TableCell>
                          <TableCell className={getActionColor(action.action)}>{action.action}</TableCell>
                        </TableRow>)}
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
              </TabsContent>
              
              <TabsContent value="compliance">
                <header className="mb-8">
                  <h1 className="text-3xl font-medium mb-2">Conformidade com Regulamentos</h1>
                  <p className="text-dashboard-muted">Status de conformidade com regulamentos de proteção de dados</p>
                </header>
                
                <div className="dashboard-card mb-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Hash</TableHead>
                        <TableHead>URI</TableHead>
                        <TableHead>Regulamento</TableHead>
                        <TableHead>Requisito</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {complianceData.map((compliance, index) => <TableRow key={index}>
                          <TableCell className="font-mono">{compliance.hash}</TableCell>
                          <TableCell className="max-w-xs truncate">{compliance.uri}</TableCell>
                          <TableCell>{compliance.regulation}</TableCell>
                          <TableCell>{compliance.requirement}</TableCell>
                          <TableCell className={getStatusColor(compliance.status)}>{compliance.status}</TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="dashboard-card">
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                      <h2 className="text-xl font-medium">LGPD</h2>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <CheckCircle className="w-4 h-4 text-green-500 inline mr-2" />
                        <span className="text-sm">Atendidos: 24</span>
                      </div>
                      <div>
                        <AlertCircle className="w-4 h-4 text-red-500 inline mr-2" />
                        <span className="text-sm">Pendentes: 8</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="dashboard-card">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-5 h-5 text-green-400" />
                      <h2 className="text-xl font-medium">GDPR</h2>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <CheckCircle className="w-4 h-4 text-green-500 inline mr-2" />
                        <span className="text-sm">Atendidos: 32</span>
                      </div>
                      <div>
                        <AlertCircle className="w-4 h-4 text-red-500 inline mr-2" />
                        <span className="text-sm">Pendentes: 5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="dashboard-card">
                    <div className="flex items-center gap-3 mb-4">
                      <FileCheck className="w-5 h-5 text-yellow-400" />
                      <h2 className="text-xl font-medium">HIPAA</h2>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <CheckCircle className="w-4 h-4 text-green-500 inline mr-2" />
                        <span className="text-sm">Atendidos: 18</span>
                      </div>
                      <div>
                        <AlertCircle className="w-4 h-4 text-red-500 inline mr-2" />
                        <span className="text-sm">Pendentes: 7</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="dashboard-card">
                    <div className="flex items-center gap-3 mb-4">
                      <ListChecks className="w-5 h-5 text-purple-400" />
                      <h2 className="text-xl font-medium">CCPA</h2>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <CheckCircle className="w-4 h-4 text-green-500 inline mr-2" />
                        <span className="text-sm">Atendidos: 15</span>
                      </div>
                      <div>
                        <AlertCircle className="w-4 h-4 text-red-500 inline mr-2" />
                        <span className="text-sm">Pendentes: 3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>;
      default:
        return null;
    }
  };
  return <div className="min-h-screen">
      <SidePanel onTabChange={setActiveTab} />
      <div className="pl-64">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>;
};
export default Index;