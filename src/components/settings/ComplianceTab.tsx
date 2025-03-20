
import React from 'react';
import { BookOpen, Shield, FileCheck, ListChecks, CheckCircle, AlertCircle } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { complianceData } from '@/data/mockData';
import { getStatusColor } from '@/utils/statusUtils';
import CustomerRequests from '@/components/CustomerRequests';

// Mock user and department data to match with the compliance documents
const userAssignments = [
  { hash: "3f8a9b2c1d...", username: "Ana Silva", department: "Segurança" },
  { hash: "7d4e2f1a9c...", username: "Carlos Mendes", department: "RH" },
  { hash: "2c5d8e3f1a...", username: "Juliana Costa", department: "Legal" },
  { hash: "9a3b5c7d2e...", username: "Roberto Alves", department: "Marketing" },
  { hash: "1e4f7a9d3b...", username: "Patricia Lima", department: "Compliance" },
];

const ComplianceTab = () => {
  // Function to find user assignment by hash
  const getUserAssignment = (hash) => {
    return userAssignments.find(user => user.hash === hash) || { username: "Não atribuído", department: "N/A" };
  };

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
              <TableHead>Usuário</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Hash</TableHead>
              <TableHead>URI</TableHead>
              <TableHead>Regulamento</TableHead>
              <TableHead>Requisito</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complianceData.map((compliance, index) => {
              const { username, department } = getUserAssignment(compliance.hash);
              return (
                <TableRow key={index}>
                  <TableCell>{username}</TableCell>
                  <TableCell>{department}</TableCell>
                  <TableCell className="font-mono">{compliance.hash}</TableCell>
                  <TableCell className="max-w-xs truncate">{compliance.uri}</TableCell>
                  <TableCell>{compliance.regulation}</TableCell>
                  <TableCell>{compliance.requirement}</TableCell>
                  <TableCell className={getStatusColor(compliance.status)}>{compliance.status}</TableCell>
                </TableRow>
              );
            })}
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
