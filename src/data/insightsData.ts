
// Dados de compartilhamento entre usuários
export const sharingRelationships = [
  { source: "Ana Silva", target: "Carlos Mendes", strength: 8, files: 5 },
  { source: "Ana Silva", target: "Juliana Costa", strength: 3, files: 2 },
  { source: "Carlos Mendes", target: "Roberto Alves", strength: 6, files: 4 },
  { source: "Carlos Mendes", target: "Patricia Lima", strength: 2, files: 1 },
  { source: "Juliana Costa", target: "Ana Silva", strength: 5, files: 3 },
  { source: "Juliana Costa", target: "Patricia Lima", strength: 7, files: 4 },
  { source: "Roberto Alves", target: "Patricia Lima", strength: 4, files: 2 },
  { source: "Roberto Alves", target: "Ana Silva", strength: 1, files: 1 },
  { source: "Patricia Lima", target: "Carlos Mendes", strength: 9, files: 6 },
];

// Departamentos dos usuários para mostrar cores diferentes
export const userDepartments = {
  "Ana Silva": "Segurança",
  "Carlos Mendes": "RH",
  "Juliana Costa": "Legal",
  "Roberto Alves": "Marketing",
  "Patricia Lima": "Compliance"
};

// Cores para cada departamento
export const departmentColors = {
  "Segurança": "#4C6EF5",
  "RH": "#F59E0B",
  "Legal": "#10B981",
  "Marketing": "#EC4899",
  "Compliance": "#8B5CF6"
};

// Lista de todos os usuários para o filtro
export const allUsers = [
  "Ana Silva",
  "Carlos Mendes",
  "Juliana Costa",
  "Roberto Alves", 
  "Patricia Lima"
];

// Dados sobre compartilhamento de arquivos por departamento
export const departmentSharingStats = [
  { department: "Segurança", filesShared: 12, connections: 5 },
  { department: "RH", filesShared: 18, connections: 7 },
  { department: "Legal", filesShared: 9, connections: 4 },
  { department: "Marketing", filesShared: 6, connections: 3 },
  { department: "Compliance", filesShared: 15, connections: 6 }
];

// Dados sobre arquivos compartilhados na empresa
export const sharedFiles = [
  { 
    hash: "a1b2c3d4e5f6g7h8i9j0", 
    filename: "Plano_Estrategico_2024.pdf",
    users: ["Ana Silva", "Carlos Mendes", "Juliana Costa", "Patricia Lima"],
    securityLevel: "Alto",
    shareCount: 4
  },
  { 
    hash: "b2c3d4e5f6g7h8i9j0k1", 
    filename: "Relatório_Financeiro_Q3.xlsx",
    users: ["Carlos Mendes", "Patricia Lima"],
    securityLevel: "Alto",
    shareCount: 2
  },
  { 
    hash: "c3d4e5f6g7h8i9j0k1l2", 
    filename: "Apresentacao_Clientes.pptx",
    users: ["Roberto Alves", "Carlos Mendes", "Juliana Costa"],
    securityLevel: "Médio",
    shareCount: 3
  },
  { 
    hash: "d4e5f6g7h8i9j0k1l2m3", 
    filename: "Manual_Processos_Internos.docx",
    users: ["Ana Silva", "Patricia Lima", "Roberto Alves", "Carlos Mendes", "Juliana Costa"],
    securityLevel: "Baixo",
    shareCount: 5
  },
  { 
    hash: "e5f6g7h8i9j0k1l2m3n4", 
    filename: "Dados_Clientes_VIP.csv",
    users: ["Ana Silva", "Patricia Lima"],
    securityLevel: "Alto",
    shareCount: 2
  },
  { 
    hash: "f6g7h8i9j0k1l2m3n4o5", 
    filename: "Planejamento_Marketing_2024.pptx",
    users: ["Roberto Alves"],
    securityLevel: "Médio",
    shareCount: 1
  },
  { 
    hash: "g7h8i9j0k1l2m3n4o5p6", 
    filename: "Contratos_Fornecedores.pdf",
    users: ["Juliana Costa", "Carlos Mendes"],
    securityLevel: "Alto",
    shareCount: 2
  },
  { 
    hash: "h8i9j0k1l2m3n4o5p6q7", 
    filename: "Politicas_Compliance.pdf",
    users: ["Patricia Lima", "Juliana Costa", "Ana Silva"],
    securityLevel: "Alto",
    shareCount: 3
  },
  { 
    hash: "i9j0k1l2m3n4o5p6q7r8", 
    filename: "Analise_Mercado.xlsx",
    users: ["Roberto Alves", "Carlos Mendes"],
    securityLevel: "Médio",
    shareCount: 2
  },
  { 
    hash: "j0k1l2m3n4o5p6q7r8s9", 
    filename: "Calendario_Eventos.xlsx",
    users: ["Ana Silva", "Roberto Alves", "Carlos Mendes", "Juliana Costa", "Patricia Lima"],
    securityLevel: "Baixo",
    shareCount: 5
  }
];

// Dados para gráficos de monitoramento
export const securityRiskData = sharedFiles
  .filter(file => file.securityLevel === "Alto")
  .sort((a, b) => b.shareCount - a.shareCount)
  .map(file => ({
    name: file.filename,
    value: file.shareCount,
    securityLevel: file.securityLevel
  }));

export const mostSharedFilesData = sharedFiles
  .sort((a, b) => b.shareCount - a.shareCount)
  .slice(0, 5)
  .map(file => ({
    name: file.filename,
    value: file.shareCount
  }));
