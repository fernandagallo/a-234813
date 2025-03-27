
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, Cpu, Shield, Info, User, FileText, Wifi, Home, AlertTriangle, Check, X } from 'lucide-react';
import { workstationsData } from '@/data/mockData';
import { getStatusColor } from '@/utils/statusUtils';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slider,
} from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import MetricCard from '../MetricCard';

// Add additional workstation information for the new features
const enhancedWorkstationsData = workstationsData.map(station => ({
  ...station,
  isRemote: Math.random() > 0.5,
  securityLevel: ["Baixo", "Médio", "Alto", "Crítico"][Math.floor(Math.random() * 4)],
  antivirusStatus: Math.random() > 0.3 ? "Atualizado" : "Expirado",
  certificationStatus: Math.random() > 0.3 ? "Válido" : "Expirado",
  lastAntivirusUpdate: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
}));

const accessLevelOptions = [
  { value: "Normal", label: "Normal" },
  { value: "Elevado", label: "Elevado" },
  { value: "Restrito", label: "Restrito" },
  { value: "Altamente Restrito", label: "Altamente Restrito" },
  { value: "Máximo", label: "Máximo" }
];

const WorkstationsTab = () => {
  const { toast } = useToast();
  const [workstations, setWorkstations] = useState(enhancedWorkstationsData);
  
  const handleAccessLevelChange = (index: number, value: string) => {
    const updatedWorkstations = [...workstations];
    updatedWorkstations[index].accessLevel = value;
    setWorkstations(updatedWorkstations);
    
    toast({
      title: "Nível de acesso atualizado",
      description: `O nível de acesso da estação ${updatedWorkstations[index].hostname} foi alterado para ${value}.`,
    });
  };
  
  const handleSecurityWeightChange = (index: number, value: number[]) => {
    const updatedWorkstations = [...workstations];
    updatedWorkstations[index].securityWeight = value[0];
    setWorkstations(updatedWorkstations);
    
    toast({
      title: "Peso de segurança atualizado",
      description: `O peso de segurança da estação ${updatedWorkstations[index].hostname} foi alterado para ${value[0]}.`,
    });
  };

  const handleRegularize = (index: number) => {
    const updatedWorkstations = [...workstations];
    updatedWorkstations[index].antivirusStatus = "Atualizado";
    updatedWorkstations[index].certificationStatus = "Válido";
    updatedWorkstations[index].lastAntivirusUpdate = new Date().toISOString().split('T')[0];
    setWorkstations(updatedWorkstations);
    
    toast({
      title: "Estação regularizada",
      description: `O antivírus e as certificações da estação ${updatedWorkstations[index].hostname} foram atualizados.`,
    });
  };

  const needsRegularization = workstations.filter(
    station => station.antivirusStatus === "Expirado" || station.certificationStatus === "Expirado"
  ).length;
  
  const remoteWorkstations = workstations.filter(station => station.isRemote).length;
  
  const criticalSecurityWorkstations = workstations.filter(
    station => station.securityLevel === "Crítico"
  ).length;
  
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Estações de Trabalho</h1>
        <p className="text-dashboard-muted">Gerenciamento e monitoramento de estações de trabalho da rede</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Monitor className="w-5 h-5 mr-2 text-blue-500" />
              Total de Estações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{workstations.length}</p>
            <p className="text-dashboard-muted mt-2">Estações monitoradas</p>
          </CardContent>
        </Card>
        
        <MetricCard
          title="Estações Remotas"
          value={remoteWorkstations}
          total={workstations.length}
          color="#8B5CF6"
          unit=""
          action={
            <Badge variant="outline" className="flex items-center gap-1 mt-2">
              <Home className="h-4 w-4" /> Home Office
            </Badge>
          }
        />
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
              Necessitam Regularização
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-amber-500">
              {needsRegularization}
            </p>
            <p className="text-dashboard-muted mt-2">Antivírus/certificações expirados</p>
          </CardContent>
        </Card>
        
        <MetricCard
          title="Segurança Crítica"
          value={criticalSecurityWorkstations}
          total={workstations.length}
          color="#F43F5E"
          unit=""
          action={
            <Badge variant="outline" className="flex items-center gap-1 mt-2">
              <Shield className="h-4 w-4" /> Alto Risco
            </Badge>
          }
        />
      </div>
      
      <div className="dashboard-card mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Hostname</TableHead>
              <TableHead>Proprietário</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Nível de Segurança</TableHead>
              <TableHead>Antivírus</TableHead>
              <TableHead>Certificações</TableHead>
              <TableHead>Nível de Acesso</TableHead>
              <TableHead>Peso de Segurança</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workstations.map((station, index) => (
              <TableRow key={station.id} className={
                (station.antivirusStatus === "Expirado" || station.certificationStatus === "Expirado") 
                  ? "bg-amber-50 dark:bg-amber-950/20" 
                  : ""
              }>
                <TableCell>{station.id}</TableCell>
                <TableCell className="font-medium">{station.hostname}</TableCell>
                <TableCell>{station.owner}</TableCell>
                <TableCell>{station.department}</TableCell>
                <TableCell>
                  {station.isRemote ? (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Home className="h-3 w-3" /> Remoto
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Monitor className="h-3 w-3" /> Local
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={station.securityLevel === "Crítico" ? "destructive" : "outline"}
                    className={`flex items-center gap-1 ${
                      station.securityLevel === "Alto" 
                        ? "text-orange-500 dark:text-orange-400" 
                        : station.securityLevel === "Médio"
                          ? "text-yellow-500 dark:text-yellow-400"
                          : station.securityLevel === "Baixo"
                            ? "text-green-500 dark:text-green-400"
                            : ""
                    }`}
                  >
                    <Shield className="h-3 w-3" /> 
                    {station.securityLevel}
                  </Badge>
                </TableCell>
                <TableCell>
                  {station.antivirusStatus === "Atualizado" ? (
                    <Badge variant="outline" className="flex items-center gap-1 text-green-500">
                      <Check className="h-3 w-3" /> Atualizado
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="flex items-center gap-1 text-red-500">
                      <X className="h-3 w-3" /> Expirado
                    </Badge>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    Última atualização: {station.lastAntivirusUpdate}
                  </div>
                </TableCell>
                <TableCell>
                  {station.certificationStatus === "Válido" ? (
                    <Badge variant="outline" className="flex items-center gap-1 text-green-500">
                      <Check className="h-3 w-3" /> Válido
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="flex items-center gap-1 text-red-500">
                      <X className="h-3 w-3" /> Expirado
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Select
                    value={station.accessLevel}
                    onValueChange={(value) => handleAccessLevelChange(index, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {accessLevelOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4 w-[200px]">
                    <Slider
                      value={[station.securityWeight]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => handleSecurityWeightChange(index, value)}
                    />
                    <span className="w-6 text-center">{station.securityWeight}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Info className="h-4 w-4 mr-1" /> Detalhes
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center text-lg">
                            <Monitor className="h-5 w-5 mr-2" />
                            {station.hostname} ({station.id})
                            {station.isRemote && (
                              <Badge variant="outline" className="ml-2 flex items-center gap-1">
                                <Home className="h-3 w-3" /> Remoto
                              </Badge>
                            )}
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                          <div>
                            <h3 className="text-md font-medium mb-4 flex items-center">
                              <User className="h-4 w-4 mr-2" />
                              Informações Gerais
                            </h3>
                            
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-2">
                                <p className="text-sm text-gray-500">Proprietário:</p>
                                <p className="text-sm font-medium">{station.owner}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <p className="text-sm text-gray-500">Departamento:</p>
                                <p className="text-sm font-medium">{station.department}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <p className="text-sm text-gray-500">Endereço IP:</p>
                                <p className="text-sm font-medium">{station.ipAddress}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <p className="text-sm text-gray-500">Último Acesso:</p>
                                <p className="text-sm font-medium">{station.lastSeen}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <p className="text-sm text-gray-500">Status:</p>
                                <p className="text-sm font-medium">
                                  {station.isRemote ? (
                                    <Badge variant="outline" className="flex items-center gap-1">
                                      <Home className="h-3 w-3" /> Remoto
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="flex items-center gap-1">
                                      <Monitor className="h-3 w-3" /> Local
                                    </Badge>
                                  )}
                                </p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <p className="text-sm text-gray-500">Nível de Risco:</p>
                                <p className={`text-sm font-medium ${getStatusColor(station.riskLevel)}`}>{station.riskLevel}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <p className="text-sm text-gray-500">Nível de Segurança:</p>
                                <p className="text-sm font-medium">
                                  <Badge 
                                    variant={station.securityLevel === "Crítico" ? "destructive" : "outline"}
                                    className={`flex items-center gap-1 ${
                                      station.securityLevel === "Alto" 
                                        ? "text-orange-500 dark:text-orange-400" 
                                        : station.securityLevel === "Médio"
                                          ? "text-yellow-500 dark:text-yellow-400"
                                          : station.securityLevel === "Baixo"
                                            ? "text-green-500 dark:text-green-400"
                                            : ""
                                    }`}
                                  >
                                    <Shield className="h-3 w-3" /> 
                                    {station.securityLevel}
                                  </Badge>
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-md font-medium mb-4 flex items-center">
                              <Shield className="h-4 w-4 mr-2" />
                              Status de Segurança
                            </h3>
                            
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-2">
                                <p className="text-sm text-gray-500">Antivírus:</p>
                                <p className="text-sm font-medium">
                                  {station.antivirusStatus === "Atualizado" ? (
                                    <Badge variant="outline" className="flex items-center gap-1 text-green-500">
                                      <Check className="h-3 w-3" /> Atualizado
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="flex items-center gap-1 text-red-500">
                                      <X className="h-3 w-3" /> Expirado
                                    </Badge>
                                  )}
                                </p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <p className="text-sm text-gray-500">Última Atualização:</p>
                                <p className="text-sm font-medium">{station.lastAntivirusUpdate}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <p className="text-sm text-gray-500">Certificações:</p>
                                <p className="text-sm font-medium">
                                  {station.certificationStatus === "Válido" ? (
                                    <Badge variant="outline" className="flex items-center gap-1 text-green-500">
                                      <Check className="h-3 w-3" /> Válido
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="flex items-center gap-1 text-red-500">
                                      <X className="h-3 w-3" /> Expirado
                                    </Badge>
                                  )}
                                </p>
                              </div>
                            </div>
                            
                            <h3 className="text-md font-medium mt-6 mb-4 flex items-center">
                              <FileText className="h-4 w-4 mr-2" />
                              Arquivos por Classificação
                            </h3>
                            
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span className="text-red-500">Confidenciais</span>
                                  <span className="font-medium">{station.files.confidential}</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-red-500 rounded-full"
                                    style={{ width: `${(station.files.confidential / (station.files.confidential + station.files.pii + station.files.sensitive + station.files.normal)) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span className="text-amber-500">PII</span>
                                  <span className="font-medium">{station.files.pii}</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-amber-500 rounded-full"
                                    style={{ width: `${(station.files.pii / (station.files.confidential + station.files.pii + station.files.sensitive + station.files.normal)) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span className="text-purple-500">Sensíveis</span>
                                  <span className="font-medium">{station.files.sensitive}</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-purple-500 rounded-full"
                                    style={{ width: `${(station.files.sensitive / (station.files.confidential + station.files.pii + station.files.sensitive + station.files.normal)) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span className="text-green-500">Normais</span>
                                  <span className="font-medium">{station.files.normal}</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-green-500 rounded-full"
                                    style={{ width: `${(station.files.normal / (station.files.confidential + station.files.pii + station.files.sensitive + station.files.normal)) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h3 className="text-md font-medium mb-4 flex items-center">
                            <Shield className="h-4 w-4 mr-2" />
                            Configurações de Segurança
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="text-sm text-gray-500 mb-1 block">Nível de Acesso:</label>
                              <Select
                                value={station.accessLevel}
                                onValueChange={(value) => handleAccessLevelChange(index, value)}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {accessLevelOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <label className="text-sm text-gray-500 mb-1 block">Peso de Segurança (1-10):</label>
                              <div className="flex items-center space-x-4">
                                <Slider
                                  value={[station.securityWeight]}
                                  min={1}
                                  max={10}
                                  step={1}
                                  onValueChange={(value) => handleSecurityWeightChange(index, value)}
                                  className="flex-1"
                                />
                                <span className="w-6 text-center font-medium">{station.securityWeight}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2 mt-4">
                          {(station.antivirusStatus === "Expirado" || station.certificationStatus === "Expirado") && (
                            <Button 
                              variant="default"
                              onClick={() => handleRegularize(index)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Regularizar
                            </Button>
                          )}
                          <Button variant="outline">
                            Gerar Relatório
                          </Button>
                          <Button>
                            Aplicar Política de Segurança
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {(station.antivirusStatus === "Expirado" || station.certificationStatus === "Expirado") && (
                      <Button 
                        size="sm"
                        onClick={() => handleRegularize(index)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Regularizar
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default WorkstationsTab;
