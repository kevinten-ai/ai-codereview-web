'use client';

import React, { useState } from 'react';

const sections = [
  {
    id: 'quickstart',
    title: 'Quick Start',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">1. Create a Code Review</h3>
          <p className="text-sm text-zinc-400 leading-relaxed mb-3">
            Navigate to the &quot;Code Reviews&quot; page and click &quot;New Review&quot;. Fill in the repository URL, branch, and optionally a specific commit hash.
          </p>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 font-mono text-xs text-zinc-400">
            <span className="text-emerald-400">POST</span> /api/reviews<br />
            {'{'}<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;title&quot;</span>: <span className="text-amber-400">&quot;Auth Module Review&quot;</span>,<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;repository&quot;</span>: <span className="text-amber-400">&quot;github.com/org/repo&quot;</span>,<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;branch&quot;</span>: <span className="text-amber-400">&quot;main&quot;</span><br />
            {'}'}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">2. View Results</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Once the AI review completes, you&apos;ll get a quality score (0-100), a list of issues categorized by severity, code complexity metrics, and actionable suggestions.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">3. Use MCP Tools</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            The platform integrates 7 MCP tools for deeper analysis. Use the App Analyzer for architecture review, DB Query for SQL performance, and Deploy Manager for deployment verification.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'api',
    title: 'API Reference',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>,
    content: (
      <div className="space-y-5">
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold text-zinc-900 bg-emerald-400 px-1.5 py-0.5 rounded">GET</span>
            <code className="text-sm text-zinc-300">/api/health</code>
          </div>
          <p className="text-xs text-zinc-500">Basic health check endpoint</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold text-zinc-900 bg-emerald-400 px-1.5 py-0.5 rounded">GET</span>
            <code className="text-sm text-zinc-300">/api/reviews</code>
          </div>
          <p className="text-xs text-zinc-500">List all code reviews with pagination</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold text-zinc-900 bg-blue-400 px-1.5 py-0.5 rounded">POST</span>
            <code className="text-sm text-zinc-300">/api/reviews</code>
          </div>
          <p className="text-xs text-zinc-500">Create a new code review</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold text-zinc-900 bg-emerald-400 px-1.5 py-0.5 rounded">GET</span>
            <code className="text-sm text-zinc-300">/api/reviews/:id/results</code>
          </div>
          <p className="text-xs text-zinc-500">Get detailed review results including issues and metrics</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold text-zinc-900 bg-emerald-400 px-1.5 py-0.5 rounded">GET</span>
            <code className="text-sm text-zinc-300">/api/mcp/tools</code>
          </div>
          <p className="text-xs text-zinc-500">List available MCP tools with health status</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold text-zinc-900 bg-blue-400 px-1.5 py-0.5 rounded">POST</span>
            <code className="text-sm text-zinc-300">/api/mcp/tools/:id/call</code>
          </div>
          <p className="text-xs text-zinc-500">Invoke an MCP tool with parameters</p>
        </div>
      </div>
    ),
  },
  {
    id: 'best-practices',
    title: 'Best Practices',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>,
    content: (
      <div className="space-y-5">
        {[
          { title: 'Review Frequently', desc: 'Run reviews on every PR. Small, frequent reviews catch issues earlier and are easier to fix than large batch reviews.' },
          { title: 'Keep Changes Small', desc: 'Limit each review to under 400 lines of changes. Larger diffs reduce review accuracy and make issues harder to trace.' },
          { title: 'Prioritize Security', desc: 'Always address critical security issues first. Use the Security category filter to quickly identify and resolve vulnerabilities.' },
          { title: 'Track Trends', desc: 'Monitor your quality scores over time in the Reports page. A declining score trend signals growing technical debt.' },
          { title: 'Rotate Token Regularly', desc: 'Rotate API tokens every 90 days. If a token is compromised, revoke it immediately and generate a new one.' },
        ].map((item) => (
          <div key={item.title} className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-zinc-200">{item.title}</h4>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'security',
    title: 'Security Guide',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
    content: (
      <div className="space-y-5">
        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <span className="text-sm font-medium text-amber-400">Security Notice</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Never share your API tokens in code, logs, or public channels. Use environment variables for token storage in CI/CD pipelines.
          </p>
        </div>
        {[
          'Rotate API tokens every 90 days',
          'Never hardcode tokens in source code',
          'Use environment variables or secret managers',
          'Revoke compromised tokens immediately',
          'Enable email alerts for critical security issues',
          'Review security audit results within 24 hours',
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            <div className="w-5 h-5 rounded bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <span className="text-sm text-zinc-400">{item}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'faq',
    title: 'FAQ',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" /></svg>,
    content: (
      <div className="space-y-5">
        {[
          { q: 'How is the quality score calculated?', a: 'Quality score is a composite metric: Code Complexity (30%), Test Coverage (25%), Code Standards (20%), Security (15%), Performance (10%).' },
          { q: 'Which repositories are supported?', a: 'GitHub, GitLab, and Bitbucket repositories are supported. Both public and private repos work with proper authentication.' },
          { q: 'How do I integrate with CI/CD?', a: 'Use the API with your token in the Authorization header. Create reviews programmatically via POST /api/reviews and poll for results.' },
          { q: 'What languages are supported?', a: 'The AI reviewer supports TypeScript, JavaScript, Python, Java, Go, Rust, C++, Ruby, PHP, and more. Language detection is automatic.' },
        ].map((item) => (
          <div key={item.q} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <h4 className="text-sm font-medium text-zinc-200 mb-2">{item.q}</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    ),
  },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('quickstart');

  const currentSection = sections.find(s => s.id === activeSection) || sections[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-lg font-semibold text-white">Documentation</h1>
        <p className="text-zinc-500 text-[13px]">Guides, API reference, and best practices</p>
      </div>

      <div className="flex gap-6">
        <div className="w-44 flex-shrink-0 space-y-0.5">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                activeSection === section.id
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {section.icon}
              {section.title}
            </button>
          ))}
        </div>

        <div className="flex-1 card p-6">
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-white/5">
            <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
              {currentSection.icon}
            </div>
            <h2 className="text-[14px] font-semibold text-white">{currentSection.title}</h2>
          </div>
          {currentSection.content}
        </div>
      </div>
    </div>
  );
}
