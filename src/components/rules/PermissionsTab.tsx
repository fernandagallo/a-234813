
import { useState } from 'react';
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
import { PlusCircle, X } from "lucide-react";

// Mock data for available regulations
const availableRegulations = [
  { id: 1, name: "LGPD" },
  { id: 2, name: "GDPR" },
  { id: 3, name: "ISO 27001" },
  { id: 4, name: "PCI DSS" },
  { id: 5, name: "SOX" },
];

// Initial users data
const initialUsers = [
  { 
    id: 1, 
    name: "João Silva", 
    department: "TI", 
    permissions: ["LGPD", "ISO 27001"] 
  },
  { 
    id: 2, 
    name: "Maria Oliveira", 
    department: "Comercial", 
    permissions: ["LGPD"] 
  },
  { 
    id: 3, 
    name: "Carlos Santos", 
    department: "Jurídico", 
    permissions: ["LGPD", "GDPR", "SOX"] 
  },
];

const PermissionsTab = () => {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ name: "", department: "", permissions: [] });
  const [selectedRegulation, setSelectedRegulation] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddPermission = (userId) => {
    if (!selectedRegulation) return;
    
    setUsers(users.map(user => {
      if (user.id === userId && !user.permissions.includes(selectedRegulation)) {
        return {
          ...user,
          permissions: [...user.permissions, selectedRegulation]
        };
      }
      return user;
    }));
    
    setSelectedRegulation("");
  };

  const handleRemovePermission = (userId, permission) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          permissions: user.permissions.filter(p => p !== permission)
        };
      }
      return user;
    }));
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.department) return;
    
    const newId = Math.max(...users.map(u => u.id)) + 1;
    setUsers([...users, { ...newUser, id: newId, permissions: [] }]);
    setNewUser({ name: "", department: "", permissions: [] });
    setShowAddForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Permissões de Usuários</h2>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Adicionar Usuário
        </Button>
      </div>

      {showAddForm && (
        <div className="dashboard-card p-4 mb-6">
          <h3 className="font-medium mb-4">Novo Usuário</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">Nome</label>
              <Input 
                value={newUser.name} 
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                placeholder="Nome do usuário"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Setor</label>
              <Input 
                value={newUser.department} 
                onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                placeholder="Setor/Departamento"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancelar</Button>
            <Button onClick={handleAddUser}>Adicionar</Button>
          </div>
        </div>
      )}

      <div className="dashboard-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do Usuário</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Permissões de Acesso</TableHead>
              <TableHead>Adicionar Regulamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.permissions.map((permission, index) => (
                      <div 
                        key={index} 
                        className="px-2 py-1 rounded bg-white/10 text-xs flex items-center gap-1"
                      >
                        {permission}
                        <button 
                          onClick={() => handleRemovePermission(user.id, permission)} 
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Select onValueChange={setSelectedRegulation} value={selectedRegulation}>
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableRegulations.map(regulation => (
                          <SelectItem 
                            key={regulation.id} 
                            value={regulation.name}
                            disabled={user.permissions.includes(regulation.name)}
                          >
                            {regulation.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      size="sm" 
                      onClick={() => handleAddPermission(user.id)}
                      disabled={!selectedRegulation}
                    >
                      Adicionar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PermissionsTab;
