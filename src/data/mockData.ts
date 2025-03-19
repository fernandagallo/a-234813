
// Mock data for data discovery and classification
export const dataOverview = {
  hosts: 24,
  totalDocuments: 12486,
  confidentialDocs: 3245,
  piiDocs: 5678,
  sensitivePiiDocs: 2156,
  corporateDocs: 986,
  governmentDocs: 421
};

export const risksData = [
  {
    hash: "3f8a9b2c1d...",
    uri: "/storage/finance/2023/q4-report.pdf",
    language: "Português",
    riskLevel: "Crítico"
  }, 
  {
    hash: "7d4e2f1a9c...",
    uri: "/storage/hr/employees/personal-data.xlsx",
    language: "Inglês",
    riskLevel: "Alto"
  }, 
  {
    hash: "2c5d8e3f1a...",
    uri: "/storage/contracts/nda-2023.docx",
    language: "Português",
    riskLevel: "Médio"
  }, 
  {
    hash: "9a3b5c7d2e...",
    uri: "/storage/marketing/campaign-analytics.xlsx",
    language: "Espanhol",
    riskLevel: "Baixo"
  }, 
  {
    hash: "1e4f7a9d3b...",
    uri: "/storage/legal/compliance/gdpr-audit.pdf",
    language: "Inglês",
    riskLevel: "Alto"
  }
];

export const actionsData = [
  {
    hash: "3f8a9b2c1d...",
    uri: "/storage/finance/2023/q4-report.pdf",
    size: "2.4 MB",
    permissions: "Público",
    action: "Criptografar"
  }, 
  {
    hash: "7d4e2f1a9c...",
    uri: "/storage/hr/employees/personal-data.xlsx",
    size: "4.6 MB",
    permissions: "Departamento RH",
    action: "Restringir Acesso"
  }, 
  {
    hash: "2c5d8e3f1a...",
    uri: "/storage/contracts/nda-2023.docx",
    size: "1.2 MB",
    permissions: "Departamento Legal",
    action: "Monitorar"
  }, 
  {
    hash: "9a3b5c7d2e...",
    uri: "/storage/marketing/campaign-analytics.xlsx",
    size: "3.8 MB",
    permissions: "Equipe Marketing",
    action: "Restringir Acesso"
  }, 
  {
    hash: "1e4f7a9d3b...",
    uri: "/storage/legal/compliance/gdpr-audit.pdf",
    size: "5.1 MB",
    permissions: "Administradores",
    action: "Criptografar"
  }
];

export const complianceData = [
  {
    hash: "3f8a9b2c1d...",
    uri: "/storage/finance/2023/q4-report.pdf",
    regulation: "LGPD",
    requirement: "Armazenamento Seguro",
    status: "Em Risco"
  }, 
  {
    hash: "7d4e2f1a9c...",
    uri: "/storage/hr/employees/personal-data.xlsx",
    regulation: "GDPR",
    requirement: "Consentimento",
    status: "Não Atendido"
  }, 
  {
    hash: "2c5d8e3f1a...",
    uri: "/storage/contracts/nda-2023.docx",
    regulation: "HIPAA",
    requirement: "Controle de Acesso",
    status: "Atendido"
  }, 
  {
    hash: "9a3b5c7d2e...",
    uri: "/storage/marketing/campaign-analytics.xlsx",
    regulation: "CCPA",
    requirement: "Direito de Exclusão",
    status: "Atendido"
  }, 
  {
    hash: "1e4f7a9d3b...",
    uri: "/storage/legal/compliance/gdpr-audit.pdf",
    regulation: "LGPD",
    requirement: "Relatório de Impacto",
    status: "Não Atendido"
  }
];
