
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Trash2 } from "lucide-react";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

// Initial rules data
const initialRules = [
  {
    id: 1,
    name: "Acesso a Dados Sensíveis",
    description: "Define quem pode acessar dados pessoais sensíveis no sistema",
    parameters: ["Nível de Acesso", "Departamento", "Cargo"],
    active: true
  },
  {
    id: 2,
    name: "Exportação de Relatórios",
    description: "Controla quais usuários podem exportar relatórios confidenciais",
    parameters: ["Tipo de Relatório", "Volume de Dados", "Finalidade"],
    active: true
  },
  {
    id: 3,
    name: "Modificação de Registros",
    description: "Estabelece permissões para alterar registros históricos",
    parameters: ["Antiguidade do Registro", "Justificativa", "Aprovação"],
    active: false
  }
];

const RulesConfigTab = () => {
  const [rules, setRules] = useState(initialRules);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newParameter, setNewParameter] = useState("");
  const [editingRuleId, setEditingRuleId] = useState(null);
  
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      parameters: [],
      active: true
    }
  });

  const handleAddRule = (data) => {
    if (editingRuleId) {
      // Update existing rule
      setRules(rules.map(rule => 
        rule.id === editingRuleId ? { ...data, id: editingRuleId } : rule
      ));
      setEditingRuleId(null);
    } else {
      // Add new rule
      const newId = rules.length ? Math.max(...rules.map(r => r.id)) + 1 : 1;
      setRules([...rules, { ...data, id: newId }]);
    }
    
    form.reset({
      name: "",
      description: "",
      parameters: [],
      active: true
    });
    setShowAddForm(false);
  };

  const handleDeleteRule = (id) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const handleEditRule = (rule) => {
    form.reset({
      name: rule.name,
      description: rule.description,
      parameters: rule.parameters,
      active: rule.active
    });
    setEditingRuleId(rule.id);
    setShowAddForm(true);
  };

  const handleToggleActive = (id) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, active: !rule.active } : rule
    ));
  };

  const handleAddParameter = () => {
    if (!newParameter.trim()) return;
    
    const currentParams = form.getValues("parameters") || [];
    form.setValue("parameters", [...currentParams, newParameter]);
    setNewParameter("");
  };

  const handleRemoveParameter = (index) => {
    const currentParams = form.getValues("parameters") || [];
    form.setValue("parameters", currentParams.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Configuração de Regras</h2>
        <Button 
          onClick={() => {
            form.reset({
              name: "",
              description: "",
              parameters: [],
              active: true
            });
            setEditingRuleId(null);
            setShowAddForm(!showAddForm);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {showAddForm ? "Cancelar" : "Nova Regra"}
        </Button>
      </div>

      {showAddForm && (
        <div className="dashboard-card mb-6">
          <h3 className="text-lg font-medium mb-4">
            {editingRuleId ? "Editar Regra" : "Nova Regra"}
          </h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddRule)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Regra</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da regra" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descrição da regra" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="parameters"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parâmetros</FormLabel>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Novo parâmetro" 
                          value={newParameter}
                          onChange={(e) => setNewParameter(e.target.value)}
                        />
                        <Button type="button" onClick={handleAddParameter}>Adicionar</Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value?.map((param, index) => (
                          <div 
                            key={index} 
                            className="px-3 py-1 rounded bg-white/10 text-sm flex items-center gap-2"
                          >
                            {param}
                            <button 
                              type="button"
                              onClick={() => handleRemoveParameter(index)} 
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <input 
                        type="checkbox" 
                        checked={field.value} 
                        onChange={field.onChange}
                        className="w-4 h-4"
                      />
                    </FormControl>
                    <FormLabel className="m-0">Regra Ativa</FormLabel>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Regra
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rules.map(rule => (
          <Card key={rule.id} className={`dashboard-card ${!rule.active ? 'opacity-70' : ''}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{rule.name}</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleToggleActive(rule.id)}
                  >
                    {rule.active ? 'Desativar' : 'Ativar'}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleEditRule(rule)}
                  >
                    Editar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="text-red-400 hover:text-red-300" 
                    onClick={() => handleDeleteRule(rule.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dashboard-muted mb-4">{rule.description}</p>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Parâmetros:</h4>
                <div className="flex flex-wrap gap-2">
                  {rule.parameters.map((param, index) => (
                    <div key={index} className="px-2 py-1 bg-white/10 rounded text-xs">
                      {param}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RulesConfigTab;
