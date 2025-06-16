
import React, { useState } from 'react';
import { GlassContainer } from '@/components/glass/GlassContainer';
import { GlassButton } from '@/components/glass/GlassButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export function FirecrawlPanel() {
  const [url, setUrl] = useState('');
  const [isScrapingData, setIsScrapingData] = useState(false);
  const [lastScrape, setLastScrape] = useState('No recent scrapes');

  const handleStartScrape = () => {
    if (!url) return;
    setIsScrapingData(true);
    setTimeout(() => {
      setLastScrape(`Scraped ${url} • ${new Date().toLocaleTimeString()}`);
      setIsScrapingData(false);
    }, 3000);
  };

  return (
    <GlassContainer variant="panel" className="p-6">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="flex items-center gap-3">
          <span className="text-2xl">🕷️</span>
          Firecrawl Engine
          <Badge variant="outline" className="border-archon-warning text-archon-warning">
            {isScrapingData ? 'SCRAPING' : 'STANDBY'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-archon-warning">Capabilities</div>
            <div className="flex flex-wrap gap-1">
              {['Site Cloning', 'Content Extract', 'SEO Analysis', 'Structure Map'].map((capability) => (
                <Badge key={capability} variant="secondary" className="text-xs bg-archon-warning/10">
                  {capability}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-archon-primary">Last Activity</div>
            <div className="text-xs text-muted-foreground">{lastScrape}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Target URL</div>
          <div className="flex gap-2">
            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-archon-bg/50 border-archon-border"
            />
            <GlassButton 
              glassVariant="warning"
              onClick={handleStartScrape}
              disabled={!url || isScrapingData}
            >
              {isScrapingData ? 'Scraping...' : 'Clone'}
            </GlassButton>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Quick Actions</div>
          <div className="flex gap-2">
            <GlassButton size="sm" glassVariant="warning">
              Bulk Scrape
            </GlassButton>
            <GlassButton size="sm" variant="outline">
              Schedule Crawl
            </GlassButton>
            <GlassButton size="sm" variant="outline">
              Export Data
            </GlassButton>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-archon-warning/5 border border-archon-warning/20">
          <div className="text-xs font-medium text-archon-warning mb-1">Crawl Queue</div>
          <div className="text-xs text-muted-foreground">
            3 sites queued • Est. 12 min remaining
          </div>
        </div>
      </CardContent>
    </GlassContainer>
  );
}
