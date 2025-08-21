import React, { useRef, useEffect, useState } from 'react';
// import ForceGraph2D from 'react-force-graph-2d';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react';

interface Node {
  id: string;
  name: string;
  type: 'concept' | 'topic' | 'subtopic';
  size: number;
  color: string;
}

interface Link {
  source: string;
  target: string;
  relationship: string;
  strength: number;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

interface KnowledgeGraphProps {
  data: GraphData;
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ data }) => {
  const fgRef = useRef<any>();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [graphDimensions, setGraphDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector('.graph-container');
      if (container) {
        const { width, height } = container.getBoundingClientRect();
        setGraphDimensions({ width: width - 32, height: height - 32 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleNodeClick = (node: any) => {
    setSelectedNode(node);
    if (fgRef.current) {
      fgRef.current.centerAt(node.x, node.y, 1000);
      fgRef.current.zoom(2, 1000);
    }
  };

  const resetView = () => {
    if (fgRef.current) {
      fgRef.current.zoomToFit(400);
      setSelectedNode(null);
    }
  };

  const zoomIn = () => {
    if (fgRef.current) {
      const currentZoom = fgRef.current.zoom();
      fgRef.current.zoom(currentZoom * 1.5, 300);
    }
  };

  const zoomOut = () => {
    if (fgRef.current) {
      const currentZoom = fgRef.current.zoom();
      fgRef.current.zoom(currentZoom / 1.5, 300);
    }
  };

  const exportGraph = () => {
    if (fgRef.current) {
      const canvas = fgRef.current.graph2ScreenCoords();
      const link = document.createElement('a');
      link.download = 'knowledge-graph.png';
      link.href = fgRef.current.renderer().domElement().toDataURL();
      link.click();
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={zoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={zoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={resetView}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Badge variant="secondary">
            {data.nodes.length} Concepts
          </Badge>
          <Badge variant="secondary">
            {data.links.length} Connections
          </Badge>
          <Button variant="outline" size="sm" onClick={exportGraph}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Graph Container */}
      <Card className="graph-container relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm" style={{ height: '70vh' }}>
        <div className="gradient-glow absolute inset-0 opacity-10" />
        
        <ForceGraph2D
          ref={fgRef}
          graphData={data}
          width={graphDimensions.width}
          height={graphDimensions.height}
          backgroundColor="transparent"
          nodeLabel="name"
          nodeColor={(node: any) => node.color || '#8b5cf6'}
          nodeVal={(node: any) => node.size || 4}
          nodeCanvasObjectMode={() => 'after'}
          nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
            const label = node.name;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Inter, system-ui, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = selectedNode?.id === node.id ? '#ffffff' : '#e2e8f0';
            ctx.fillText(label, node.x, node.y + (node.size || 4) + fontSize);
          }}
          linkColor={() => '#8b5cf6'}
          linkWidth={(link: any) => Math.max(1, link.strength * 3)}
          linkLabel={(link: any) => link.relationship}
          onNodeClick={handleNodeClick}
          cooldownTicks={100}
          warmupTicks={50}
          d3AlphaDecay={0.01}
          d3VelocityDecay={0.08}
        />
      </Card>

      {/* Selected Node Details */}
      {selectedNode && (
        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: selectedNode.color }}
              />
              <h3 className="font-semibold text-lg">{selectedNode.name}</h3>
              <Badge variant="outline">{selectedNode.type}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Connected to {data.links.filter(link => 
                link.source === selectedNode.id || link.target === selectedNode.id
              ).length} other concepts
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default KnowledgeGraph;