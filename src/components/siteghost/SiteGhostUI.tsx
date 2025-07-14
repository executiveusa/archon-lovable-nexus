import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassContainer } from '../glass/GlassContainer';
import { GlassButton } from '../glass/GlassButton';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Eye, Download, Code, Palette, Layers } from 'lucide-react';

interface SiteGhostUIProps {
  isVisible?: boolean;
  onClose?: () => void;
}

const sampleTemplates = [
  {
    id: 'hero-modern',
    name: 'Modern Hero',
    category: 'Hero Sections',
    preview: '/templates/hero-modern.png',
    tags: ['responsive', 'animated', 'glassmorphism']
  },
  {
    id: 'features-grid',
    name: 'Feature Grid',
    category: 'Features',
    preview: '/templates/features-grid.png',
    tags: ['grid', 'icons', 'cards']
  },
  {
    id: 'testimonials-carousel',
    name: 'Testimonial Carousel',
    category: 'Social Proof',
    preview: '/templates/testimonials.png',
    tags: ['carousel', 'testimonials', 'animations']
  }
];

export function SiteGhostUI({ isVisible = true, onClose }: SiteGhostUIProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Hero Sections', 'Features', 'Social Proof', 'Navigation'];

  const filteredTemplates = sampleTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-0 top-0 h-full w-80 z-50"
    >
      <GlassContainer className="h-full w-full p-4 rounded-l-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">SiteGhost UI</h2>
              <p className="text-sm text-muted-foreground">Template Library</p>
            </div>
            {onClose && (
              <GlassButton onClick={onClose} variant="ghost" size="sm">
                ×
              </GlassButton>
            )}
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 rounded-lg bg-background/50 border border-border backdrop-blur-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="p-3 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Layers className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm text-foreground">{template.name}</h3>
                    <p className="text-xs text-muted-foreground">{template.category}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {template.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <GlassButton size="sm" variant="ghost">
                      <Eye className="w-3 h-3" />
                    </GlassButton>
                    <GlassButton size="sm" variant="ghost">
                      <Download className="w-3 h-3" />
                    </GlassButton>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-4 space-y-2">
            <GlassButton className="w-full" variant="default">
              <Code className="w-4 h-4 mr-2" />
              Export Patch
            </GlassButton>
            <GlassButton className="w-full" variant="outline">
              <Palette className="w-4 h-4 mr-2" />
              Customize Theme
            </GlassButton>
          </div>
        </div>
      </GlassContainer>
    </motion.div>
  );
}