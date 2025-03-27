
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, Cpu, Shield, Info, User, FileText } from 'lucide-react';
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

const accessLevelOptions = [
  { value: "Normal", label: "Normal" },
  { value: "Elevado", label: "Elevado" },
  { value: "Restrito", label: "Restrito" },
  { value: "Altamente Restrito", label: "Altamente Restrito" },
  { value: "Máximo", label: "Máximo" }
];

const WorkstationsTab = () => {
  const { toast } = useToast();
  const [workstations, setWorkstations] = useState(workstationsData);
  
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
  
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Estações de Trabalho</h1>
        <p className="text-dashboard-muted">Gerenciamento e monitoramento de estações de trabalho da rede</p>
      </header>
      
      <div className="dashboard-card mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Hostname</TableHead>
              <TableHead>Proprietário</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Último Acesso</TableHead>
              <TableHead>Nível de Risco</TableHead>
              <TableHead>Nível de Acesso</TableHead>
              <TableHead>Peso de Segurança</TableHead>
              <TableHead>Detalhes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workstations.map((station, index) => (
              <TableRow key={station.id}>
                <TableCell>{station.id}</TableCell>
                <TableCell className="font-medium">{station.hostname}</TableCell>
                <TableCell>{station.owner}</TableCell>
                <TableCell>{station.department}</TableCell>
                <TableCell>{station.lastSeen}</TableCell>
                <TableCell className={getStatusColor(station.riskLevel)}>{station.riskLevel}</TableCell>
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
                              <p className="text-sm text-gray-500">Nível de Risco:</p>
                              <p className={`text-sm font-medium ${getStatusColor(station.riskLevel)}`}>{station.riskLevel}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-md font-medium mb-4 flex items-center">
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
                          
                          <div className="mt-6">
                            <h3 className="text-md font-medium mb-4 flex items-center">
                              <Shield className="h-4 w-4 mr-2" />
                              Configurações de Segurança
                            </h3>
                            
                            <div className="space-y-4">
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
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="outline">
                          Gerar Relatório
                        </Button>
                        <Button>
                          Aplicar Política de Segurança
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Shield className="w-5 h-5 mr-2 text-red-500" />
              Risco Crítico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-red-500">
              {workstations.filter(w => w.riskLevel === "Crítico").length}
            </p>
            <p className="text-dashboard-muted mt-2">Estações com risco crítico</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Cpu className="w-5 h-5 mr-2 text-purple-500" />
              Acesso Restrito
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-purple-500">
              {workstations.filter(w => w.accessLevel.includes("Restrito")).length}
            </p>
            <p className="text-dashboard-muted mt-2">Estações com acesso restrito</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <FileText className="w-5 h-5 mr-2 text-green-500" />
              Arquivos Sensíveis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-500">
              {workstations.reduce((acc, station) => acc + station.files.confidential + station.files.pii + station.files.sensitive, 0)}
            </p>
            <p className="text-dashboard-muted mt-2">Total de arquivos sensíveis</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default WorkstationsTab;
