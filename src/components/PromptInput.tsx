import React, { useRef, useState } from 'react';
import { Mic, Send, Square, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface PromptInputProps {
  onSubmit: (prompt: string) => Promise<void>;
  isProcessing: boolean;
  latestNarration?: string;
}

type SpeechRecognitionCtor = new () => SpeechRecognition;

const resolveSpeechRecognition = (): SpeechRecognitionCtor | null => {
  if (typeof window === 'undefined') return null;
  const w = window as Window & { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
};

export default function PromptInput({ onSubmit, isProcessing, latestNarration }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    const value = prompt.trim();
    if (!value || isProcessing) return;
    await onSubmit(value);
  };

  const toggleVoiceInput = () => {
    const SpeechRecognition = resolveSpeechRecognition();
    if (!SpeechRecognition) return toast({ title: 'Speech recognition unavailable', description: 'Browser does not support STT.' });
    if (isListening && recognitionRef.current) return recognitionRef.current.stop();

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results).map((result) => result[0]?.transcript ?? '').join(' ').trim();
      if (transcript) setPrompt((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSpeak = () => {
    const text = latestNarration?.trim() || prompt.trim();
    if (!text) return toast({ title: 'No text available', description: 'Generate output first.' });
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Grammar Mission Console</h2>
        <p className="mt-1 text-sm text-slate-600">Use natural language. ACHEEVY converts to technical execution and dispatches boomerangs.</p>
        <div className="mt-4 flex flex-col gap-3 lg:flex-row">
          <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your goal in plain language..." className="min-h-[120px] border-slate-300 bg-white text-slate-900" disabled={isProcessing} />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:w-[320px] lg:grid-cols-1">
            <Button variant="outline" onClick={toggleVoiceInput} disabled={isProcessing}>{isListening ? <Square className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}{isListening ? 'Stop STT' : 'Start STT'}</Button>
            <Button variant="outline" onClick={handleSpeak} disabled={isProcessing}><Volume2 className="mr-2 h-4 w-4" />Play TTS</Button>
            <Button onClick={handleSubmit} disabled={!prompt.trim() || isProcessing}><Send className="mr-2 h-4 w-4" />{isProcessing ? 'Routing...' : 'Route Mission'}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
