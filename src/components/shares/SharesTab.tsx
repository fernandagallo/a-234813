
import { useState } from "react";
import { Share2, Users, Home, Shield, Wifi } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer 
} from "recharts";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { sharingRelationships, userDepartments, departmentColors, departmentSharingStats } from "@/data/insightsData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

// Add new information to the existing user data
const userWorkStatus = {
  "João Silva": { homeOffice: true, vpnAccess: true, kgAccess: false },
  "Maria Oliveira": { homeOffice: false, vpnAccess: false, kgAccess: true },
  "Pedro Santos": { homeOffice: true, vpnAccess: true, kgAccess: true },
  "Ana Souza": { homeOffice: false, vpnAccess: false, kgAccess: false },
  "Carlos Ferreira": { homeOffice: true, vpnAccess: false, kgAccess: false },
  "Paulo Ribeiro": { homeOffice: false, vpnAccess: true, kgAccess: true },
  "Lucia Mendes": { homeOffice: true, vpnAccess: true, kgAccess: false }
};

const SharesTab = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [filterHomeOffice, setFilterHomeOffice] = useState(false);
  const [filterVPN, setFilterVPN] = useState(false);
  const [filterKG, setFilterKG] = useState(false);

  // Filter relationships based on selected user and filters
  const filteredRelationships = sharingRelationships.filter(rel => {
    const matchesUser = !selectedUser || rel.source === selectedUser || rel.target === selectedUser;
    const matchesHomeOffice = !filterHomeOffice || 
      (userWorkStatus[rel.source as keyof typeof userWorkStatus]?.homeOffice || 
       userWorkStatus[rel.target as keyof typeof userWorkStatus]?.homeOffice);
    const matchesVPN = !filterVPN || 
      (userWorkStatus[rel.source as keyof typeof userWorkStatus]?.vpnAccess || 
       userWorkStatus[rel.target as keyof typeof userWorkStatus]?.vpnAccess);
    const matchesKG = !filterKG || 
      (userWorkStatus[rel.source as keyof typeof userWorkStatus]?.kgAccess || 
       userWorkStatus[rel.target as keyof typeof userWorkStatus]?.kgAccess);
    
    return matchesUser && matchesHomeOffice && matchesVPN && matchesKG;
  });

  // Get unique users for the dropdown
  const uniqueUsers = Array.from(
    new Set([
      ...sharingRelationships.map((rel) => rel.source),
      ...sharingRelationships.map((rel) => rel.target),
    ])
  ).sort();

  // Generate department sharing data for visualization
  const chartData = departmentSharingStats.map((dept) => ({
    name: dept.department,
    filesShared: dept.filesShared,
    connections: dept.connections,
    fill: departmentColors[dept.department as keyof typeof departmentColors] || "#333",
    filesList: [`${dept.department}_relatorio.pdf`, `${dept.department}_dados.xlsx`, `${dept.department}_analise.docx`]
  }));

  const handleBarClick = (data: any) => {
    if (data && data.name) {
      setSelectedDepartment(data.name);
      setSelectedFiles(data.filesList || []);
    }
  };

  const handlePieClick = (data: any, index: number) => {
    const clickedData = chartData[index];
    setSelectedDepartment(clickedData.name);
    setSelectedFiles(clickedData.filesList || []);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 dark:bg-gray-800/90 p-2 shadow rounded border border-gray-200 dark:border-gray-700">
          <p className="font-medium">{payload[0].name}</p>
          <p>Arquivos: {payload[0].value}</p>
          <p className="text-xs text-gray-500">Clique para ver detalhes</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Compartilhamento de Arquivos</h2>
          <p className="text-muted-foreground">
            Análise de quem compartilha arquivos com quem na organização
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Compartilhamentos</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sharingRelationships.length}</div>
            <p className="text-xs text-muted-foreground">
              Conexões de compartilhamento na rede
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              Usuários compartilhando arquivos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média de Compartilhamentos</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(sharingRelationships.reduce((acc, rel) => acc + rel.files, 0) / sharingRelationships.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Arquivos por conexão
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Compartilhamentos por Departamento</CardTitle>
            <CardDescription>
              Volumes de compartilhamento entre departamentos
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={chartData}
                      onClick={(data) => handleBarClick(data.activePayload?.[0]?.payload)}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="filesShared" name="Arquivos Compartilhados" />
                      <Bar dataKey="connections" name="Conexões" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Arquivos do departamento {selectedDepartment}</DialogTitle>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Arquivo</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedFiles.map((file, index) => (
                      <TableRow key={index}>
                        <TableCell>{file}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">Visualizar</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Proporção de Compartilhamentos</CardTitle>
            <CardDescription>
              Por departamento
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="filesShared"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                        onClick={handlePieClick}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Arquivos do departamento {selectedDepartment}</DialogTitle>
                </DialogHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Arquivo</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedFiles.map((file, index) => (
                      <TableRow key={index}>
                        <TableCell>{file}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">Visualizar</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relações de Compartilhamento</CardTitle>
          <CardDescription>
            Visualize quem compartilha arquivos com quem
          </CardDescription>
          <div className="flex flex-col md:flex-row gap-4 pt-3">
            <div className="w-full md:w-[300px]">
              <Label htmlFor="filter-user">Filtrar por usuário</Label>
              <Select
                value={selectedUser || ""}
                onValueChange={(value) => setSelectedUser(value === "" ? null : value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um usuário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os usuários</SelectItem>
                  {uniqueUsers.map((user) => (
                    <SelectItem key={user} value={user}>
                      {user} ({userDepartments[user as keyof typeof userDepartments]})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Critérios adicionais</Label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="homeOffice" 
                    checked={filterHomeOffice}
                    onCheckedChange={(checked) => setFilterHomeOffice(checked as boolean)}
                  />
                  <label htmlFor="homeOffice" className="text-sm font-medium flex items-center gap-1 cursor-pointer">
                    <Home className="h-4 w-4" /> Home Office
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="vpn" 
                    checked={filterVPN}
                    onCheckedChange={(checked) => setFilterVPN(checked as boolean)}
                  />
                  <label htmlFor="vpn" className="text-sm font-medium flex items-center gap-1 cursor-pointer">
                    <Shield className="h-4 w-4" /> VPN
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="kg" 
                    checked={filterKG}
                    onCheckedChange={(checked) => setFilterKG(checked as boolean)}
                  />
                  <label htmlFor="kg" className="text-sm font-medium flex items-center gap-1 cursor-pointer">
                    <Wifi className="h-4 w-4" /> KG
                  </label>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Origem</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Arquivos Compartilhados</TableHead>
                <TableHead>Intensidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRelationships.map((rel, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{rel.source}</TableCell>
                  <TableCell>
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-2"
                      style={{
                        backgroundColor:
                          departmentColors[
                            userDepartments[rel.source as keyof typeof userDepartments] as keyof typeof departmentColors
                          ],
                      }}
                    ></span>
                    {userDepartments[rel.source as keyof typeof userDepartments]}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {userWorkStatus[rel.source as keyof typeof userWorkStatus]?.homeOffice && (
                        <Badge variant="outline" className="flex items-center gap-1 text-xs">
                          <Home className="h-3 w-3" /> Home
                        </Badge>
                      )}
                      {userWorkStatus[rel.source as keyof typeof userWorkStatus]?.vpnAccess && (
                        <Badge variant="outline" className="flex items-center gap-1 text-xs">
                          <Shield className="h-3 w-3" /> VPN
                        </Badge>
                      )}
                      {userWorkStatus[rel.source as keyof typeof userWorkStatus]?.kgAccess && (
                        <Badge variant="outline" className="flex items-center gap-1 text-xs">
                          <Wifi className="h-3 w-3" /> KG
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{rel.target}</TableCell>
                  <TableCell>
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-2"
                      style={{
                        backgroundColor:
                          departmentColors[
                            userDepartments[rel.target as keyof typeof userDepartments] as keyof typeof departmentColors
                          ],
                      }}
                    ></span>
                    {userDepartments[rel.target as keyof typeof userDepartments]}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {userWorkStatus[rel.target as keyof typeof userWorkStatus]?.homeOffice && (
                        <Badge variant="outline" className="flex items-center gap-1 text-xs">
                          <Home className="h-3 w-3" /> Home
                        </Badge>
                      )}
                      {userWorkStatus[rel.target as keyof typeof userWorkStatus]?.vpnAccess && (
                        <Badge variant="outline" className="flex items-center gap-1 text-xs">
                          <Shield className="h-3 w-3" /> VPN
                        </Badge>
                      )}
                      {userWorkStatus[rel.target as keyof typeof userWorkStatus]?.kgAccess && (
                        <Badge variant="outline" className="flex items-center gap-1 text-xs">
                          <Wifi className="h-3 w-3" /> KG
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{rel.files}</TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="h-2.5 rounded-full"
                        style={{
                          width: `${(rel.strength / 10) * 100}%`,
                          backgroundColor:
                            departmentColors[
                              userDepartments[rel.source as keyof typeof userDepartments] as keyof typeof departmentColors
                            ],
                        }}
                      ></div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SharesTab;
