
import React, { useState } from 'react';
import SharingGraph from './SharingGraph';
import SharingStats from './SharingStats';
import UserFilter from './UserFilter';
import FileShareTable from './FileShareTable';
import MonitoringCharts from './MonitoringCharts';
import { allUsers } from '@/data/insightsData';

const InsightsTab = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Insights de Compartilhamento</h1>
        <p className="text-dashboard-muted">Visualização de como os arquivos são compartilhados entre usuários na organização</p>
      </header>
      
      <div className="flex flex-col space-y-6">
        <div className="dashboard-card p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-xl font-medium">Grafo de Relacionamentos</h2>
            <UserFilter 
              users={allUsers} 
              selectedUser={selectedUser} 
              onChange={setSelectedUser} 
            />
          </div>
          <div className="h-[500px] w-full">
            <SharingGraph selectedUser={selectedUser} />
          </div>
        </div>
        
        <MonitoringCharts />
        
        <FileShareTable />
        
        <SharingStats />
      </div>
    </>
  );
};

export default InsightsTab;
