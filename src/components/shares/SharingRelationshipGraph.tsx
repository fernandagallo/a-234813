
import { useEffect, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { sharingRelationships, userDepartments, departmentColors } from '@/data/insightsData';

interface SharingRelationshipGraphProps {
  filteredUsers: string[] | null;
}

const SharingRelationshipGraph = ({ filteredUsers }: SharingRelationshipGraphProps) => {
  // Prepare nodes and edges data from the sharing relationships
  const { initialNodes, initialEdges } = useMemo(() => {
    const uniqueUsers = new Set<string>();
    
    // Add all users from the relationships
    sharingRelationships.forEach(rel => {
      uniqueUsers.add(rel.source);
      uniqueUsers.add(rel.target);
    });
    
    // Create nodes for each user
    const nodes = Array.from(uniqueUsers)
      .filter(user => !filteredUsers || filteredUsers.length === 0 || filteredUsers.includes(user))
      .map((user, index) => {
        // Position nodes in a circular layout
        const radius = 250;
        const angle = (index / uniqueUsers.size) * 2 * Math.PI;
        const x = radius * Math.cos(angle) + 300;
        const y = radius * Math.sin(angle) + 300;
        
        const department = userDepartments[user as keyof typeof userDepartments];
        const color = departmentColors[department as keyof typeof departmentColors];
        
        return {
          id: user,
          data: { 
            label: user,
            department 
          },
          position: { x, y },
          style: {
            background: color,
            color: '#ffffff',
            border: '1px solid #ffffff',
            width: 150,
            borderRadius: '50%',
            padding: '10px',
            fontSize: '12px'
          }
        };
      });
      
    // Create edges between users
    const edges = sharingRelationships
      .filter(rel => 
        (!filteredUsers || filteredUsers.length === 0 || 
          (filteredUsers.includes(rel.source) && filteredUsers.includes(rel.target)))
      )
      .map((rel, index) => ({
        id: `e${index}`,
        source: rel.source,
        target: rel.target,
        label: `${rel.files} files`,
        style: { 
          strokeWidth: Math.max(1, rel.strength / 2),
        },
        labelStyle: { fill: '#888', fontSize: 12 },
        animated: rel.strength > 5,
      }));
      
    return { 
      initialNodes: nodes, 
      initialEdges: edges 
    };
  }, [filteredUsers]);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // Update nodes and edges when filtered users change
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-right"
      >
        <Background color="#aaa" gap={16} />
        <Controls />
        <MiniMap
          nodeStrokeWidth={3}
          nodeColor={(node) => {
            const department = node.data.department;
            return departmentColors[department as keyof typeof departmentColors] || '#eee';
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default SharingRelationshipGraph;
