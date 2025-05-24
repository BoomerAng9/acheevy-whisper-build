
import { useState, useEffect } from 'react';

interface Session {
  id: string;
  createdAt: Date;
  lastActivity: Date;
  prompts: string[];
}

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Check for existing session in localStorage
    const existingSession = localStorage.getItem('deploy-session');
    if (existingSession) {
      const parsed = JSON.parse(existingSession);
      setSession({
        ...parsed,
        createdAt: new Date(parsed.createdAt),
        lastActivity: new Date(parsed.lastActivity)
      });
    } else {
      // Create new session
      const newSession: Session = {
        id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        lastActivity: new Date(),
        prompts: []
      };
      setSession(newSession);
      localStorage.setItem('deploy-session', JSON.stringify(newSession));
    }
  }, []);

  const addPrompt = (prompt: string) => {
    if (!session) return;
    
    const updatedSession = {
      ...session,
      lastActivity: new Date(),
      prompts: [...session.prompts, prompt]
    };
    
    setSession(updatedSession);
    localStorage.setItem('deploy-session', JSON.stringify(updatedSession));
  };

  const clearSession = () => {
    localStorage.removeItem('deploy-session');
    const newSession: Session = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      lastActivity: new Date(),
      prompts: []
    };
    setSession(newSession);
    localStorage.setItem('deploy-session', JSON.stringify(newSession));
  };

  return { session, addPrompt, clearSession };
};
