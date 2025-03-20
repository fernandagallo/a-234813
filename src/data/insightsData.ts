
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
