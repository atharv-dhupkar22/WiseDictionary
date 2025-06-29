import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const quickWords = ['ubiquitous', 'schadenfreude', 'petrichor', 'ephemeral', 'wanderlust', 'mellifluous'];

  return (
    <div className="bg-white dark:bg-slate-900 border-t-2 border-slate-100 dark:border-slate-700 p-6">
      <div className="max-w-4xl mx-auto">
        {!input && (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Try these fascinating words from around the world:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickWords.map((word) => (
                <button
                  key={word}
                  onClick={() => setInput(word)}
                  className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg text-sm text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors font-medium"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 rounded-2xl focus-within:border-indigo-500 dark:focus-within:border-indigo-400 transition-colors shadow-sm">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What word would you like to explore today? (Any language, any complexity!)"
              disabled={disabled}
              className="w-full px-5 py-4 pr-14 bg-transparent border-none outline-none resize-none min-h-[56px] max-h-32 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 font-medium"
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || disabled}
              className="absolute right-3 bottom-3 p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg disabled:hover:shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;