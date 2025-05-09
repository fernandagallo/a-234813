
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Settings, Users, Shield, Share2, FileText, Cpu, Logs } from "lucide-react";

interface SidePanelProps {
  onTabChange: (value: string) => void;
}

const SidePanel = ({ onTabChange }: SidePanelProps) => {
  return (
    <div className="h-screen fixed left-0 top-0 w-64 glass-card border-r border-white/10">
      <div className="p-6">
        <h2 className="text-xl font-medium mb-6">Navegação</h2>
        <Tabs 
          defaultValue="dashboard" 
          orientation="vertical" 
          className="w-full"
          onValueChange={onTabChange}
        >
          <TabsList className="flex flex-col h-auto bg-transparent text-white">
            <TabsTrigger 
              value="dashboard" 
              className="w-full justify-start gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white"
            >
              <LayoutDashboard className="w-4 h-4" />
              Central de Monitoramento
            </TabsTrigger>
            <TabsTrigger 
              value="users" 
              className="w-full justify-start gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white"
            >
              <Users className="w-4 h-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger 
              value="files" 
              className="w-full justify-start gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white"
            >
              <FileText className="w-4 h-4" />
              Arquivos
            </TabsTrigger>
            <TabsTrigger 
              value="workstations" 
              className="w-full justify-start gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white"
            >
              <Cpu className="w-4 h-4" />
              Estações de Trabalho
            </TabsTrigger>
            <TabsTrigger 
              value="logs" 
              className="w-full justify-start gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white"
            >
              <Logs className="w-4 h-4" />
              Acessos de Log
            </TabsTrigger>
            <TabsTrigger 
              value="rules" 
              className="w-full justify-start gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white"
            >
              <Shield className="w-4 h-4" />
              Gerenciamento de Regras
            </TabsTrigger>
            <TabsTrigger 
              value="shares" 
              className="w-full justify-start gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white"
            >
              <Share2 className="w-4 h-4" />
              Compartilhamentos
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="w-full justify-start gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white"
            >
              <Settings className="w-4 h-4" />
              Ações e Conformidade
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default SidePanel;
