'use client';

import React, { useState } from 'react';
import { mockMCPTools } from '@/lib/mock-data';
import { formatRelativeTime } from '@/lib/utils';
import type { MCPTool } from '@/types';

const toolIcons: Record<string, React.ReactNode> = {
  cube: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>,
  users: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>,
  rocket: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" /></svg>,
  database: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>,
  chart: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>,
  code: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>,
  document: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>,
};

const catColors: Record<string, string> = {
  analysis: 'text-violet-400', monitoring: 'text-blue-400', database: 'text-emerald-400',
  deployment: 'text-amber-400', code: 'text-cyan-400',
};

export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState<MCPTool | null>(null);
  const [catFilter, setCatFilter] = useState('all');
  const categories = ['all', 'analysis', 'monitoring', 'database', 'deployment', 'code'];
  const filtered = catFilter === 'all' ? mockMCPTools : mockMCPTools.filter(t => t.category === catFilter);

  return (
    <div className="space-y-4 animate-fade-in max-w-[1400px]">
      <div>
        <h1 className="text-lg font-semibold text-white">MCP Tools</h1>
        <p className="text-zinc-500 text-[13px]">Model Context Protocol tools for analysis, deployment, and monitoring</p>
      </div>

      <div className="flex gap-1">
        {categories.map((c) => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium capitalize transition-all ${
              catFilter === c ? 'bg-zinc-800 text-white' : 'text-zinc-600 hover:text-zinc-400'
            }`}>{c}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((tool, i) => (
          <div key={tool.id} className={`card-interactive p-5 group animate-slide-up stagger-${i + 1}`} onClick={() => setSelectedTool(tool)}>
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg bg-zinc-800/80 flex items-center justify-center ${catColors[tool.category]} group-hover:scale-105 transition-transform`}>
                {toolIcons[tool.icon]}
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`status-dot ${tool.healthStatus === 'healthy' ? 'green' : 'red'}`} />
                <span className={`text-[11px] ${tool.healthStatus === 'healthy' ? 'text-zinc-600' : 'text-red-400'}`}>
                  {tool.healthStatus}
                </span>
              </div>
            </div>

            <h3 className="text-[13px] font-semibold text-zinc-200 group-hover:text-white transition-colors">{tool.displayName}</h3>
            <p className="text-[11px] text-zinc-600 line-clamp-2 mt-1 leading-relaxed">{tool.description}</p>

            <div className="flex items-center gap-2 mt-3 mb-3">
              <span className={`text-[10px] font-medium capitalize ${catColors[tool.category]} bg-zinc-800/50 px-1.5 py-0.5 rounded`}>{tool.category}</span>
              <span className="text-[10px] text-zinc-700">v{tool.version}</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[12px]">
              <span className="text-zinc-500"><span className="text-zinc-300 font-semibold metric">{(tool.callCount / 1000).toFixed(1)}K</span> calls</span>
              <span className="text-zinc-500"><span className="text-zinc-300 font-semibold metric">{tool.avgResponseTime}s</span> avg</span>
              <button className="px-3 py-1 rounded-md bg-violet-500/10 text-violet-400 text-[11px] font-medium hover:bg-violet-500/20 transition-colors"
                onClick={(e) => e.stopPropagation()}>
                Invoke
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedTool(null)} />
          <div className="glass p-6 w-full max-w-md relative z-10 animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center ${catColors[selectedTool.category]}`}>
                  {toolIcons[selectedTool.icon]}
                </div>
                <div>
                  <h2 className="text-[14px] font-semibold text-white">{selectedTool.displayName}</h2>
                  <p className="text-[11px] text-zinc-600 font-mono">{selectedTool.name}</p>
                </div>
              </div>
              <button onClick={() => setSelectedTool(null)} className="text-zinc-500 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <p className="text-[13px] text-zinc-400 mb-4 leading-relaxed">{selectedTool.description}</p>
            <div className="space-y-2 mb-5">
              {[
                ['Category', selectedTool.category],
                ['Version', `v${selectedTool.version}`],
                ['Health', selectedTool.healthStatus],
                ['Last Check', formatRelativeTime(selectedTool.lastHealthCheck)],
                ['Total Calls', selectedTool.callCount.toLocaleString()],
                ['Avg Response', `${selectedTool.avgResponseTime}s`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5 border-b border-white/5 text-[12px]">
                  <span className="text-zinc-600">{k}</span>
                  <span className="text-zinc-300 capitalize">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="btn-ghost flex-1 text-[13px]" onClick={() => setSelectedTool(null)}>Close</button>
              <button className="btn-primary flex-1 text-[13px]">Invoke</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
