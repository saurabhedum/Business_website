
import React, { useState } from 'react';
import { generateAutomationProposal } from '../services/geminiService';
import { AIPromptResult } from '../types';
import { HeroMotionBackground } from './ui/HeroMotionBackground';

const AIGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<AIPromptResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await generateAutomationProposal(prompt);
      setResult(data);
    } catch (err) {
      setError('Could not generate proposal. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
      <HeroMotionBackground />
      <div className="p-8 border-b border-slate-800 bg-gradient-to-r from-slate-950 to-transparent relative">
        <div className="absolute top-0 right-0 w-32 h-32 theme-bg-soft blur-[60px] pointer-events-none" />
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <span className="theme-text">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
          AI Automation Consultant
        </h2>
        <p className="text-slate-400">Describe your business problem, and our AI will architect a solution in seconds.</p>
      </div>

      <div className="p-8">
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., How can I automate my 500-unit residential HVAC maintenance?"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--theme-color)] transition-colors"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="theme-bg hover:brightness-110 disabled:opacity-50 text-white font-bold px-8 py-3 rounded-xl transition-all theme-shadow whitespace-nowrap"
          >
            {loading ? 'Consulting...' : 'Generate Plan'}
          </button>
        </div>

        {error && <div className="text-red-400 mb-6 bg-red-400/10 p-4 rounded-lg border border-red-400/20">{error}</div>}

        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xl font-bold theme-text mb-2 transition-colors">{result.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{result.summary}</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-3">Implementation Roadmap</h4>
                  <ul className="space-y-3">
                    {result.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-4 text-slate-400 text-sm">
                        <span className="flex-shrink-0 w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center theme-text font-bold transition-colors">{idx + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Estimated Timeline</h4>
                  <p className="text-white font-mono text-lg">{result.estimatedTime}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Target Budget Range</h4>
                  <p className="text-emerald-400 font-mono text-lg">{result.costEstimate}</p>
                </div>
                <button className="w-full bg-white text-slate-950 font-bold py-3 rounded-lg hover:bg-slate-200 transition-colors">
                  Contact Sales Agent
                </button>
              </div>
            </div>
          </div>
        )}

        {!result && !loading && (
          <div className="flex flex-col items-center justify-center py-12 text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p>Your custom automation strategy will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIGenerator;
