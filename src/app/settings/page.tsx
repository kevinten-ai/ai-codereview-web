'use client';

import React, { useState } from 'react';

const mockTokens = [
  { id: 't1', name: 'Production API', token: 'aicr_prod_k8x9m2n4p7q1r3s5', status: 'active', createdAt: '2026-01-15', lastUsed: '2026-03-31' },
  { id: 't2', name: 'Staging Environment', token: 'aicr_stg_w6y8a1b3c5d7e9f2', status: 'active', createdAt: '2026-02-20', lastUsed: '2026-03-28' },
  { id: 't3', name: 'CI/CD Pipeline', token: 'aicr_ci_g4h6i8j1k3l5m7n9', status: 'inactive', createdAt: '2025-11-10', lastUsed: '2026-02-15' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [copied, setCopied] = useState<string | null>(null);

  const tabs = [
    { id: 'general', label: 'General', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg> },
    { id: 'tokens', label: 'API Tokens', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" /></svg> },
    { id: 'notifications', label: 'Notifications', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg> },
  ];

  const copyToken = (token: string, id: string) => {
    navigator.clipboard.writeText(token);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-4 animate-fade-in max-w-[1400px]">
      <div>
        <h1 className="text-lg font-semibold text-white">Settings</h1>
        <p className="text-zinc-500 text-[13px]">Manage your preferences, API tokens, and notifications</p>
      </div>

      <div className="flex gap-6">
        <div className="w-44 flex-shrink-0 space-y-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="card p-6 space-y-5">
              <div>
                <h2 className="text-[14px] font-semibold text-white mb-0.5">General Settings</h2>
                <p className="text-[11px] text-zinc-600">Configure your portal preferences</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Display Name</label>
                  <input className="input-dark max-w-md" defaultValue="Kevin" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email</label>
                  <input className="input-dark max-w-md" defaultValue="kevin@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Language</label>
                  <select className="input-dark max-w-md cursor-pointer">
                    <option value="en">English</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Theme</label>
                  <select className="input-dark max-w-md cursor-pointer">
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                  </select>
                </div>
                <div className="flex items-center justify-between max-w-md py-3 border-t border-white/5">
                  <div>
                    <p className="text-sm text-zinc-300">Email Notifications</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Receive review completion alerts</p>
                  </div>
                  <button className="relative w-11 h-6 bg-violet-500 rounded-full transition-colors">
                    <span className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform" />
                  </button>
                </div>
                <div className="flex items-center justify-between max-w-md py-3 border-t border-white/5">
                  <div>
                    <p className="text-sm text-zinc-300">Auto-review on Push</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Trigger review automatically on git push</p>
                  </div>
                  <button className="relative w-11 h-6 bg-white/10 rounded-full transition-colors">
                    <span className="absolute left-0.5 top-0.5 w-5 h-5 bg-slate-400 rounded-full transition-transform" />
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <button className="btn-primary">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'tokens' && (
            <div className="space-y-6">
              <div className="card p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-1">API Tokens</h2>
                    <p className="text-xs text-zinc-500">Manage tokens for API access and CI/CD integration</p>
                  </div>
                  <button className="btn-primary flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Create Token
                  </button>
                </div>

                <div className="space-y-3">
                  {mockTokens.map((token) => (
                    <div key={token.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-zinc-200 font-medium">{token.name}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <code className="text-[11px] text-zinc-500 font-mono">
                              {token.token.substring(0, 12)}...{token.token.slice(-4)}
                            </code>
                            <button
                              onClick={() => copyToken(token.token, token.id)}
                              className="text-zinc-600 hover:text-zinc-300 transition-colors"
                            >
                              {copied === token.id ? (
                                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                              ) : (
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" /></svg>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <p className="text-[11px] text-zinc-600">Last used</p>
                          <p className="text-xs text-zinc-400">{token.lastUsed}</p>
                        </div>
                        <span className={token.status === 'active' ? 'badge-success' : 'badge-warning'}>
                          <span className={`status-dot pulse ${token.status === 'active' ? 'green' : 'amber'}`} style={{ width: 6, height: 6 }} />
                          {token.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                        <button className="text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* API Documentation hint */}
              <div className="card p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-300 font-medium">API Authentication</p>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                      Include your token in the <code className="text-blue-400 bg-violet-500/10 px-1 py-0.5 rounded text-[11px]">Authorization</code> header as <code className="text-blue-400 bg-violet-500/10 px-1 py-0.5 rounded text-[11px]">Bearer &lt;token&gt;</code> for all API requests.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card p-8 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-1">Notification Preferences</h2>
                <p className="text-xs text-zinc-500">Choose what notifications you receive</p>
              </div>
              <div className="space-y-1">
                {[
                  { label: 'Review Completed', desc: 'When an AI review finishes processing', enabled: true },
                  { label: 'Critical Issues Found', desc: 'When critical security issues are detected', enabled: true },
                  { label: 'Tool Health Alerts', desc: 'When an MCP tool becomes unhealthy', enabled: true },
                  { label: 'Weekly Summary', desc: 'Weekly digest of review activity', enabled: false },
                  { label: 'New Team Member', desc: 'When someone joins your organization', enabled: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-4 border-b border-white/5">
                    <div>
                      <p className="text-sm text-zinc-300">{item.label}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{item.desc}</p>
                    </div>
                    <button className={`relative w-11 h-6 rounded-full transition-colors ${item.enabled ? 'bg-violet-500' : 'bg-white/10'}`}>
                      <span className={`absolute top-0.5 w-5 h-5 rounded-full transition-transform ${item.enabled ? 'right-0.5 bg-white' : 'left-0.5 bg-slate-400'}`} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <button className="btn-primary">Save Preferences</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
