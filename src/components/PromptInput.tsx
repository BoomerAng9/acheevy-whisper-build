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
    if (prompt.trim() && !isProcessing) {
      onSubmit(prompt.trim());
      setPrompt('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleVoiceInput = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const recognitionProvider = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };

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
    <div className="bg-slate-800 border-b border-slate-700 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-slate-300 text-sm mb-2">
            Welcome to Deploy by: ACHIEVEMOR. Share your idea in plain language and our SME agent will convert it into technical prompts plus an ASCII blueprint for iteration.
          </p>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-1">
            Think It. Prompt It. Let ACHEEVY Manage It.
          </h2>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your project idea in plain English. We will return a technical prompt + ASCII wireframe first. (Enter to send)"
              className="min-h-[100px] bg-slate-900 border-slate-600 text-white placeholder-slate-400 resize-none"
              disabled={isProcessing}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Button
              variant="outline"
              onClick={toggleVoiceInput}
              disabled={isProcessing}
              className="border-slate-600 text-slate-300 hover:bg-slate-700 px-6 py-3"
            >
              {isListening ? <Square className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
              {isListening ? 'Stop STT' : 'Start STT'}
            </Button>
            <Button
              variant="outline"
              onClick={handleSpeak}
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
    </div>
  );
};

export default PromptInput;
