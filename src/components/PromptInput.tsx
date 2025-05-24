
import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isProcessing: boolean;
}

const PromptInput = ({ onSubmit, isProcessing }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');

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

  return (
    <div className="bg-slate-800 border-b border-slate-700 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-slate-300 text-sm mb-2">
            Welcome to Deploy by: ACHIEVEMOR. Describe your project or idea, and our AI-powered team will handle the rest.
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
              placeholder="Describe your project, feature, or idea... (Press Enter to send, Shift+Enter for new line)"
              className="min-h-[100px] bg-slate-900 border-slate-600 text-white placeholder-slate-400 resize-none"
              disabled={isProcessing}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Button
              onClick={handleSubmit}
              disabled={!prompt.trim() || isProcessing}
              className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-6 py-3"
            >
              <Send className="w-4 h-4 mr-2" />
              {isProcessing ? 'Processing...' : 'Deploy'}
            </Button>
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 px-6 py-3"
            >
              <Mic className="w-4 h-4 mr-2" />
              Voice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
