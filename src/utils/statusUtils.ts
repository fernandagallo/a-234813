
export const getStatusColor = (status: string): string => {
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

export const getActionColor = (action: string): string => {
  switch (action) {
    case 'Criptografar':
      return 'text-purple-500';
    case 'Restringir Acesso':
      return 'text-red-500';
    case 'Monitorar':
      return 'text-blue-500';
    case 'Colocar em Quarentena':
      return 'text-yellow-500';
    case 'Mascarar':
      return 'text-green-500';
    default:
      return '';
  }
};
