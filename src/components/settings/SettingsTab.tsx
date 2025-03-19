
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ActionsTab from './ActionsTab';
import ComplianceTab from './ComplianceTab';

const SettingsTab = () => {
  return (
    <Tabs defaultValue="actions" className="w-full">
      <TabsList className="mb-6 bg-dashboard-card">
        <TabsTrigger value="actions">Ações Prioritárias</TabsTrigger>
        <TabsTrigger value="compliance">Conformidade</TabsTrigger>
      </TabsList>
      
      <TabsContent value="actions">
        <ActionsTab />
      </TabsContent>
      
      <TabsContent value="compliance">
        <ComplianceTab />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTab;
