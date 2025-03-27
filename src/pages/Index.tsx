
import { useState } from 'react';
import SidePanel from '@/components/SidePanel';
import DashboardTab from '@/components/dashboard/DashboardTab';
import UsersTab from '@/components/users/UsersTab';
import SettingsTab from '@/components/settings/SettingsTab';
import RulesTab from '@/components/rules/RulesTab';
import SharesTab from '@/components/shares/SharesTab';
import FilesTab from '@/components/files/FilesTab';
import WorkstationsTab from '@/components/workstations/WorkstationsTab';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'users':
        return <UsersTab />;
      case 'files':
        return <FilesTab />;
      case 'workstations':
        return <WorkstationsTab />;
      case 'rules':
        return <RulesTab />;
      case 'shares':
        return <SharesTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <SidePanel onTabChange={setActiveTab} />
      <div className="pl-64">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;
