
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { InfoIcon, AlertTriangle, BarChart } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { mostSharedFilesData, securityRiskData } from '@/data/insightsData';

const MonitoringCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart className="w-5 h-5 text-blue-400" />
              <CardTitle>Arquivos Mais Compartilhados</CardTitle>
            </div>
            <div className="relative group">
              <InfoIcon className="w-5 h-5 text-dashboard-muted cursor-help" />
              <div className="absolute hidden group-hover:block right-0 w-64 p-3 bg-card border rounded-md shadow-lg z-50 text-sm">
                <p className="font-medium mb-2">Arquivos mais compartilhados na organização</p>
                <ul className="list-disc pl-4 space-y-1">
                  {mostSharedFilesData.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <CardDescription>Top 5 arquivos mais distribuídos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ChartContainer config={{}} className="h-full">
              <RechartsBarChart data={mostSharedFilesData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={150} tickMargin={10} tick={{ fontSize: 11 }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card border rounded p-2 shadow-lg">
                          <p className="font-medium">{data.name}</p>
                          <p className="text-dashboard-muted">Compartilhamentos: <span className="font-medium">{data.value}</span></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" fill="#4C6EF5" barSize={20} />
              </RechartsBarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <CardTitle>Arquivos Sensíveis Compartilhados</CardTitle>
            </div>
            <div className="relative group">
              <InfoIcon className="w-5 h-5 text-dashboard-muted cursor-help" />
              <div className="absolute hidden group-hover:block right-0 w-64 p-3 bg-card border rounded-md shadow-lg z-50 text-sm">
                <p className="font-medium mb-2">Arquivos de alta segurança mais compartilhados</p>
                <ul className="list-disc pl-4 space-y-1">
                  {securityRiskData.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <CardDescription>Arquivos de alta segurança mais compartilhados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ChartContainer config={{}} className="h-full">
              <RechartsBarChart data={securityRiskData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={150} tickMargin={10} tick={{ fontSize: 11 }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card border rounded p-2 shadow-lg">
                          <p className="font-medium">{data.name}</p>
                          <p className="text-dashboard-muted">Compartilhamentos: <span className="font-medium">{data.value}</span></p>
                          <p className="text-red-500 font-medium">Segurança: {data.securityLevel}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" fill="#EF4444" barSize={20} />
              </RechartsBarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringCharts;
