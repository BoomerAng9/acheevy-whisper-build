import React, { useEffect, useRef, useState } from 'react';
import { Send, Mic, Square, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isProcessing: boolean;
  latestNarration?: string;
}

type SpeechRecognitionResultLike = {
  0?: {
    transcript?: string;
  };
};

type SpeechRecognitionEventLike = {
  results: SpeechRecognitionResultLike[];
};

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionAlternative {
  transcript: string;
}

interface SpeechRecognitionResult {
  0: SpeechRecognitionAlternative;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResult[];
}

interface SpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

const PromptInput = ({ onSubmit, isProcessing, latestNarration }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSubmit = () => {
    if (!prompt.trim() || isProcessing) {
      return;
    }

    onSubmit(prompt.trim());
    setPrompt('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const resolveSpeechRecognition = (): SpeechRecognitionConstructor | null => {
    if (typeof window === 'undefined') {
      return null;
  const toggleVoiceInput = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const recognitionProvider = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };

    return recognitionProvider.SpeechRecognition || recognitionProvider.webkitSpeechRecognition || null;
  };

  const toggleVoiceInput = () => {
    const SpeechRecognition = resolveSpeechRecognition();
    const SpeechRecognition = recognitionProvider.SpeechRecognition || recognitionProvider.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast({
        title: 'Speech recognition unavailable',
        description: 'Your browser does not support STT. Please type your prompt instead.',
      });
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: 'Could not capture voice',
        description: 'Please try again or type your prompt manually.',
      });
    };

    recognition.onresult = (event) => {
      const transcript = event.results
        .map((result) => result[0]?.transcript ?? '')
        .join(' ')
        .trim();

      if (transcript) {
        setPrompt((prev) => (prev ? `${prev} ${transcript}`.trim() : transcript));
        setPrompt(prev => (prev ? `${prev} ${transcript}`.trim() : transcript));
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      toast({
        title: 'Text-to-speech unavailable',
        description: 'Your browser does not support TTS playback.',
      });
      return;
    }

    const speechText = latestNarration?.trim() || prompt.trim();

    if (!speechText) {
      toast({
        title: 'Nothing to read yet',
        description: 'Add a prompt or generate output first, then play audio.',
      });
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-6">
      <div className="rounded-xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">Voice-first prompt console</p>
          <h2 className="mt-1 text-xl font-semibold text-neutral-100">Think it. Speak it. Ship it.</h2>
          <p className="mt-2 max-w-3xl text-sm text-neutral-400">
            Start with STT, optionally preview via TTS, then deploy to generate a technical prompt and ASCII blueprint.
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        <div className="flex space-x-4">
          <div className="flex-1">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your plug in plain English. Press Enter to deploy."
              className="min-h-[120px] border-white/10 bg-black/50 text-neutral-100 placeholder:text-neutral-500"
              disabled={isProcessing}
            />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:w-[320px] lg:grid-cols-1">
            <Button
              variant="outline"
              onClick={toggleVoiceInput}
              disabled={isProcessing}
              className="border-white/20 bg-transparent text-neutral-200 hover:bg-white/10"
            >
              {isListening ? <Square className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
              className="border-slate-600 text-slate-300 hover:bg-slate-700 px-6 py-3"
            >
              {isListening ? <Square className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
              {isListening ? 'Stop STT' : 'Start STT'}
            </Button>
            <Button
              variant="outline"
              onClick={handleSpeak}
              className="border-white/20 bg-transparent text-neutral-200 hover:bg-white/10"
              disabled={isProcessing}
            >
              <Volume2 className="mr-2 h-4 w-4" />
              Play TTS
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!prompt.trim() || isProcessing}
              className="bg-neutral-100 text-neutral-950 hover:bg-neutral-300"
            >
              <Send className="mr-2 h-4 w-4" />
              className="border-slate-600 text-slate-300 hover:bg-slate-700 px-6 py-3"
              disabled={isProcessing}
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Play TTS
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!prompt.trim() || isProcessing}
              className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-6 py-3"
            >
              <Send className="w-4 h-4 mr-2" />
              {isProcessing ? 'Processing...' : 'Deploy'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromptInput;
