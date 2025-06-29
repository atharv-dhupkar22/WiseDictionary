import React from 'react';
import { Message } from '../types';
import { User, Volume2, Hash } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (message.isUser) {
    return (
      <div className="flex justify-end mb-6">
        <div className="flex items-end gap-3 max-w-md">
          <div className="bg-indigo-600 text-white px-5 py-3 rounded-2xl rounded-br-md shadow-lg">
            <p className="font-medium">{message.content}</p>
            <p className="text-xs text-indigo-200 mt-1 text-right">{formatTime(message.timestamp)}</p>
          </div>
          <div className="w-9 h-9 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
            <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-6">
      <div className="flex items-start gap-3 max-w-3xl">
        <div className="w-9 h-9 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center shadow-md flex-shrink-0 mt-1">
          <Hash className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 px-5 py-4 rounded-2xl rounded-tl-md shadow-lg">
          {message.definition ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                  <span className="text-indigo-600 dark:text-indigo-400">{message.definition.word}</span>
                  {message.definition.phonetic && (
                    <button
                      onClick={() => speakText(message.definition!.word)}
                      className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Volume2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    </button>
                  )}
                </h3>
              </div>
              
              {message.definition.phonetic && (
                <div className="bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600">
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-mono">
                    {message.definition.phonetic}
                  </p>
                </div>
              )}
              
              <div className="space-y-4">
                {message.definition.meanings.map((meaning, idx) => (
                  <div key={idx} className="border-l-4 border-indigo-400 pl-4 bg-slate-50 dark:bg-slate-700/30 py-3 rounded-r-lg">
                    <div className="inline-block bg-indigo-100 dark:bg-indigo-900/40 px-2 py-1 rounded-md mb-3">
                      <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                        {meaning.partOfSpeech}
                      </p>
                    </div>
                    {meaning.definitions.map((def, defIdx) => (
                      <div key={defIdx} className="mb-3 last:mb-0">
                        <p className="text-slate-800 dark:text-slate-200 mb-2 leading-relaxed">
                          <span className="font-medium text-slate-600 dark:text-slate-400 mr-2">
                            {defIdx + 1}.
                          </span>
                          {def.definition}
                        </p>
                        {def.example && (
                          <div className="bg-amber-50 dark:bg-amber-900/20 border-l-3 border-amber-400 pl-3 py-2 ml-6">
                            <p className="text-sm text-amber-800 dark:text-amber-200 italic">
                              "{def.example}"
                            </p>
                          </div>
                        )}
                        {def.synonyms && def.synonyms.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2 ml-6">
                            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mr-1">
                              Similar:
                            </span>
                            {def.synonyms.map((synonym, synIdx) => (
                              <span
                                key={synIdx}
                                className="text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md font-medium"
                              >
                                {synonym}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{message.content}</p>
          )}
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-right">
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;