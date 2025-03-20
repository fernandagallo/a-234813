
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userDepartments } from '@/data/insightsData';

interface UserFilterProps {
  users: string[];
  selectedUser: string | null;
  onChange: (user: string | null) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ users, selectedUser, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium mr-2">Filtrar por usuário:</span>
      <Select
        value={selectedUser || ''}
        onValueChange={(value) => onChange(value ? value : null)}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Todos os usuários" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todos os usuários</SelectItem>
          {users.map((user) => (
            <SelectItem key={user} value={user}>
              {user} ({userDepartments[user as keyof typeof userDepartments]})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserFilter;
