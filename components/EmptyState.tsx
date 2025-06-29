import React from 'react';
import { Search, Lightbulb, Zap, Globe } from 'lucide-react';

const EmptyState: React.FC = () => {
  const features = [
    { icon: Globe, title: "Global Dictionary", desc: "Any word, any language" },
    { icon: Lightbulb, title: "Smart Examples", desc: "Real usage examples" },
    { icon: Zap, title: "Instant Results", desc: "Lightning quick responses" }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-lg">
        <div className="mb-8">
          <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Search className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">
            Ready to explore words?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Type any word from any language and I'll help you understand its meaning, pronunciation, and usage. I have access to comprehensive dictionaries worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <feature.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
              <h3 className="font-semibold text-slate-800 dark:text-white text-sm mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
            💡 Try words like: "ubiquitous", "schadenfreude", "saudade", or even technical terms!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;