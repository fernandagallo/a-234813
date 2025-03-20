
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PermissionsTab from './PermissionsTab';
import RulesConfigTab from './RulesConfigTab';

const RulesTab = () => {
  return (
    <Tabs defaultValue="permissions" className="w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-medium mb-2">Gerenciamento de Regras</h1>
        <p className="text-dashboard-muted">Configure permissões de usuários e regras de acesso do sistema</p>
      </header>
      
      <TabsList className="mb-6 bg-dashboard-card">
        <TabsTrigger value="permissions">Permissões</TabsTrigger>
        <TabsTrigger value="rules">Regras</TabsTrigger>
      </TabsList>
      
      <TabsContent value="permissions">
        <PermissionsTab />
      </TabsContent>
      
      <TabsContent value="rules">
        <RulesConfigTab />
      </TabsContent>
    </Tabs>
  );
};

export default RulesTab;
