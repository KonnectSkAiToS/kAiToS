import React, { useState, useEffect, useRef } from 'react';
import { SERVICES, CASE_STUDIES, BLOG_POSTS, TECH_STACK, COMPANY_INFO } from '../data/content';
import { ActiveSection } from '../types';
import { KaitosLogo } from './KaitosLogo';
import { Search, X, ArrowRight, Layers, Briefcase, FileText, Cpu, Mail, CornerDownLeft } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: ActiveSection) => void;
}

interface SearchItem {
  id: string;
  title: string;
  category: 'Service' | 'Case Study' | 'Technical Blog' | 'Tech Stack' | 'Contact Channel';
  snippet: string;
  icon: React.ReactNode;
  targetSection: ActiveSection;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setCategoryFilter('All');
    }
  }, [isOpen]);

  // Aggregate search corpus
  const allItems: SearchItem[] = [
    // Services
    ...SERVICES.map(s => ({
      id: `svc-${s.id}`,
      title: s.title,
      category: 'Service' as const,
      snippet: s.summary,
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      targetSection: 'services' as ActiveSection
    })),
    // Case Studies
    ...CASE_STUDIES.map(c => ({
      id: `cs-${c.id}`,
      title: c.title,
      category: 'Case Study' as const,
      snippet: `${c.clientIndustry} — ${c.challenge.slice(0, 80)}...`,
      icon: <Briefcase className="w-4 h-4 text-emerald-400" />,
      targetSection: 'portfolio' as ActiveSection
    })),
    // Blog Posts
    ...BLOG_POSTS.map(b => ({
      id: `blog-${b.id}`,
      title: b.title,
      category: 'Technical Blog' as const,
      snippet: b.excerpt,
      icon: <FileText className="w-4 h-4 text-amber-400" />,
      targetSection: 'blog' as ActiveSection
    })),
    // Technologies
    ...TECH_STACK.flatMap(cat => 
      cat.technologies.map(t => ({
        id: `tech-${t.name}`,
        title: `${t.name} (${t.role})`,
        category: 'Tech Stack' as const,
        snippet: `${cat.category} — ${t.proficiency}`,
        icon: <Cpu className="w-4 h-4 text-purple-400" />,
        targetSection: 'about' as ActiveSection
      }))
    ),
    // Contact & Channels
    {
      id: 'contact-inquiry',
      title: 'Project Inquiry & SOW Transmissions',
      category: 'Contact Channel' as const,
      snippet: `Direct email: ${COMPANY_INFO.emails.contact} · Technical proposal submission form`,
      icon: <Mail className="w-4 h-4 text-cyan-400" />,
      targetSection: 'contact'
    },
    {
      id: 'contact-phone-in',
      title: 'India Engineering Hotline: +91 8220184799',
      category: 'Contact Channel' as const,
      snippet: 'Direct telephone & WhatsApp engineering line for India & APAC inquiries (Bengaluru HQ)',
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      targetSection: 'contact'
    },
    {
      id: 'contact-phone-uk',
      title: 'UK & International Line: +44 7733926231',
      category: 'Contact Channel' as const,
      snippet: 'Direct telephone & WhatsApp engineering desk for UK, Europe, and International clients (London Node)',
      icon: <Mail className="w-4 h-4 text-cyan-400" />,
      targetSection: 'contact'
    },
    {
      id: 'contact-careers',
      title: 'Careers & Hiring at kÅiTøS',
      category: 'Contact Channel' as const,
      snippet: `Systems engineering, Rust, CUDA, and GitOps roles: ${COMPANY_INFO.emails.careers}`,
      icon: <Mail className="w-4 h-4 text-cyan-400" />,
      targetSection: 'contact'
    },
    {
      id: 'contact-support',
      title: '24/7 SRE Support & Incident Escalation',
      category: 'Contact Channel' as const,
      snippet: `Active SLA support: ${COMPANY_INFO.emails.support} · Emergency phone: +91 8220184799 / +44 7733926231`,
      icon: <Mail className="w-4 h-4 text-rose-400" />,
      targetSection: 'contact'
    }
  ];

  // Filtering
  const filtered = allItems.filter(item => {
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    if (!matchesCategory) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.snippet.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  // Handle keyboard events (ArrowUp, ArrowDown, Enter, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < filtered.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : filtered.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          handleSelect(filtered[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex]);

  const handleSelect = (item: SearchItem) => {
    onNavigate(item.targetSection);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl w-full bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center gap-3">
          <div className="p-1 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
            <KaitosLogo size={24} variant="icon" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search kÅiTøS services, case studies, tech stack, blog, emails..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            ESC
          </kbd>
        </div>

        {/* Filter Category Tabs */}
        <div className="p-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs">
          {['All', 'Service', 'Case Study', 'Technical Blog', 'Tech Stack', 'Contact Channel'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategoryFilter(cat);
                setSelectedIndex(0);
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-cyan-400 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white bg-slate-950/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div ref={listRef} className="max-h-[55vh] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No matching records found for "{query}". Try searching for <span className="text-cyan-400">"Cloud"</span>, <span className="text-cyan-400">"FinTech"</span>, <span className="text-cyan-400">"Rust"</span>, or <span className="text-cyan-400">"contact@kaitos.in"</span>.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isHighlighted = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group focus:outline-none cursor-pointer ${
                    isHighlighted
                      ? 'bg-slate-800 border border-slate-700/80'
                      : 'hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-4">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold truncate ${isHighlighted ? 'text-cyan-300' : 'text-white'}`}>
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded shrink-0">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {item.snippet}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isHighlighted && (
                      <span className="text-[10px] font-mono text-cyan-400 hidden sm:inline-flex items-center gap-0.5">
                        <CornerDownLeft className="w-3 h-3" /> Select
                      </span>
                    )}
                    <ArrowRight className={`w-4 h-4 transition-colors ${isHighlighted ? 'text-cyan-400' : 'text-slate-600'}`} />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>·</span>
            <span>↵ to select</span>
          </div>
          <span>{filtered.length} matches</span>
        </div>
      </div>
    </div>
  );
};
