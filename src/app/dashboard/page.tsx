'use client';

import React, { useMemo } from 'react';
import { mockStats, mockActivities, mockTrendData, mockIssueCategories, sparklineData, generateHeatmapData } from '@/lib/mock-data';
import { formatRelativeTime, getScoreColor, getScoreBg } from '@/lib/utils';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

/* ── Sparkline component ── */
function Sparkline({ data, color = '#8b5cf6' }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  return (
    <div className="sparkline-container">
      {data.map((v, i) => (
        <div
          key={i}
          className="sparkline-bar"
          style={{
            height: `${Math.max((v / max) * 100, 8)}%`,
            background: color,
            opacity: i === data.length - 1 ? 1 : 0.25 + (i / data.length) * 0.4,
          }}
        />
      ))}
    </div>
  );
}

/* ── Heatmap component ── */
function ActivityHeatmap() {
  const data = useMemo(() => generateHeatmapData(), []);
  const levels = ['#161618', '#2d1b69', '#5b21b6', '#7c3aed', '#a78bfa'];
  const days = ['Mon', '', 'Wed', '', 'Fri', '', ''];

  return (
    <div>
      <div className="flex gap-1">
        <div className="flex flex-col gap-1 mr-1 pt-0.5">
          {days.map((d, i) => (
            <div key={i} className="h-[10px] text-[9px] text-zinc-600 leading-[10px] flex items-center">
              {d}
            </div>
          ))}
        </div>
        <div className="flex gap-[3px] overflow-hidden">
          {data.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((v, di) => (
                <div
                  key={di}
                  className="heatmap-cell"
                  style={{
                    width: 10,
                    height: 10,
                    background: levels[Math.min(v, levels.length - 1)],
                  }}
                  title={`${v} reviews`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2 justify-end">
        <span className="text-[10px] text-zinc-600">Less</span>
        {levels.map((c, i) => (
          <div key={i} className="w-[10px] h-[10px] rounded-sm" style={{ background: c }} />
        ))}
        <span className="text-[10px] text-zinc-600">More</span>
      </div>
    </div>
  );
}

/* ── Chart tooltip ── */
const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass p-2.5 !rounded-lg text-xs border border-white/10">
        <p className="text-zinc-400 font-medium mb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} className="flex items-center gap-2" style={{ color: entry.color }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: entry.color }} />
            {entry.name}: <span className="font-semibold text-white">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/* ── Stat card configs ── */
const stats = [
  { label: 'Total Reviews', value: '1,284', change: '+12.5%', positive: true, sparkline: sparklineData.totalReviews, color: '#8b5cf6' },
  { label: 'Active Now', value: '23', change: '+3', positive: true, sparkline: sparklineData.activeReviews, color: '#3b82f6' },
  { label: 'Avg Score', value: '87.6', change: '+2.3', positive: true, sparkline: sparklineData.avgScore, color: '#10b981' },
  { label: 'Issues Found', value: '3,842', change: '-18.2%', positive: true, sparkline: sparklineData.issuesFound, color: '#f59e0b' },
];

/* ── Activity icon configs ── */
const activityStyles: Record<string, { bg: string; color: string }> = {
  review_completed: { bg: 'bg-emerald-500/10', color: 'text-emerald-400' },
  review_created: { bg: 'bg-blue-500/10', color: 'text-blue-400' },
  tool_invoked: { bg: 'bg-violet-500/10', color: 'text-violet-400' },
  config_updated: { bg: 'bg-amber-500/10', color: 'text-amber-400' },
};

/* ── Page ── */
export default function DashboardPage() {
  return (
    <div className="space-y-4 animate-fade-in max-w-[1400px]">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-lg font-semibold text-white">Dashboard</h1>
        <p className="text-zinc-500 text-[13px]">Overview of review activity and system health</p>
      </div>

      {/* ── Bento Row 1: Stats ── */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={s.label} className={`card p-4 animate-slide-up stagger-${i + 1}`}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-[12px] text-zinc-500">{s.label}</span>
              <span className={`text-[11px] font-medium ${s.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                {s.change}
              </span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-white metric animate-count">{s.value}</span>
              <Sparkline data={s.sparkline} color={s.color} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Bento Row 2: Chart + Heatmap ── */}
      <div className="grid grid-cols-4 gap-3">
        {/* Area chart - 3 cols */}
        <div className="col-span-3 card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[13px] font-semibold text-white">Review Trends</h2>
              <p className="text-[11px] text-zinc-600 mt-0.5">Last 12 months</p>
            </div>
            <div className="flex gap-3 text-[11px]">
              <span className="flex items-center gap-1.5"><span className="w-2 h-0.5 rounded bg-violet-500" /> Reviews</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-0.5 rounded bg-emerald-500" /> Score</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={mockTrendData}>
              <defs>
                <linearGradient id="gReviews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: '#52525b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#52525b', fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="reviews" name="Reviews" stroke="#8b5cf6" strokeWidth={1.5} fill="url(#gReviews)" dot={false} />
              <Area type="monotone" dataKey="score" name="Score" stroke="#10b981" strokeWidth={1.5} fill="url(#gScore)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Issue pie - 1 col */}
        <div className="col-span-1 card p-5">
          <h2 className="text-[13px] font-semibold text-white mb-1">Issues</h2>
          <p className="text-[11px] text-zinc-600 mb-3">By category</p>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={mockIssueCategories} cx="50%" cy="50%" innerRadius={38} outerRadius={58} paddingAngle={3} dataKey="value" strokeWidth={0}>
                {mockIssueCategories.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={({ active, payload }) => active && payload?.length ? (
                <div className="glass p-2 !rounded-lg text-[11px] border border-white/10">
                  <span className="text-zinc-400">{payload[0].name}: </span>
                  <span className="text-white font-semibold">{payload[0].value}</span>
                </div>
              ) : null} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-1">
            {mockIssueCategories.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />
                  <span className="text-zinc-500">{c.name}</span>
                </div>
                <span className="text-zinc-300 metric">{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bento Row 3: Heatmap + Activity + Tools ── */}
      <div className="grid grid-cols-4 gap-3">
        {/* Heatmap - 2 cols */}
        <div className="col-span-2 card p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-[13px] font-semibold text-white">Review Activity</h2>
              <p className="text-[11px] text-zinc-600 mt-0.5">1,284 reviews in the last year</p>
            </div>
          </div>
          <ActivityHeatmap />
        </div>

        {/* Recent activity - 1 col */}
        <div className="col-span-1 card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[13px] font-semibold text-white">Activity</h2>
          </div>
          <div className="space-y-3">
            {mockActivities.slice(0, 4).map((a) => {
              const style = activityStyles[a.type] || activityStyles.review_created;
              return (
                <div key={a.id} className="flex gap-2.5 group">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${style.bg}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${style.color === 'text-emerald-400' ? 'bg-emerald-400' : style.color === 'text-blue-400' ? 'bg-blue-400' : style.color === 'text-violet-400' ? 'bg-violet-400' : 'bg-amber-400'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-zinc-300 truncate leading-tight">{a.title}</p>
                    <p className="text-[10px] text-zinc-600 mt-0.5">{formatRelativeTime(a.timestamp)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MCP Tools health - 1 col */}
        <div className="col-span-1 card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[13px] font-semibold text-white">MCP Tools</h2>
            <span className="badge-success">
              <span className="status-dot green" />
              {mockStats.mcpTools.healthy}/{mockStats.mcpTools.total}
            </span>
          </div>
          <div className="space-y-1.5">
            {[
              { name: 'App Analyzer', ok: true },
              { name: 'Team Assistant', ok: true },
              { name: 'Deploy Mgr', ok: true },
              { name: 'DB Query', ok: true },
              { name: 'Data Insight', ok: true },
              { name: 'Code Repo', ok: true },
              { name: 'Log Analyzer', ok: false },
            ].map((t) => (
              <div key={t.name} className="flex items-center justify-between py-1.5 text-[12px]">
                <div className="flex items-center gap-2">
                  <span className={`status-dot ${t.ok ? 'green' : 'red'}`} />
                  <span className="text-zinc-400">{t.name}</span>
                </div>
                <span className={`text-[10px] ${t.ok ? 'text-zinc-600' : 'text-red-400'}`}>
                  {t.ok ? 'healthy' : 'down'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
