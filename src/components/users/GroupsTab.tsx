
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { PlusCircle, Users, UserPlus, X, ChevronDown } from "lucide-react";

// Mock data for user groups
const initialGroups = [
  { 
    id: 1, 
    name: "Administradores",
    description: "Acesso total ao sistema", 
    members: ["Ana Silva", "Carlos Mendes"],
    permissions: ["LGPD", "GDPR", "PCI DSS"]
  },
  { 
    id: 2, 
    name: "Analistas",
    description: "Acesso de leitura e análise", 
    members: ["Juliana Costa", "Roberto Alves"],
    permissions: ["LGPD", "ISO 27001"]
  },
  { 
    id: 3, 
    name: "Auditores",
    description: "Acesso de leitura para auditorias", 
    members: ["Patricia Lima"],
    permissions: ["LGPD", "SOX"]
  }
];

// Mock users for selection
const availableUsers = [
  "Ana Silva",
  "Carlos Mendes",
  "Juliana Costa",
  "Roberto Alves",
  "Patricia Lima",
  "Felipe Santos",
  "Mariana Oliveira",
  "Gabriel Ferreira"
];

// Mock permissions for selection
const availablePermissions = [
  "LGPD",
  "GDPR",
  "ISO 27001",
  "PCI DSS",
  "SOX"
];

const GroupsTab = () => {
  const [groups, setGroups] = useState(initialGroups);
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    members: [],
    permissions: []
  });
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedPermission, setSelectedPermission] = useState("");
  const [openGroupId, setOpenGroupId] = useState(null);

  const handleAddGroup = () => {
    if (!newGroup.name) return;
    
    const newId = groups.length ? Math.max(...groups.map(g => g.id)) + 1 : 1;
    setGroups([...groups, { ...newGroup, id: newId }]);
    
    // Reset form
    setNewGroup({
      name: "",
      description: "",
      members: [],
      permissions: []
    });
    setIsAddingGroup(false);
  };

  const handleAddMember = () => {
    if (!selectedUser || newGroup.members.includes(selectedUser)) return;
    
    setNewGroup({
      ...newGroup,
      members: [...newGroup.members, selectedUser]
    });
    
    setSelectedUser("");
  };

  const handleRemoveMember = (member) => {
    setNewGroup({
      ...newGroup,
      members: newGroup.members.filter(m => m !== member)
    });
  };

  const handleAddPermission = () => {
    if (!selectedPermission || newGroup.permissions.includes(selectedPermission)) return;
    
    setNewGroup({
      ...newGroup,
      permissions: [...newGroup.permissions, selectedPermission]
    });
    
    setSelectedPermission("");
  };

  const handleRemovePermission = (permission) => {
    setNewGroup({
      ...newGroup,
      permissions: newGroup.permissions.filter(p => p !== permission)
    });
  };

  const handleDeleteGroup = (id) => {
    setGroups(groups.filter(group => group.id !== id));
  };

  const toggleGroupDetails = (id) => {
    setOpenGroupId(openGroupId === id ? null : id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-medium">Grupos de Usuários</h2>
          <p className="text-dashboard-muted">Gerencie grupos de acesso para simplificar permissões</p>
        </div>
        <Button 
          onClick={() => setIsAddingGroup(!isAddingGroup)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          {isAddingGroup ? "Cancelar" : "Novo Grupo"}
        </Button>
      </div>

      {isAddingGroup && (
        <div className="dashboard-card p-4 mb-6">
          <h3 className="font-medium mb-4">Criar Novo Grupo</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">Nome do Grupo</label>
              <Input 
                value={newGroup.name}
                onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                placeholder="Nome do grupo"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Descrição</label>
              <Input 
                value={newGroup.description}
                onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                placeholder="Descrição do grupo"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Membros</h4>
              <div className="flex gap-2 mb-2">
                <Select onValueChange={setSelectedUser} value={selectedUser}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUsers
                      .filter(user => !newGroup.members.includes(user))
                      .map((user, index) => (
                        <SelectItem key={index} value={user}>
                          {user}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <Button onClick={handleAddMember} disabled={!selectedUser}>
                  <UserPlus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="max-h-40 overflow-y-auto p-2 border border-white/10 rounded">
                {newGroup.members.length === 0 ? (
                  <p className="text-dashboard-muted text-sm">Nenhum membro adicionado</p>
                ) : (
                  <div className="space-y-1">
                    {newGroup.members.map((member, index) => (
                      <div key={index} className="flex justify-between items-center bg-white/5 p-2 rounded">
                        <span>{member}</span>
                        <button 
                          onClick={() => handleRemoveMember(member)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Permissões</h4>
              <div className="flex gap-2 mb-2">
                <Select onValueChange={setSelectedPermission} value={selectedPermission}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar permissão" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePermissions
                      .filter(perm => !newGroup.permissions.includes(perm))
                      .map((perm, index) => (
                        <SelectItem key={index} value={perm}>
                          {perm}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <Button onClick={handleAddPermission} disabled={!selectedPermission}>
                  <PlusCircle className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="max-h-40 overflow-y-auto p-2 border border-white/10 rounded">
                {newGroup.permissions.length === 0 ? (
                  <p className="text-dashboard-muted text-sm">Nenhuma permissão adicionada</p>
                ) : (
                  <div className="space-y-1">
                    {newGroup.permissions.map((permission, index) => (
                      <div key={index} className="flex justify-between items-center bg-white/5 p-2 rounded">
                        <span>{permission}</span>
                        <button 
                          onClick={() => handleRemovePermission(permission)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsAddingGroup(false)}>Cancelar</Button>
            <Button onClick={handleAddGroup} disabled={!newGroup.name}>
              Criar Grupo
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {groups.map((group) => (
          <Card key={group.id} className="dashboard-card overflow-hidden">
            <Collapsible open={openGroupId === group.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-400" />
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleDeleteGroup(group.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => toggleGroupDetails(group.id)}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${openGroupId === group.id ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <p className="text-sm text-dashboard-muted">{group.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-dashboard-muted">{group.members.length} membros</span>
                  <span className="text-xs text-dashboard-muted">•</span>
                  <span className="text-xs text-dashboard-muted">{group.permissions.length} permissões</span>
                </div>
              </CardHeader>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Membros</h3>
                      <div className="bg-white/5 rounded p-2 max-h-40 overflow-y-auto">
                        {group.members.length === 0 ? (
                          <p className="text-dashboard-muted text-sm">Nenhum membro adicionado</p>
                        ) : (
                          <div className="space-y-1">
                            {group.members.map((member, index) => (
                              <div key={index} className="p-2 rounded bg-white/10">
                                {member}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Permissões</h3>
                      <div className="bg-white/5 rounded p-2 max-h-40 overflow-y-auto">
                        {group.permissions.length === 0 ? (
                          <p className="text-dashboard-muted text-sm">Nenhuma permissão adicionada</p>
                        ) : (
                          <div className="space-y-1">
                            {group.permissions.map((permission, index) => (
                              <div key={index} className="p-2 rounded bg-white/10">
                                {permission}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GroupsTab;
