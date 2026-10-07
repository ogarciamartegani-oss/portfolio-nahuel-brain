import React, { useRef, useEffect, useState, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const BrainGraph = ({ data, onNodeClick }) => {
  const fgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Update dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Custom node rendering for glow effect
  const paintNode = useCallback((node, ctx, globalScale) => {
    const label = node.label;
    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px Inter, Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

    // Glow Effect
    ctx.shadowBlur = 15;
    ctx.shadowColor = node.color;
    
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.val * 0.5, 0, 2 * Math.PI, false);
    ctx.fillStyle = node.color;
    ctx.fill();
    
    // Reset shadow for text
    ctx.shadowBlur = 0;

    // Draw label
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(label, node.x, node.y + node.val * 0.5 + fontSize);
  }, []);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={data}
        nodeLabel="label"
        nodeColor="color"
        nodeVal="val"
        linkColor={() => 'rgba(255, 255, 255, 0.2)'}
        linkWidth={1.5}
        nodeCanvasObject={paintNode}
        onNodeClick={(node) => {
          // Center camera on node
          fgRef.current.centerAt(node.x, node.y, 1000);
          fgRef.current.zoom(8, 2000);
          onNodeClick(node);
        }}
        d3VelocityDecay={0.3} // makes the graph more fluid
        cooldownTicks={100}
        onEngineStop={() => fgRef.current.zoomToFit(400, 50)}
      />
    </div>
  );
};

export default BrainGraph;
