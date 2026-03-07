import React from 'react';
import { ExternalLink, Download, Copy, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface OutputItem {
  id: string;
  type: 'preview' | 'download' | 'link' | 'code';
  title: string;
  description: string;
  url?: string;
  content?: string;
  status: 'ready' | 'processing' | 'error';
}

interface OutputPanelProps {
  outputs: OutputItem[];
  sessionId: string;
}

const OutputPanel = ({ outputs, sessionId }: OutputPanelProps) => {
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'preview':
        return <ExternalLink className="h-4 w-4" />;
      case 'download':
        return <Download className="h-4 w-4" />;
      case 'link':
        return <ExternalLink className="h-4 w-4" />;
      case 'code':
        return <Copy className="h-4 w-4" />;
      default:
        return <Grid3X3 className="h-4 w-4" />;
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-6 pt-5">
      <section className="overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="border-b border-white/10 px-5 py-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-200">Output artifacts</h3>
          <p className="mt-1 text-xs text-neutral-500">Session: {sessionId}</p>
        </div>

        <div className="p-5">
          {outputs.length === 0 ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.03]">
                <Grid3X3 className="h-5 w-5 text-neutral-400" />
              </div>
              <p className="text-sm text-neutral-300">No outputs yet</p>
              <p className="mt-1 text-xs text-neutral-500">Generated assets and links will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {outputs.map((output) => (
                <Card
                  key={output.id}
                  className="border-white/10 bg-white/[0.03] text-neutral-100 transition-colors duration-200 hover:bg-white/[0.06]"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-sm text-neutral-100">
                      {getTypeIcon(output.type)}
                      <span className="ml-2 truncate">{output.title}</span>
                    </CardTitle>
                    <CardDescription className="text-xs text-neutral-400">{output.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    {output.content && (
                      <pre className="max-h-28 overflow-auto rounded-md border border-white/10 bg-black/40 p-2 text-[11px] leading-relaxed text-neutral-300">
                        {output.content}
                      </pre>
                    )}
                    <div className="flex space-x-2">
                      {output.url && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 bg-transparent text-neutral-200 hover:bg-white/10"
                          onClick={() => window.open(output.url, '_blank')}
                        >
                          Open
                        </Button>
                      )}
                      {output.content && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 bg-transparent text-neutral-200 hover:bg-white/10"
                          onClick={() => handleCopy(output.content)}
                        >
                          Copy
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OutputPanel;
