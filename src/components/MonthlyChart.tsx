
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

const data = [
  { month: 'Jan', value: 30, revenue: 40, files: ['documento-jan-1.pdf', 'documento-jan-2.pdf', 'relatorio-jan.docx'] },
  { month: 'Fev', value: 35, revenue: 45, files: ['documento-fev-1.pdf', 'documento-fev-2.pdf', 'relatorio-fev.docx'] },
  { month: 'Mar', value: 40, revenue: 35, files: ['documento-mar-1.pdf', 'documento-mar-2.pdf', 'relatorio-mar.docx'] },
  { month: 'Abr', value: 38, revenue: 30, files: ['documento-abr-1.pdf', 'documento-abr-2.pdf', 'relatorio-abr.docx'] },
  { month: 'Mai', value: 42, revenue: 25, files: ['documento-mai-1.pdf', 'documento-mai-2.pdf', 'relatorio-mai.docx'] },
  { month: 'Jun', value: 48, revenue: 40, files: ['documento-jun-1.pdf', 'documento-jun-2.pdf', 'relatorio-jun.docx'] },
  { month: 'Jul', value: 45, revenue: 45, files: ['documento-jul-1.pdf', 'documento-jul-2.pdf', 'relatorio-jul.docx'] },
  { month: 'Ago', value: 43, revenue: 50, files: ['documento-ago-1.pdf', 'documento-ago-2.pdf', 'relatorio-ago.docx'] },
  { month: 'Set', value: 44, revenue: 45, files: ['documento-set-1.pdf', 'documento-set-2.pdf', 'relatorio-set.docx'] },
  { month: 'Out', value: 45, revenue: 55, files: ['documento-out-1.pdf', 'documento-out-2.pdf', 'relatorio-out.docx'] },
  { month: 'Nov', value: 47, revenue: 50, files: ['documento-nov-1.pdf', 'documento-nov-2.pdf', 'relatorio-nov.docx'] },
  { month: 'Dez', value: 49, revenue: 60, files: ['documento-dez-1.pdf', 'documento-dez-2.pdf', 'relatorio-dez.docx'] },
];

// Data for document classification vs risk criticality cross-reference
const crossReferenceData = [
  { name: 'Confidencial', Crítico: 12, Alto: 8, Médio: 5, Baixo: 3, files: [
    'confidencial-critico-1.pdf', 'confidencial-critico-2.pdf', 'confidencial-alto-1.docx'
  ] },
  { name: 'PII', Crítico: 8, Alto: 15, Médio: 10, Baixo: 5, files: [
    'pii-critico-1.pdf', 'pii-alto-1.xlsx', 'pii-alto-2.docx'
  ] },
  { name: 'PII Sensível', Crítico: 15, Alto: 10, Médio: 7, Baixo: 2, files: [
    'pii-sensivel-critico-1.pdf', 'pii-sensivel-critico-2.pdf', 'pii-sensivel-alto-1.xlsx'
  ] },
  { name: 'Corporativo', Crítico: 5, Alto: 12, Médio: 18, Baixo: 9, files: [
    'corporativo-alto-1.pdf', 'corporativo-medio-1.docx', 'corporativo-medio-2.xlsx'
  ] },
  { name: 'Governamental', Crítico: 10, Alto: 7, Médio: 12, Baixo: 6, files: [
    'governamental-critico-1.pdf', 'governamental-medio-1.docx', 'governamental-baixo-1.xlsx'
  ] },
];

// Data for pie chart
const riskDistributionData = [
  { name: 'Crítico', value: 50, color: '#FF6B6B', files: ['critico-1.pdf', 'critico-2.pdf', 'critico-3.pdf'] },
  { name: 'Alto', value: 52, color: '#FFD166', files: ['alto-1.pdf', 'alto-2.pdf', 'alto-3.pdf'] },
  { name: 'Médio', value: 52, color: '#06D6A0', files: ['medio-1.pdf', 'medio-2.pdf', 'medio-3.pdf'] },
  { name: 'Baixo', value: 25, color: '#118AB2', files: ['baixo-1.pdf', 'baixo-2.pdf', 'baixo-3.pdf'] },
];

