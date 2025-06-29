import React, { useState, useRef, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import MessageBubble from './components/MessageBubble';
import TypingIndicator from './components/TypingIndicator';
import ChatInput from './components/ChatInput';
import EmptyState from './components/EmptyState';
import { Message } from './types';
import { searchWordWithRetry } from './services/dictionaryService';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const definition = await searchWordWithRetry(content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: definition ? 
          `Here's what I found for "${definition.word}":` : 
          `Hmm, I couldn't find "${content}" in any of my dictionary sources. Try checking the spelling or searching for a different word.`,
        isUser: false,
        timestamp: new Date(),
        word: content,
        definition: definition || undefined,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Oops! Something went wrong while looking up that word. Please check your internet connection and try again.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Header />
        
        <main className="flex flex-col" style={{ height: 'calc(100vh - 89px)' }}>
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 py-6">
              {messages.length === 0 ? (
                <EmptyState />
              ) : (
                <>
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                  {isLoading && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>
          </div>
          
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;