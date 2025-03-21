
import { useState } from "react";
import { Share2, Users } from "lucide-react";
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

const SharesTab = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Filter relationships based on selected user
  const filteredRelationships = selectedUser
    ? sharingRelationships.filter(
        (rel) => rel.source === selectedUser || rel.target === selectedUser
      )
    : sharingRelationships;

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
  }));

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
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="filesShared" name="Arquivos Compartilhados" />
                <Bar dataKey="connections" name="Conexões" />
              </BarChart>
            </ResponsiveContainer>
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
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relações de Compartilhamento</CardTitle>
          <CardDescription>
            Visualize quem compartilha arquivos com quem
          </CardDescription>
          <div className="pt-3">
            <Label htmlFor="filter-user">Filtrar por usuário</Label>
            <Select
              value={selectedUser || ""}
              onValueChange={(value) => setSelectedUser(value === "" ? null : value)}
            >
              <SelectTrigger className="w-full sm:w-[300px]">
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
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Origem</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Departamento</TableHead>
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
