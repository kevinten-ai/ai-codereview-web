'use client';

import React, { useState } from 'react';
import { mockTrendData, mockIssueCategories, mockRepoStats } from '@/lib/mock-data';
import { getScoreColor, getScoreBg } from '@/lib/utils';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

const radarData = [
  { metric: 'Security', score: 88 },
  { metric: 'Performance', score: 82 },
  { metric: 'Style', score: 95 },
  { metric: 'Maintain.', score: 79 },
  { metric: 'Coverage', score: 71 },
  { metric: 'Docs', score: 65 },
];

const Tip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass p-2.5 !rounded-lg text-[11px] border border-white/10">
      <p className="text-zinc-400 font-medium mb-1">{label}</p>
      {payload.map((e: any, i: number) => (
        <p key={i} className="flex items-center gap-2" style={{ color: e.color || e.fill }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: e.color || e.fill }} />
          {e.name}: <span className="font-semibold text-white">{e.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function ReportsPage() {
  const [range, setRange] = useState('12m');

  return (
    <div className="space-y-4 animate-fade-in max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">Analytics</h1>
          <p className="text-zinc-500 text-[13px]">Code quality insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-zinc-900 rounded-lg p-0.5">
            {['3m', '6m', '12m'].map((r) => (
              <button key={r} onClick={() => setRange(r)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${range === r ? 'bg-zinc-800 text-white' : 'text-zinc-600 hover:text-zinc-400'}`}>{r}</button>
            ))}
          </div>
          <button className="btn-ghost text-[12px] flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
            Export
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total Reviews', value: '1,284', change: '+12.5%' },
          { label: 'Avg Score', value: '87.6', change: '+2.3' },
          { label: 'Issues Found', value: '3,842', change: '-18.2%' },
          { label: 'Fix Rate', value: '94.2%', change: '+1.8%' },
        ].map((c, i) => (
          <div key={c.label} className={`card p-4 animate-slide-up stagger-${i + 1}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-zinc-600">{c.label}</span>
              <span className="text-[10px] font-medium text-emerald-400">{c.change}</span>
            </div>
            <span className="text-xl font-bold text-white metric">{c.value}</span>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card p-5">
          <h2 className="text-[13px] font-semibold text-white mb-0.5">Review Volume & Quality</h2>
          <p className="text-[11px] text-zinc-600 mb-4">Monthly trends</p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={mockTrendData}>
              <defs>
                <linearGradient id="rpR" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.2} /><stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="date" tick={{ fill: '#52525b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#52525b', fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
              <Tooltip content={<Tip />} />
              <Area type="monotone" dataKey="reviews" name="Reviews" stroke="#8b5cf6" strokeWidth={1.5} fill="url(#rpR)" dot={false} />
              <Line type="monotone" dataKey="score" name="Score" stroke="#10b981" strokeWidth={1.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-5">
          <h2 className="text-[13px] font-semibold text-white mb-0.5">Issues Discovered</h2>
          <p className="text-[11px] text-zinc-600 mb-4">Monthly count</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={mockTrendData}>
              <defs>
                <linearGradient id="rpB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.7} /><stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="date" tick={{ fill: '#52525b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#52525b', fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="issues" name="Issues" fill="url(#rpB)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card p-5">
          <h2 className="text-[13px] font-semibold text-white mb-0.5">Issue Distribution</h2>
          <p className="text-[11px] text-zinc-600 mb-3">By category</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={mockIssueCategories} cx="50%" cy="50%" innerRadius={42} outerRadius={70} paddingAngle={3} dataKey="value" strokeWidth={0}>
                {mockIssueCategories.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip content={<Tip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-1">
            {mockIssueCategories.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />
                  <span className="text-zinc-500">{c.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-1 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(c.value / 1245) * 100}%`, background: c.color }} />
                  </div>
                  <span className="text-zinc-400 metric w-6 text-right">{c.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="text-[13px] font-semibold text-white mb-0.5">Quality Radar</h2>
          <p className="text-[11px] text-zinc-600 mb-3">Multi-dimensional analysis</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#52525b', fontSize: 10 }} />
              <PolarRadiusAxis tick={{ fill: '#3f3f46', fontSize: 9 }} domain={[0, 100]} axisLine={false} />
              <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.12} strokeWidth={1.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h2 className="text-[13px] font-semibold text-white mb-0.5">Repo Rankings</h2>
          <p className="text-[11px] text-zinc-600 mb-3">By review count</p>
          <div className="space-y-2.5">
            {mockRepoStats.sort((a, b) => b.reviews - a.reviews).map((r, i) => (
              <div key={r.name} className="flex items-center gap-2 group">
                <span className="w-4 text-[10px] text-zinc-700 text-right metric">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[12px] text-zinc-400 font-mono truncate group-hover:text-zinc-200 transition-colors">{r.name}</span>
                    <span className={`text-[10px] font-bold metric px-1.5 py-0.5 rounded border ${getScoreBg(r.avgScore)} ${getScoreColor(r.avgScore)}`}>{r.avgScore}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1 h-1 rounded-full bg-zinc-800 overflow-hidden">
                      <div className="h-full rounded-full bg-violet-500/60" style={{ width: `${(r.reviews / 312) * 100}%` }} />
                    </div>
                    <span className="text-[9px] text-zinc-700 metric w-6 text-right">{r.reviews}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
