
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
  },
  {
    hash: "5g6h7i8j9k...",
    uri: "/storage/research/pii-dataset.csv",
    size: "7.2 MB",
    permissions: "Pesquisadores",
    action: "Mascarar"
  },
  {
    hash: "0l1m2n3o4p...",
    uri: "/storage/temp/suspicious-attachment.exe",
    size: "1.8 MB",
    permissions: "Temporário",
    action: "Colocar em Quarentena"
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

// Security alerts data
export const securityAlertsData = [
  {
    id: 1,
    severity: "Crítico",
    description: "Arquivos confidenciais compartilhados com usuários não autorizados",
    affectedFiles: 3,
    timestamp: "Hoje, 10:45"
  },
  {
    id: 2,
    severity: "Alto",
    description: "Documentos sensíveis enviados por email sem criptografia",
    affectedFiles: 5,
    timestamp: "Hoje, 09:17"
  },
  {
    id: 3,
    severity: "Médio",
    description: "Dados PII detectados em diretório de acesso público",
    affectedFiles: 2,
    timestamp: "Ontem, 15:30"
  },
  {
    id: 4,
    severity: "Crítico",
    description: "Tentativas de acesso não autorizado a documentos classificados",
    affectedFiles: 1,
    timestamp: "Ontem, 11:22"
  }
];

// Mock workstations data
export const workstationsData = [
  {
    id: "WS-001",
    hostname: "DESKTOP-FIN01",
    owner: "Ana Silva",
    department: "Financeiro",
    ipAddress: "192.168.1.101",
    lastSeen: "Hoje, 10:23",
    riskLevel: "Alto",
    accessLevel: "Restrito",
    securityWeight: 8,
    files: {
      confidential: 12,
      pii: 28,
      sensitive: 5,
      normal: 156
    }
  },
  {
    id: "WS-002",
    hostname: "LAPTOP-HR02",
    owner: "Carlos Mendes",
    department: "RH",
    ipAddress: "192.168.1.102",
    lastSeen: "Hoje, 11:05",
    riskLevel: "Crítico",
    accessLevel: "Altamente Restrito",
    securityWeight: 10,
    files: {
      confidential: 45,
      pii: 67,
      sensitive: 23,
      normal: 89
    }
  },
  {
    id: "WS-003",
    hostname: "DESKTOP-MKT01",
    owner: "Roberto Alves",
    department: "Marketing",
    ipAddress: "192.168.1.103",
    lastSeen: "Ontem, 17:45",
    riskLevel: "Baixo",
    accessLevel: "Normal",
    securityWeight: 4,
    files: {
      confidential: 3,
      pii: 7,
      sensitive: 0,
      normal: 234
    }
  },
  {
    id: "WS-004",
    hostname: "LAPTOP-DEV01",
    owner: "Juliana Costa",
    department: "Desenvolvimento",
    ipAddress: "192.168.1.104",
    lastSeen: "Hoje, 09:30",
    riskLevel: "Médio",
    accessLevel: "Elevado",
    securityWeight: 6,
    files: {
      confidential: 8,
      pii: 12,
      sensitive: 4,
      normal: 178
    }
  },
  {
    id: "WS-005",
    hostname: "DESKTOP-CEO01",
    owner: "Ricardo Monteiro",
    department: "Diretoria",
    ipAddress: "192.168.1.105",
    lastSeen: "Hoje, 08:15",
    riskLevel: "Crítico",
    accessLevel: "Máximo",
    securityWeight: 10,
    files: {
      confidential: 67,
      pii: 23,
      sensitive: 18,
      normal: 45
    }
  }
];
