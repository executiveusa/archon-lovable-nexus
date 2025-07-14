import React, { useState, useRef, useCallback } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { GlassContainer } from '../glass/GlassContainer';
import { GlassButton } from '../glass/GlassButton';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Move, 
  RotateCw, 
  Scale, 
  Palette, 
  Eye, 
  Code, 
  Save,
  Undo,
  Redo,
  Grid,
  Layers
} from 'lucide-react';

interface CanvasElement {
  id: string;
  type: 'hero' | 'text' | 'image' | 'button' | 'card';
  position: { x: number; y: number };
  size: { width: number; height: number };
  rotation: number;
  content?: string;
  style?: Record<string, any>;
}

interface MirrorFrameEditorProps {
  isVisible?: boolean;
  onClose?: () => void;
}

export function MirrorFrameEditor({ isVisible = true, onClose }: MirrorFrameEditorProps) {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [tool, setTool] = useState<'select' | 'move' | 'rotate' | 'scale'>('select');
  const [snapToGrid, setSnapToGrid] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addElement = useCallback((type: CanvasElement['type']) => {
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type,
      position: { x: 100, y: 100 },
      size: { width: 200, height: 100 },
      rotation: 0,
      content: type === 'text' ? 'Sample Text' : undefined,
      style: {}
    };
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<CanvasElement>) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
  }, []);

  const deleteElement = useCallback((id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    setSelectedElement(null);
  }, []);

  const snapPosition = useCallback((position: { x: number; y: number }) => {
    if (!snapToGrid) return position;
    const gridSize = 20;
    return {
      x: Math.round(position.x / gridSize) * gridSize,
      y: Math.round(position.y / gridSize) * gridSize
    };
  }, [snapToGrid]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-4 z-50 flex"
    >
      <div className="flex w-full h-full gap-4">
        {/* Left Toolbar */}
        <GlassContainer className="w-64 p-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 text-foreground">Tools</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Move, label: 'Move', value: 'move' },
                  { icon: RotateCw, label: 'Rotate', value: 'rotate' },
                  { icon: Scale, label: 'Scale', value: 'scale' },
                  { icon: Eye, label: 'Select', value: 'select' }
                ].map(({ icon: Icon, label, value }) => (
                  <GlassButton
                    key={value}
                    variant={tool === value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTool(value as any)}
                    className="flex flex-col items-center gap-1 h-auto py-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs">{label}</span>
                  </GlassButton>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-foreground">Elements</h3>
              <div className="space-y-2">
                {[
                  { type: 'hero', label: 'Hero Section' },
                  { type: 'text', label: 'Text Block' },
                  { type: 'image', label: 'Image' },
                  { type: 'button', label: 'Button' },
                  { type: 'card', label: 'Card' }
                ].map(({ type, label }) => (
                  <GlassButton
                    key={type}
                    variant="outline"
                    size="sm"
                    onClick={() => addElement(type as any)}
                    className="w-full justify-start"
                  >
                    <Layers className="w-4 h-4 mr-2" />
                    {label}
                  </GlassButton>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-foreground">Settings</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={snapToGrid}
                    onChange={(e) => setSnapToGrid(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-foreground">Snap to Grid</span>
                </label>
              </div>
            </div>
          </div>
        </GlassContainer>

        {/* Main Canvas */}
        <GlassContainer className="flex-1 relative">
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <GlassButton size="sm" variant="outline">
                <Undo className="w-4 h-4" />
              </GlassButton>
              <GlassButton size="sm" variant="outline">
                <Redo className="w-4 h-4" />
              </GlassButton>
              <GlassButton size="sm" variant="outline" onClick={() => setSnapToGrid(!snapToGrid)}>
                <Grid className="w-4 h-4" />
              </GlassButton>
            </div>
            <div className="flex items-center gap-2">
              <GlassButton size="sm" variant="outline">
                <Eye className="w-4 h-4" />
              </GlassButton>
              <GlassButton size="sm" variant="outline">
                <Code className="w-4 h-4" />
              </GlassButton>
              <GlassButton size="sm">
                <Save className="w-4 h-4" />
              </GlassButton>
              {onClose && (
                <GlassButton size="sm" variant="ghost" onClick={onClose}>
                  ×
                </GlassButton>
              )}
            </div>
          </div>

          <div
            ref={canvasRef}
            className="w-full h-full relative overflow-hidden"
            style={{
              backgroundImage: snapToGrid ? 
                'radial-gradient(circle, hsl(var(--muted)) 1px, transparent 1px)' : 'none',
              backgroundSize: snapToGrid ? '20px 20px' : 'auto'
            }}
          >
            {/* Canvas Elements */}
            {elements.map((element) => (
              <motion.div
                key={element.id}
                drag
                dragMomentum={false}
                onDragEnd={(_, info) => {
                  const newPosition = snapPosition({
                    x: element.position.x + info.offset.x,
                    y: element.position.y + info.offset.y
                  });
                  updateElement(element.id, { position: newPosition });
                }}
                className={`absolute cursor-pointer border-2 rounded-lg ${
                  selectedElement === element.id 
                    ? 'border-primary' 
                    : 'border-transparent hover:border-muted'
                }`}
                style={{
                  left: element.position.x,
                  top: element.position.y,
                  width: element.size.width,
                  height: element.size.height,
                  transform: `rotate(${element.rotation}deg)`
                }}
                onClick={() => setSelectedElement(element.id)}
              >
                <div className="w-full h-full bg-background/50 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center">
                  {element.type === 'text' && (
                    <p className="text-foreground text-center">{element.content}</p>
                  )}
                  {element.type === 'hero' && (
                    <div className="text-center">
                      <h2 className="text-lg font-bold text-foreground">Hero Section</h2>
                      <p className="text-sm text-muted-foreground">Sample hero content</p>
                    </div>
                  )}
                  {element.type === 'button' && (
                    <GlassButton size="sm">Sample Button</GlassButton>
                  )}
                  {element.type === 'card' && (
                    <Card className="w-full h-full p-2">
                      <p className="text-xs text-foreground">Card Content</p>
                    </Card>
                  )}
                  {element.type === 'image' && (
                    <div className="w-full h-full bg-muted rounded flex items-center justify-center">
                      <span className="text-muted-foreground text-xs">Image</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </GlassContainer>

        {/* Right Properties Panel */}
        {selectedElement && (
          <GlassContainer className="w-64 p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Properties</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <label className="block text-muted-foreground mb-1">Width</label>
                    <input
                      type="number"
                      className="w-full p-1 rounded bg-background border border-border text-foreground"
                      value={elements.find(el => el.id === selectedElement)?.size.width || 0}
                      onChange={(e) => updateElement(selectedElement, { 
                        size: { 
                          ...elements.find(el => el.id === selectedElement)?.size!,
                          width: parseInt(e.target.value) 
                        } 
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1">Height</label>
                    <input
                      type="number"
                      className="w-full p-1 rounded bg-background border border-border text-foreground"
                      value={elements.find(el => el.id === selectedElement)?.size.height || 0}
                      onChange={(e) => updateElement(selectedElement, { 
                        size: { 
                          ...elements.find(el => el.id === selectedElement)?.size!,
                          height: parseInt(e.target.value) 
                        } 
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1">Rotation</label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      className="w-full"
                      value={elements.find(el => el.id === selectedElement)?.rotation || 0}
                      onChange={(e) => updateElement(selectedElement, { rotation: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
              
              <GlassButton 
                variant="destructive" 
                size="sm" 
                className="w-full"
                onClick={() => deleteElement(selectedElement)}
              >
                Delete Element
              </GlassButton>
            </div>
          </GlassContainer>
        )}
      </div>
    </motion.div>
  );
}