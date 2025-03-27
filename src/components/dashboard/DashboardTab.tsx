
import React, { useState } from 'react';
import MetricCard from '@/components/MetricCard';
import MonthlyChart from '@/components/MonthlyChart';
import { dataOverview, securityAlertsData, complianceData } from '@/data/mockData';
import { Button } from "@/components/ui/button";
import { FileText, Eye, Shield, Bell, AlertTriangle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStatusColor } from "@/utils/statusUtils";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DashboardTab = () => {
  const { toast } = useToast();
  const [regularizedFiles, setRegularizedFiles] = useState<string[]>([]);

  const handleRegularizeAll = (category: string) => {
    toast({
      title: "Regularização em bloco",
      description: `Todos os documentos da categoria "${category}" foram regularizados.`,
    });
  };

  const handleRegularize = (hash: string, regulation: string) => {
    setRegularizedFiles(prev => [...prev, hash]);
    
    toast({
      title: "Arquivo regularizado",
      description: `Requisito de ${regulation} atendido com sucesso.`,
    });
  };

  const pendingComplianceItems = complianceData.filter(item => 
    item.status === 'Não Atendido' || item.status === 'Em Risco');

  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Central de Monitoramento</h1>
        <p className="text-dashboard-muted">Dashboard de descoberta e classificação de dados para proteção de dados</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard 
          title="Hosts" 
          value={dataOverview.hosts} 
          color="#7EBF8E" 
          unit="" 
          action={
            <Button 
              size="sm" 
              variant="outline" 
              className="text-green-600 border-green-300 hover:bg-green-50"
              onClick={() => handleRegularizeAll('Hosts')}
            >
              Regularizar
            </Button>
          }
        />
        <MetricCard 
          title="Total de Documentos" 
          value={dataOverview.totalDocuments} 
          color="#61AAF2" 
          unit="" 
          action={
            <Button 
              size="sm" 
              variant="outline" 
              className="text-blue-600 border-blue-300 hover:bg-blue-50"
              onClick={() => handleRegularizeAll('Documentos')}
            >
              Regularizar
            </Button>
          }
        />
        <MetricCard 
          title="Docs. Confidenciais" 
          value={dataOverview.confidentialDocs} 
          total={dataOverview.totalDocuments} 
          color="#FF6B6B" 
          action={
            <Button 
              size="sm" 
              variant="outline" 
              className="text-red-600 border-red-300 hover:bg-red-50"
              onClick={() => handleRegularizeAll('Confidenciais')}
            >
              Regularizar
            </Button>
          }
        />
        <MetricCard 
          title="Docs. com PII" 
          value={dataOverview.piiDocs} 
          total={dataOverview.totalDocuments} 
          color="#FFD166" 
          action={
            <Button 
              size="sm" 
              variant="outline" 
              className="text-amber-600 border-amber-300 hover:bg-amber-50"
              onClick={() => handleRegularizeAll('PII')}
            >
              Regularizar
            </Button>
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <MetricCard 
          title="PII Sensível" 
          value={dataOverview.sensitivePiiDocs} 
          total={dataOverview.totalDocuments} 
          color="#8989DE" 
          action={
            <Button 
              size="sm" 
              variant="outline" 
              className="text-indigo-600 border-indigo-300 hover:bg-indigo-50"
              onClick={() => handleRegularizeAll('PII Sensível')}
            >
              Regularizar
            </Button>
          }
        />
        <MetricCard 
          title="Docs. Corporativos" 
          value={dataOverview.corporateDocs} 
          total={dataOverview.totalDocuments} 
          color="#4ECDC4" 
          action={
            <Button 
              size="sm" 
              variant="outline" 
              className="text-teal-600 border-teal-300 hover:bg-teal-50"
              onClick={() => handleRegularizeAll('Corporativos')}
            >
              Regularizar
            </Button>
          }
        />
        <MetricCard 
          title="Docs. Governamentais" 
          value={dataOverview.governmentDocs} 
          total={dataOverview.totalDocuments} 
          color="#F9C80E" 
          action={
            <Button 
              size="sm" 
              variant="outline" 
              className="text-yellow-600 border-yellow-300 hover:bg-yellow-50"
              onClick={() => handleRegularizeAll('Governamentais')}
            >
              Regularizar
            </Button>
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Shield className="w-5 h-5 mr-2 text-blue-500" />
              Conformidade Pendente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-[300px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>URI</TableHead>
                    <TableHead>Regulamento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingComplianceItems.map((item, index) => {
                    const isRegularized = regularizedFiles.includes(item.hash);
                    
                    return (
                      <TableRow key={index}>
                        <TableCell className="max-w-[150px] truncate">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="link" 
                                className="text-blue-500 p-0 h-auto font-normal"
                              >
                                {item.uri}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Visualização do Arquivo</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-2">
                                <p><strong>URI:</strong> {item.uri}</p>
                                <p><strong>Hash:</strong> {item.hash}</p>
                                <p><strong>Regulamento:</strong> {item.regulation}</p>
                                <p><strong>Requisito:</strong> {item.requirement}</p>
                                <p><strong>Status:</strong> <span className={getStatusColor(isRegularized ? 'Atendido' : item.status)}>{isRegularized ? 'Atendido' : item.status}</span></p>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                        <TableCell>{item.regulation}</TableCell>
                        <TableCell className={getStatusColor(isRegularized ? 'Atendido' : item.status)}>
                          {isRegularized ? 'Atendido' : item.status}
                        </TableCell>
                        <TableCell>
                          {!isRegularized ? (
                            <Button 
                              size="sm" 
                              onClick={() => handleRegularize(item.hash, item.regulation)}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              Regularizar
                            </Button>
                          ) : (
                            <span className="text-green-500 flex items-center">
                              <Shield className="w-4 h-4 mr-1" /> Regularizado
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
              Alertas de Segurança
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-[300px] overflow-auto">
              <div className="space-y-4">
                {securityAlertsData.map((alert) => (
                  <div key={alert.id} className="p-3 border rounded-md bg-gray-50">
                    <div className="flex justify-between">
                      <span className={`text-sm font-medium ${
                        alert.severity === "Crítico" ? "text-red-500" : 
                        alert.severity === "Alto" ? "text-amber-500" : 
                        alert.severity === "Médio" ? "text-yellow-500" : "text-blue-500"
                      }`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium">{alert.description}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {alert.affectedFiles} arquivo{alert.affectedFiles > 1 ? 's' : ''}
                      </span>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Investigar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1">
        <MonthlyChart />
      </div>
    </>
  );
};

export default DashboardTab;
