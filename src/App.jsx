import React, { useState } from 'react';
import { knowledgeMap } from './data/knowledgeMap';
import BrainGraph from './components/BrainGraph';
import NodeDetails from './components/NodeDetails';
import { Network } from 'lucide-react';

function App() {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const handleCloseDetails = () => {
    setSelectedNode(null);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* Header / Hero */}
      <div className="header glass-panel">
        <h1>El Cerebro de Nahuel</h1>
        <p>
          Explora de forma interactiva mi trayectoria, desde la ejecución operativa
          hasta el gobierno estratégico, mis proyectos de este año y la biblioteca de 
          conocimientos que me ha formado.
        </p>
      </div>

      {/* Main Graph Visualization */}
      <BrainGraph data={knowledgeMap} onNodeClick={handleNodeClick} />

      {/* Details Sidebar */}
      <NodeDetails node={selectedNode} onClose={handleCloseDetails} />

      {/* UI Controls / Info */}
      <div className="controls glass-panel">
        <Network size={18} color="#94a3b8" />
        <span>Interactúa: Arrastra, haz scroll para zoom, o clic en los nodos.</span>
      </div>
    </div>
  );
}

export default App;