const MonthlyChart = () => {
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRiskCategory, setSelectedRiskCategory] = useState<string | null>(null);
  const [selectedCrossRefFiles, setSelectedCrossRefFiles] = useState<string[]>([]);
  const [selectedRiskDistFiles, setSelectedRiskDistFiles] = useState<string[]>([]);

  const handleClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      const clickedData = data.activePayload[0].payload;
      setSelectedMonth(clickedData.month);
      setSelectedFiles(clickedData.files || []);
    }
  };

  const handleCrossRefClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      const clickedData = data.activePayload[0].payload;
      setSelectedCategory(clickedData.name);
      setSelectedCrossRefFiles(clickedData.files || []);
    }
  };

  const handlePieClick = (entry: any, index: number) => {
    setSelectedRiskCategory(entry.name);
    setSelectedRiskDistFiles(riskDistributionData[index].files || []);
  };

  const handleRegularize = (category: string) => {
    toast({
      title: "Regularização em Bloco",
      description: `Documentos da categoria "${category}" foram regularizados.`,
    });
  };

  // Fixed CustomTooltip to safely check for undefined values
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="bg-white/90 dark:bg-gray-800/90 p-2 shadow rounded border border-gray-200 dark:border-gray-700">
          <p className="font-medium">{`${payload[0].payload.month}`}</p>
          <p className="text-blue-500">{`Riscos: ${payload[0].value}`}</p>
          <p className="text-green-500">{`Docs: ${payload[1].value}`}</p>
          <p className="text-xs text-gray-500">Clique para ver arquivos</p>
        </div>
      );
    }
    return null;
  };

  // Fixed CrossRefTooltip to safely check for undefined values
  const CrossRefTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="bg-white/90 dark:bg-gray-800/90 p-2 shadow rounded border border-gray-200 dark:border-gray-700">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>{`${entry.name}: ${entry.value}`}</p>
          ))}
          <p className="text-xs text-gray-500">Clique para ver arquivos</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="dashboard-card h-[400px]">
        <h2 className="text-xl font-medium mb-6">Riscos Críticos Mensais</h2>
        <Dialog>
          <div className="h-[calc(100%-4rem)]">
            <DialogTrigger asChild>
              <div className="cursor-pointer w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={data} 
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    onClick={handleClick}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="#828179" />
                    <YAxis stroke="#828179" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name="Riscos"
                      stroke="#8989DE"
                      strokeWidth={2}
                      dot={{ fill: '#8989DE' }}
                      activeDot={{ r: 8 }}
                    />
                    <Bar dataKey="revenue" name="Documentos" fill="#61AAF2" opacity={0.3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </DialogTrigger>
          </div>
          
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Arquivos associados a {selectedMonth}</DialogTitle>
            </DialogHeader>
            <div className="max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome do Arquivo</TableHead>
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
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* New cross-reference analysis section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dashboard-card h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">Classificação vs. Criticidade</h2>
            {selectedCategory && (
              <Button 
                onClick={() => handleRegularize(selectedCategory)}
                className="bg-green-500 hover:bg-green-600"
              >
                Regularizar {selectedCategory}
              </Button>
            )}
          </div>
          <Dialog>
            <div className="h-[calc(100%-4rem)]">
              <DialogTrigger asChild>
                <div className="cursor-pointer w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={crossReferenceData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                      onClick={handleCrossRefClick}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="#828179" />
                      <YAxis stroke="#828179" />
                      <Tooltip content={<CrossRefTooltip />} />
                      <Legend />
                      <Bar dataKey="Crítico" fill="#FF6B6B" />
                      <Bar dataKey="Alto" fill="#FFD166" />
                      <Bar dataKey="Médio" fill="#06D6A0" />
                      <Bar dataKey="Baixo" fill="#118AB2" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DialogTrigger>
            </div>
            
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Arquivos da categoria {selectedCategory}</DialogTitle>
              </DialogHeader>
              <div className="max-h-[400px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do Arquivo</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCrossRefFiles.map((file, index) => (
                      <TableRow key={index}>
                        <TableCell>{file}</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button size="sm" variant="outline">Visualizar</Button>
                          <Button size="sm" className="bg-green-500 hover:bg-green-600">Regularizar</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="dashboard-card h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">Distribuição de Riscos</h2>
            {selectedRiskCategory && (
              <Button 
                onClick={() => handleRegularize(selectedRiskCategory)}
                className="bg-green-500 hover:bg-green-600"
              >
                Regularizar {selectedRiskCategory}
              </Button>
            )}
          </div>
          <Dialog>
            <div className="h-[calc(100%-4rem)]">
              <DialogTrigger asChild>
                <div className="cursor-pointer w-full h-full">
                  <ChartContainer 
                    config={{
                      Crítico: { theme: { light: '#FF6B6B', dark: '#FF6B6B' } },
                      Alto: { theme: { light: '#FFD166', dark: '#FFD166' } },
                      Médio: { theme: { light: '#06D6A0', dark: '#06D6A0' } },
                      Baixo: { theme: { light: '#118AB2', dark: '#118AB2' } },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          onClick={handlePieClick}
                        >
                          {riskDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </DialogTrigger>
            </div>
            
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Arquivos com risco {selectedRiskCategory}</DialogTitle>
              </DialogHeader>
              <div className="max-h-[400px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do Arquivo</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedRiskDistFiles.map((file, index) => (
                      <TableRow key={index}>
                        <TableCell>{file}</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button size="sm" variant="outline">Visualizar</Button>
                          <Button size="sm" className="bg-green-500 hover:bg-green-600">Regularizar</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MonthlyChart;
