
import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { sharingRelationships, userDepartments, departmentColors } from '@/data/insightsData';

interface SharingGraphProps {
  selectedUser: string | null;
}

const SharingGraph: React.FC<SharingGraphProps> = ({ selectedUser }) => {
  // Preparar os nós e arestas para o grafo
  const generateGraph = useCallback(() => {
    // Criar um conjunto de usuários únicos
    const uniqueUsers = new Set<string>();
    sharingRelationships.forEach(rel => {
      uniqueUsers.add(rel.source);
      uniqueUsers.add(rel.target);
    });
    
    // Gerar nós em círculo
    const centerX = 500;
    const centerY = 250;
    const radius = 200;
    const nodes: Node[] = [];
    
    Array.from(uniqueUsers).forEach((user, i) => {
      const angle = (i / uniqueUsers.size) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const dept = userDepartments[user as keyof typeof userDepartments] || "Desconhecido";
      const color = departmentColors[dept as keyof typeof departmentColors] || "#888888";
      
      nodes.push({
        id: user,
        data: { 
          label: user,
          department: dept,
        },
        position: { x, y },
        style: { 
          background: color,
          color: '#fff',
          border: '1px solid #fff',
          width: 150,
          borderRadius: '50%',
          padding: '10px',
          fontSize: '14px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }
      });
    });
    
    // Gerar arestas com base nas relações
    const edges: Edge[] = sharingRelationships.map((rel, i) => ({
      id: `e${i}`,
      source: rel.source,
      target: rel.target,
      label: `${rel.files} arquivos`,
      labelStyle: { fill: '#888', fontWeight: 500 },
      animated: rel.strength > 5,
      style: { 
        stroke: '#888', 
        strokeWidth: Math.max(1, rel.strength / 2),
        opacity: 0.7
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#888',
      },
    }));
    
    return { nodes, edges };
  }, []);
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  useEffect(() => {
    const { nodes: initialNodes, edges: initialEdges } = generateGraph();
    
    if (selectedUser) {
      // Filtrar para mostrar apenas relacionamentos do usuário selecionado
      const filteredNodes = initialNodes.filter(node => 
        node.id === selectedUser || 
        initialEdges.some(edge => 
          (edge.source === selectedUser && edge.target === node.id) || 
          (edge.target === selectedUser && edge.source === node.id)
        )
      );
      
      const filteredEdges = initialEdges.filter(edge => 
        edge.source === selectedUser || edge.target === selectedUser
      );
      
      setNodes(filteredNodes);
      setEdges(filteredEdges);
    } else {
      // Mostrar todos os relacionamentos
      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, [generateGraph, selectedUser]);
  
  const onConnect = useCallback((params: any) => {
    setEdges((eds) => addEdge({
      ...params,
      animated: true,
      style: { stroke: '#888' }
    }, eds));
  }, [setEdges]);
  
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
      attributionPosition="bottom-right"
    >
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default SharingGraph;
