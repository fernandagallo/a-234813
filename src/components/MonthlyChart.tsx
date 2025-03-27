
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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

const MonthlyChart = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const handleClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      const clickedData = data.activePayload[0].payload;
      setSelectedMonth(clickedData.month);
      setSelectedFiles(clickedData.files || []);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
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

  return (
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
  );
};

export default MonthlyChart;
