
import React from 'react';
import { Card } from '@/components/ui/card';

const CustomerRequests = () => {
  return (
    <div className="w-full h-96 flex items-center justify-center">
      <Card className="w-full h-full p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-medium mb-4">Análise de Documentos</h2>
        <p className="text-center text-muted-foreground">
          Selecione uma análise específica para visualizar detalhes sobre os documentos processados.
        </p>
      </Card>
    </div>
  );
};

export default CustomerRequests;
