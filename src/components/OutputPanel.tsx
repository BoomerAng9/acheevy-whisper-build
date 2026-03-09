import { Copy, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OutputItem } from '@/types/agent';

interface OutputPanelProps { outputs: OutputItem[]; sessionId: string; }

export default function OutputPanel({ outputs, sessionId }: OutputPanelProps) {
  const handleCopy = (content: string) => navigator.clipboard.writeText(content);
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-6 pt-5">
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-3"><h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">Output Artifacts</h3><p className="mt-1 text-xs text-slate-500">Session: {sessionId}</p></div>
        <div className="p-5">
          {outputs.length === 0 ? <div className="py-10 text-center text-slate-400">No outputs yet.</div> : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {outputs.map((output) => (
                <Card key={output.id} className="border-slate-200 bg-white text-slate-900">
                  <CardHeader><CardTitle className="text-sm">{output.title}</CardTitle><CardDescription className="text-slate-500">{output.description}</CardDescription></CardHeader>
                  <CardContent className="space-y-3">
                    {output.content ? <pre className="max-h-48 overflow-auto rounded bg-slate-50 p-2 text-xs text-slate-700">{output.content}</pre> : <div className="flex items-center gap-2 text-xs text-slate-500"><Grid3X3 className="h-4 w-4" /> No text payload</div>}
                    {output.content ? <Button variant="outline" size="sm" onClick={() => handleCopy(output.content!)}><Copy className="mr-2 h-4 w-4" /> Copy</Button> : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
