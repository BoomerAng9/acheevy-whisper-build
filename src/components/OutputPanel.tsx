
import React from 'react';
import { ExternalLink, Download, Copy, Star } from 'lucide-react';
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
    // Add toast notification here
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'preview':
        return <ExternalLink className="w-4 h-4" />;
      case 'download':
        return <Download className="w-4 h-4" />;
      case 'link':
        return <ExternalLink className="w-4 h-4" />;
      case 'code':
        return <Copy className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-slate-800 border-t border-slate-700">
      <div className="px-6 py-3 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">Output & Deliverables</h3>
        <p className="text-sm text-slate-400">Session: {sessionId}</p>
      </div>
      
      <div className="p-6">
        {outputs.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-slate-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Star className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-400">No outputs yet</p>
            <p className="text-slate-500 text-sm">Deliverables will appear here as agents complete their work</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {outputs.map((output) => (
              <Card key={output.id} className="bg-slate-900 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm flex items-center">
                    {getTypeIcon(output.type)}
                    <span className="ml-2">{output.title}</span>
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-xs">
                    {output.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex space-x-2">
                    {output.url && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        onClick={() => window.open(output.url, '_blank')}
                      >
                        Open
                      </Button>
                    )}
                    {output.content && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        onClick={() => handleCopy(output.content!)}
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
    </div>
  );
};

export default OutputPanel;
