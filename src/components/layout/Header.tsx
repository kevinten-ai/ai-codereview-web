'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const commandItems = [
  { id: 'dashboard', label: 'Go to Dashboard', section: 'Pages', href: '/dashboard', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" /></svg> },
  { id: 'reviews', label: 'Go to Reviews', section: 'Pages', href: '/reviews', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg> },
  { id: 'tools', label: 'Go to MCP Tools', section: 'Pages', href: '/tools', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" /></svg> },
  { id: 'reports', label: 'Go to Analytics', section: 'Pages', href: '/reports', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg> },
  { id: 'settings', label: 'Go to Settings', section: 'Pages', href: '/settings', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg> },
  { id: 'new-review', label: 'Create New Review', section: 'Actions', href: '/reviews', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg> },
  { id: 'docs', label: 'Documentation', section: 'Pages', href: '/docs', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg> },
];

export default function Header() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const filteredItems = query
    ? commandItems.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))
    : commandItems;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setCmdOpen(prev => !prev);
      setQuery('');
      setSelectedIndex(0);
    }
    if (e.key === 'Escape') {
      setCmdOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleSelect = (href: string) => {
    setCmdOpen(false);
    setQuery('');
    router.push(href);
  };

  const handleCmdKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, filteredItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      handleSelect(filteredItems[selectedIndex].href);
    }
  };

  return (
    <>
      <header className="h-14 flex items-center justify-between px-6 border-b border-white/5 sticky top-0 z-20 bg-[#09090b]/80 backdrop-blur-xl">
        {/* Search trigger */}
        <button
          onClick={() => { setCmdOpen(true); setQuery(''); setSelectedIndex(0); }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-zinc-500 hover:text-zinc-400 hover:bg-white/[0.03] transition-colors border border-white/5"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <span className="text-[13px]">Search...</span>
          <kbd className="text-[10px] text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded ml-8 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-lg hover:bg-white/[0.03] transition-colors text-zinc-500 hover:text-zinc-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-violet-500 rounded-full" />
          </button>
        </div>
      </header>

      {/* Command Palette */}
      {cmdOpen && (
        <div className="cmd-backdrop" onClick={() => setCmdOpen(false)}>
          <div className="flex items-start justify-center pt-[20vh]">
            <div className="cmd-panel" onClick={(e) => e.stopPropagation()} onKeyDown={handleCmdKeyDown}>
              {/* Input */}
              <div className="flex items-center gap-3 px-4 border-b border-white/5">
                <svg className="w-4 h-4 text-zinc-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                  placeholder="Type a command or search..."
                  className="flex-1 py-3.5 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
                />
                <kbd className="text-[10px] text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded font-mono">ESC</kbd>
              </div>

              {/* Results */}
              <div className="py-2 max-h-[320px] overflow-y-auto">
                {filteredItems.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-zinc-600">No results found</div>
                ) : (
                  <>
                    {['Pages', 'Actions'].map((section) => {
                      const sectionItems = filteredItems.filter(i => i.section === section);
                      if (sectionItems.length === 0) return null;
                      return (
                        <div key={section}>
                          <div className="px-4 py-1.5 text-[11px] font-medium text-zinc-600 uppercase tracking-wider">
                            {section}
                          </div>
                          {sectionItems.map((item) => {
                            const globalIndex = filteredItems.indexOf(item);
                            return (
                              <div
                                key={item.id}
                                className={`cmd-item ${globalIndex === selectedIndex ? 'selected' : ''}`}
                                onClick={() => handleSelect(item.href)}
                                onMouseEnter={() => setSelectedIndex(globalIndex)}
                              >
                                <span className="text-zinc-500">{item.icon}</span>
                                <span>{item.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
