
import React from 'react';
import { BookOpen, Shield, FileCheck, ListChecks, CheckCircle, AlertCircle } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { complianceData } from '@/data/mockData';
import { getStatusColor } from '@/utils/statusUtils';
import CustomerRequests from '@/components/CustomerRequests';

const ComplianceTab = () => {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Conformidade com Regulamentos</h1>
        <p className="text-dashboard-muted">Status de conformidade com regulamentos de proteção de dados</p>
      </header>
      
      <div className="dashboard-card mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hash</TableHead>
              <TableHead>URI</TableHead>
              <TableHead>Regulamento</TableHead>
              <TableHead>Requisito</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complianceData.map((compliance, index) => (
              <TableRow key={index}>
                <TableCell className="font-mono">{compliance.hash}</TableCell>
                <TableCell className="max-w-xs truncate">{compliance.uri}</TableCell>
                <TableCell>{compliance.regulation}</TableCell>
                <TableCell>{compliance.requirement}</TableCell>
                <TableCell className={getStatusColor(compliance.status)}>{compliance.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-medium">LGPD</h2>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <CheckCircle className="w-4 h-4 text-green-500 inline mr-2" />
              <span className="text-sm">Atendidos: 24</span>
            </div>
            <div>
              <AlertCircle className="w-4 h-4 text-red-500 inline mr-2" />
              <span className="text-sm">Pendentes: 8</span>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-green-400" />
            <h2 className="text-xl font-medium">GDPR</h2>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <CheckCircle className="w-4 h-4 text-green-500 inline mr-2" />
              <span className="text-sm">Atendidos: 32</span>
            </div>
            <div>
              <AlertCircle className="w-4 h-4 text-red-500 inline mr-2" />
              <span className="text-sm">Pendentes: 5</span>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-4">
            <FileCheck className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl font-medium">HIPAA</h2>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <CheckCircle className="w-4 h-4 text-green-500 inline mr-2" />
              <span className="text-sm">Atendidos: 18</span>
            </div>
            <div>
              <AlertCircle className="w-4 h-4 text-red-500 inline mr-2" />
              <span className="text-sm">Pendentes: 7</span>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-4">
            <ListChecks className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-medium">CCPA</h2>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <CheckCircle className="w-4 h-4 text-green-500 inline mr-2" />
              <span className="text-sm">Atendidos: 15</span>
            </div>
            <div>
              <AlertCircle className="w-4 h-4 text-red-500 inline mr-2" />
              <span className="text-sm">Pendentes: 3</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplianceTab;
