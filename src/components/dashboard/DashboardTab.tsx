
import React from 'react';
import MetricCard from '@/components/MetricCard';
import MonthlyChart from '@/components/MonthlyChart';
import CustomerRequests from '@/components/CustomerRequests';
import { dataOverview } from '@/data/mockData';

const DashboardTab = () => {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Visão Geral</h1>
        <p className="text-dashboard-muted">Dashboard de descoberta e classificação de dados para proteção de dados</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard title="Hosts" value={dataOverview.hosts} color="#7EBF8E" unit="" />
        <MetricCard title="Total de Documentos" value={dataOverview.totalDocuments} color="#61AAF2" unit="" />
        <MetricCard title="Docs. Confidenciais" value={dataOverview.confidentialDocs} total={dataOverview.totalDocuments} color="#FF6B6B" />
        <MetricCard title="Docs. com PII" value={dataOverview.piiDocs} total={dataOverview.totalDocuments} color="#FFD166" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <MetricCard title="PII Sensível" value={dataOverview.sensitivePiiDocs} total={dataOverview.totalDocuments} color="#8989DE" />
        <MetricCard title="Docs. Corporativos" value={dataOverview.corporateDocs} total={dataOverview.totalDocuments} color="#4ECDC4" />
        <MetricCard title="Docs. Governamentais" value={dataOverview.governmentDocs} total={dataOverview.totalDocuments} color="#F9C80E" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyChart />
        <CustomerRequests />
      </div>
    </>
  );
};

export default DashboardTab;
