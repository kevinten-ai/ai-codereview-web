'use client';

import React, { useState } from 'react';
import { mockReviews } from '@/lib/mock-data';
import { formatRelativeTime, getScoreColor, getScoreBg, getStatusConfig } from '@/lib/utils';
import type { CodeReview } from '@/types';

export default function ReviewsPage() {
  const [filter, setFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);

  const filteredReviews = filter === 'all' ? mockReviews : mockReviews.filter(r => r.status === filter);
  const counts = {
    all: mockReviews.length,
    completed: mockReviews.filter(r => r.status === 'completed').length,
    processing: mockReviews.filter(r => r.status === 'processing').length,
    pending: mockReviews.filter(r => r.status === 'pending').length,
    failed: mockReviews.filter(r => r.status === 'failed').length,
  };

  return (
    <div className="space-y-4 animate-fade-in max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">Code Reviews</h1>
          <p className="text-zinc-500 text-[13px]">Manage and track AI-powered code reviews</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-[13px]" onClick={() => setShowModal(true)}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          New Review
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-1">
        {(['all', 'completed', 'processing', 'pending', 'failed'] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
              filter === s ? 'bg-zinc-800 text-white' : 'text-zinc-600 hover:text-zinc-400'
            }`}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
            <span className="ml-1 text-[10px] opacity-50">{counts[s]}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {['Review', 'Branch', 'Status', 'Score', 'Issues', 'Time', ''].map((h) => (
                <th key={h} className={`text-left text-[11px] font-medium text-zinc-600 uppercase tracking-wider px-4 py-3 ${h === '' ? 'text-right' : ''}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map((r) => {
              const sc = getStatusConfig(r.status);
              return (
                <tr key={r.id} className="table-row group">
                  <td className="px-4 py-3">
                    <p className="text-[13px] font-medium text-zinc-200 group-hover:text-white transition-colors">{r.title}</p>
                    <p className="text-[11px] text-zinc-600 mt-0.5 font-mono">{r.repository}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] text-zinc-500 font-mono bg-zinc-900 px-2 py-0.5 rounded">{r.branch}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={sc.color}>
                      <span className={`status-dot ${sc.dotColor}`} /> {sc.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {r.qualityScore ? (
                      <span className={`text-[12px] font-bold metric px-2 py-0.5 rounded border ${getScoreBg(r.qualityScore)} ${getScoreColor(r.qualityScore)}`}>{r.qualityScore}</span>
                    ) : <span className="text-zinc-700 text-[12px]">--</span>}
                  </td>
                  <td className="px-4 py-3"><span className="text-[13px] text-zinc-400 metric">{r.issueCount ?? '--'}</span></td>
                  <td className="px-4 py-3"><span className="text-[11px] text-zinc-600">{formatRelativeTime(r.createdAt)}</span></td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-[12px] text-violet-400 hover:text-violet-300 transition-colors font-medium opacity-0 group-hover:opacity-100">View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredReviews.length === 0 && <div className="text-center py-12 text-zinc-600 text-[13px]">No reviews found.</div>}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="glass p-6 w-full max-w-lg relative z-10 animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[15px] font-semibold text-white">New Code Review</h2>
              <button onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-zinc-500 mb-1">Title</label>
                <input className="input-dark" placeholder="e.g., Auth Module Security Audit" />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-zinc-500 mb-1">Repository</label>
                <input className="input-dark" placeholder="e.g., github.com/org/repo" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-zinc-500 mb-1">Branch</label>
                  <input className="input-dark" placeholder="main" />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-zinc-500 mb-1">Commit</label>
                  <input className="input-dark" placeholder="Optional" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-zinc-500 mb-1">Description</label>
                <textarea className="input-dark resize-none" rows={3} placeholder="Review scope..." />
              </div>
              <div className="flex gap-2 pt-1">
                <button className="btn-ghost flex-1 text-[13px]" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn-primary flex-1 text-[13px]" onClick={() => setShowModal(false)}>Create</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
