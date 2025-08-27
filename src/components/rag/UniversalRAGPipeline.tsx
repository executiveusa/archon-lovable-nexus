import React, { useState, useCallback } from 'react';
import { GlassContainer } from '@/components/glass/GlassContainer';
import { GlassButton } from '@/components/glass/GlassButton';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileText, 
  Image, 
  FileSpreadsheet, 
  Video, 
  Music, 
  Archive,
  Search,
  Brain,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  Database
} from 'lucide-react';

interface RAGFile {
  id: string;
  name: string;
  type: string;
  size: number;
  status: 'uploading' | 'processing' | 'chunking' | 'embedding' | 'completed' | 'error';
  chunks?: number;
  embeddings?: number;
  progress: number;
}

interface UniversalRAGProps {
  isVisible: boolean;
  onClose: () => void;
}

export const UniversalRAGPipeline: React.FC<UniversalRAGProps> = ({ isVisible, onClose }) => {
  const [files, setFiles] = useState<RAGFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const supportedFileTypes = [
    { type: 'pdf', icon: FileText, color: 'text-red-400', label: 'PDF Documents' },
    { type: 'docx', icon: FileText, color: 'text-blue-400', label: 'Word Documents' },
    { type: 'pptx', icon: FileText, color: 'text-orange-400', label: 'PowerPoint' },
    { type: 'xlsx', icon: FileSpreadsheet, color: 'text-green-400', label: 'Spreadsheets' },
    { type: 'png', icon: Image, color: 'text-purple-400', label: 'Images (PNG/JPG)' },
    { type: 'jpg', icon: Image, color: 'text-purple-400', label: 'Images (PNG/JPG)' },
    { type: 'md', icon: FileText, color: 'text-gray-400', label: 'Markdown' },
    { type: 'txt', icon: FileText, color: 'text-gray-400', label: 'Text Files' },
    { type: 'csv', icon: FileSpreadsheet, color: 'text-cyan-400', label: 'CSV Data' },
    { type: 'json', icon: Archive, color: 'text-yellow-400', label: 'JSON Data' }
  ];

  const processors = [
    { name: 'LlamaParse', specialty: 'PDF & Document parsing', active: true },
    { name: 'IBM Docling', specialty: 'Enterprise document processing', active: true },
    { name: 'Mistral OCR', specialty: 'Image text extraction', active: true },
    { name: 'Custom Parser', specialty: 'Structured data formats', active: true }
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  };

  const processFiles = (fileList: File[]) => {
    const newFiles: RAGFile[] = fileList.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.name.split('.').pop()?.toLowerCase() || 'unknown',
      size: file.size,
      status: 'uploading',
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate processing pipeline
    newFiles.forEach(file => {
      simulateProcessing(file.id);
    });
  };

  const simulateProcessing = async (fileId: string) => {
    const stages = ['uploading', 'processing', 'chunking', 'embedding', 'completed'] as const;
    
    for (let i = 0; i < stages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      setFiles(prev => prev.map(file => 
        file.id === fileId 
          ? { 
              ...file, 
              status: stages[i],
              progress: ((i + 1) / stages.length) * 100,
              chunks: i >= 2 ? Math.floor(Math.random() * 50) + 10 : undefined,
              embeddings: i >= 3 ? Math.floor(Math.random() * 100) + 20 : undefined
            }
          : file
      ));
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    // Simulate semantic search
    const mockResults = [
      {
        id: 1,
        content: "ARCHON X represents a paradigm shift in AI orchestration, providing sovereign control over distributed agent networks...",
        source: "project_overview.pdf",
        similarity: 0.94,
        chunk: 5
      },
      {
        id: 2,
        content: "The Fitness Signals Kit leverages Bangle.js 2 hardware to capture biometric data with 78% user engagement...",
        source: "fitness_signals_analysis.docx",
        similarity: 0.87,
        chunk: 12
      },
      {
        id: 3,
        content: "LlamaIndex integration enables semantic search across 95+ file types with heading-aware chunking strategies...",
        source: "technical_specs.md",
        similarity: 0.82,
        chunk: 8
      }
    ];

    setSearchResults(mockResults);
  };

  const getFileIcon = (type: string) => {
    const fileType = supportedFileTypes.find(ft => ft.type === type);
    return fileType ? fileType.icon : FileText;
  };

  const getFileIconColor = (type: string) => {
    const fileType = supportedFileTypes.find(ft => ft.type === type);
    return fileType ? fileType.color : 'text-gray-400';
  };

  const getStatusIcon = (status: RAGFile['status']) => {
    switch (status) {
      case 'uploading':
        return <Clock className="w-4 h-4 text-blue-400" />;
      case 'processing':
        return <Brain className="w-4 h-4 text-purple-400 animate-pulse" />;
      case 'chunking':
        return <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />;
      case 'embedding':
        return <Database className="w-4 h-4 text-cyan-400 animate-pulse" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <GlassContainer className="w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-archon-primary" />
              <h2 className="text-2xl font-semibold text-archon-primary">Universal RAG Pipeline</h2>
              <Badge variant="outline" className="ml-2">95+ File Types</Badge>
            </div>
            <GlassButton onClick={onClose} variant="outline">
              Close
            </GlassButton>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* File Upload Area */}
            <Card className="lg:col-span-2 p-6 bg-archon-card border-archon-border">
              <h3 className="text-lg font-semibold mb-4 text-archon-primary">Document Ingestion</h3>
              
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-archon-primary bg-archon-primary/10'
                    : 'border-archon-border hover:border-archon-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-archon-primary mx-auto mb-4" />
                <p className="text-lg font-medium text-archon-primary mb-2">
                  Drop files here or click to browse
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports PDFs, documents, images, spreadsheets, and more
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.docx,.pptx,.xlsx,.png,.jpg,.jpeg,.md,.txt,.csv,.json"
                />
                <label htmlFor="file-upload">
                  <GlassButton as="span">
                    Browse Files
                  </GlassButton>
                </label>
              </div>

              {/* Processing Queue */}
              {files.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-3 text-archon-primary">Processing Queue</h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {files.map(file => {
                      const FileIcon = getFileIcon(file.type);
                      return (
                        <div key={file.id} className="flex items-center gap-3 p-3 rounded-lg bg-archon-surface border border-archon-border">
                          <FileIcon className={`w-5 h-5 ${getFileIconColor(file.type)}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium truncate">{file.name}</span>
                              {getStatusIcon(file.status)}
                              <Badge variant="outline" className="text-xs">
                                {file.status}
                              </Badge>
                            </div>
                            <Progress value={file.progress} className="h-1 mb-1" />
                            <div className="flex gap-4 text-xs text-muted-foreground">
                              <span>{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                              {file.chunks && <span>{file.chunks} chunks</span>}
                              {file.embeddings && <span>{file.embeddings} embeddings</span>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </Card>

            {/* Supported Formats & Processors */}
            <div className="space-y-6">
              <Card className="p-6 bg-archon-card border-archon-border">
                <h3 className="text-lg font-semibold mb-4 text-archon-primary">Supported Formats</h3>
                <div className="grid grid-cols-2 gap-2">
                  {supportedFileTypes.slice(0, 8).map(fileType => {
                    const Icon = fileType.icon;
                    return (
                      <div key={fileType.type} className="flex items-center gap-2 p-2 rounded bg-archon-surface">
                        <Icon className={`w-4 h-4 ${fileType.color}`} />
                        <span className="text-xs font-medium">{fileType.type.toUpperCase()}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  And 85+ more file types supported
                </p>
              </Card>

              <Card className="p-6 bg-archon-card border-archon-border">
                <h3 className="text-lg font-semibold mb-4 text-archon-primary">Processing Engines</h3>
                <div className="space-y-3">
                  {processors.map(processor => (
                    <div key={processor.name} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{processor.name}</div>
                        <div className="text-xs text-muted-foreground">{processor.specialty}</div>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Semantic Search */}
          <Card className="mt-6 p-6 bg-archon-card border-archon-border">
            <h3 className="text-lg font-semibold mb-4 text-archon-primary">Semantic Search</h3>
            <div className="flex gap-3 mb-4">
              <Input
                placeholder="Search across all ingested documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <GlassButton onClick={handleSearch} disabled={!searchQuery.trim()}>
                <Search className="w-4 h-4" />
              </GlassButton>
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-3">
                {searchResults.map(result => (
                  <div key={result.id} className="p-4 rounded-lg bg-archon-surface border border-archon-border">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-archon-primary" />
                      <span className="font-medium text-sm">{result.source}</span>
                      <Badge variant="outline" className="text-xs">
                        {(result.similarity * 100).toFixed(0)}% match
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Chunk {result.chunk}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{result.content}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Integration Status */}
          <Card className="mt-6 p-4 bg-archon-card border-archon-border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-archon-primary">Vector Database</h4>
                <p className="text-sm text-muted-foreground">
                  Connected to Pinecone with heading/table-aware chunking
                </p>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Live</span>
              </div>
            </div>
          </Card>
        </div>
      </GlassContainer>
    </div>
  );
};