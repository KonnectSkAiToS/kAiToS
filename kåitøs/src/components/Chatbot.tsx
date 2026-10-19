import React, { useState, useRef, useEffect } from 'react';
import { COMPANY_INFO } from '../data/content';
import { ActiveSection, ChatMessage } from '../types';
import { useToast } from './Toast';
import { useLocationCurrency, CONTACT_PHONES } from '../context/LocationCurrencyContext';
import { KaitosLogo, KaitosWordmark } from './KaitosLogo';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  Mail, 
  RotateCcw, 
  Copy,
  Clock,
  Sparkles,
  Search,
  Phone
} from 'lucide-react';

interface ChatbotProps {
  onNavigate: (section: ActiveSection) => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const { config, formatMoney } = useLocationCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialBotMessage: ChatMessage = {
    id: 'welcome',
    sender: 'bot',
    text: "Hello! I am the kÅiTøS Intelligence Concierge. How can I assist your engineering team today? You can inquire about our kernel & cloud services, calculate project scopes in your local currency, track an existing inquiry ticket, or speak directly with our systems engineers.",
    timestamp: 'Just now',
    actionLinks: [
      { label: 'Explore Services', targetSection: 'services' },
      { label: 'Telemetry & Benchmarks', targetSection: 'statistics' },
      { label: 'Project Inquiry Form', targetSection: 'contact' }
    ]
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialBotMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'What does kÅiTøS stand for?',
    'Direct contact phone numbers',
    'Estimate sprint timeline & cost',
    'Track inquiry ticket: KTS-8241-INQ',
    '24/7 SLA escalation for support'
  ];

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard', 'success');
  };

  const handleResetChat = () => {
    setMessages([initialBotMessage]);
    showToast('Conversation reset', 'info');
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Contextual bot response engine
    setTimeout(() => {
      const lower = query.toLowerCase();
      let replyText = '';
      let actionLinks: ChatMessage['actionLinks'] = undefined;

      if (lower.includes('stand for') || lower.includes('meaning') || lower.includes('acronym') || lower.includes('name')) {
        replyText = `kÅiTøS represents the unified convergence of its five architectural pillars:\n• K: Kernel Computing (Deterministic low-latency runtimes & NUMA scheduling)\n• Ai: Artificial Intelligence (Deep learning, neural kernels & autonomous agents)\n• IT: Information Technology (Mission-critical cloud, multi-region GitOps)\n• øS: Operating System (eBPF schedulers, continuous bin-packing & zero-lock memory)\n• S: Scalable Systems (High-concurrency event brokers & enterprise security)\n\nOfficial domain: kaitos.in.`;
        actionLinks = [{ label: 'Read Origin & Foundation', targetSection: 'about' }];
      } else if (lower.includes('phone') || lower.includes('call') || lower.includes('number') || lower.includes('contact') || lower.includes('reach')) {
        replyText = `Here are our direct engineering hotlines:\n• 🇮🇳 India Hotline: +91 8220184799\n• 🇬🇧 UK & International Line: +44 7733926231\n\nOfficial Email Channels:\n• General Queries: info@kaitos.in\n• Client SOWs: contact@kaitos.in\n• 24/7 Production SRE: support@kaitos.in\n• Engineering Careers: careers@kaitos.in`;
        actionLinks = [
          { label: 'Open Contact Form', targetSection: 'contact' },
          { label: 'Email contact@kaitos.in', email: 'contact@kaitos.in' }
        ];
      } else if (lower.includes('cost') || lower.includes('price') || lower.includes('estimate') || lower.includes('timeline') || lower.includes('rate')) {
        const pocFormatted = formatMoney(25000);
        const clusterMin = formatMoney(50000);
        const clusterMax = formatMoney(95000);
        const platMin = formatMoney(120000);

        replyText = `Our engineering engagements are structured in transparent, milestone-driven sprints (localized for ${config.name}):\n• Rapid PoC / Architecture Audit: 4 Weeks (~${pocFormatted})\n• Core Production Cluster Build: 8-12 Weeks (${clusterMin} - ${clusterMax})\n• Full Enterprise Autonomous Platform: 16+ Weeks (${platMin}+)\n\nAll deliverables include 100% intellectual property transfer to your organization.`;
        actionLinks = [
          { label: 'Try Localized Estimator', targetSection: 'services' },
          { label: 'Request Custom SOW', targetSection: 'contact' }
        ];
      } else if (lower.includes('track') || lower.includes('ticket') || lower.includes('status') || lower.includes('kts-')) {
        const ticketMatch = query.match(/KTS-\d{4}-INQ/i);
        const ticketId = ticketMatch ? ticketMatch[0].toUpperCase() : 'KTS-8241-INQ';
        replyText = `📋 Inquiry Ticket Status for [${ticketId}]:\n\n• Step 1: Ingested & Verified — [COMPLETED]\n• Step 2: Principal Systems Architects Triage — [ACTIVE]\n• Step 3: Technical SOW Formulation — [EST. 14 HOURS]\n• Step 4: Transmit Milestone Proposal — [PENDING]\n\nAssigned to: kÅiTøS Systems Architecture Practice. For immediate escalation, call 🇮🇳 +91 8220184799 or 🇬🇧 +44 7733926231.`;
        actionLinks = [{ label: 'Email contact@kaitos.in', email: 'contact@kaitos.in' }];
      } else if (lower.includes('support') || lower.includes('sla') || lower.includes('urgent') || lower.includes('incident') || lower.includes('down')) {
        replyText = `🚨 24/7 Production Support & SLA Escalation:\nOur Site Reliability Engineering nodes operate around the clock. Active clients receive guaranteed sub-10 minute triage for P1 incidents.\n\nDirect SLA Desk: support@kaitos.in\nEmergency SRE Phone: +91 8220184799 / +44 7733926231`;
        actionLinks = [{ label: 'Email support@kaitos.in', email: 'support@kaitos.in' }];
      } else if (lower.includes('career') || lower.includes('job') || lower.includes('hiring') || lower.includes('apply')) {
        replyText = `We are expanding our systems core! Open roles include:\n• Principal Systems Architect (Rust / eBPF)\n• Staff CUDA & Triton Inference Engineer\n• Lead SRE (Kubernetes GitOps)\n\nSend your resume and GitHub to careers@kaitos.in.`;
        actionLinks = [{ label: 'Email careers@kaitos.in', email: 'careers@kaitos.in' }];
      } else if (lower.includes('case') || lower.includes('portfolio') || lower.includes('work') || lower.includes('client')) {
        replyText = `Verified client results:\n• FinTech Settlement Engine: 14.2ms P99 settlement, 99.999% SLA\n• Freight Logistics OS: 42% latency cut, $3.2M fuel saved annually\n• Healthcare Federated AI: 94.8% accuracy, 100% zero PHI egress\n• E-Commerce Multi-Cloud: 65% monthly cloud bill cut.`;
        actionLinks = [{ label: 'Open Portfolio Section', targetSection: 'portfolio' }];
      } else {
        replyText = `Thank you for your message. Whether you require distributed backend systems, multi-cloud FinOps reduction, or low-latency AI kernels, our architects are ready to assist. You can also reach our engineering lines directly at +91 8220184799 (India) or +44 7733926231 (UK).`;
        actionLinks = [
          { label: 'Contact Us', targetSection: 'contact' },
          { label: 'Explore Benchmarks', targetSection: 'statistics' }
        ];
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionLinks
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle kÅiTøS Assistant"
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-2xl transition-all duration-200 hover:scale-105 focus:outline-none flex items-center justify-center cursor-pointer border border-cyan-300/50"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse" />
          </div>
        )}
      </button>

      {/* Interactive Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-40 w-[94vw] sm:w-[420px] h-[550px] max-h-[80vh] rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-sm">
                <KaitosLogo size={26} variant="icon" />
                <div className="flex flex-col text-left">
                  <div className="flex items-baseline">
                    <KaitosWordmark size="sm" />
                    <span className="ml-1 text-[10px] text-slate-800 font-bold">AI</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800/60 inline-flex items-center gap-1 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Hotline: +91 8220184799
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reset conversation"
                className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Flow Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3 rounded-xl leading-relaxed whitespace-pre-wrap relative group ${
                      msg.sender === 'user'
                        ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}

                    {msg.sender === 'bot' && (
                      <button
                        onClick={() => handleCopyText(msg.text)}
                        title="Copy message"
                        className="absolute bottom-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-500 hover:text-white cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Optional Action Quick Links */}
                  {msg.actionLinks && msg.actionLinks.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.actionLinks.map((link, lIdx) => (
                        <button
                          key={lIdx}
                          onClick={() => {
                            if (link.targetSection) {
                              onNavigate(link.targetSection);
                              setIsOpen(false);
                            }
                            if (link.email) {
                              window.location.href = `mailto:${link.email}`;
                            }
                          }}
                          className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[11px] font-mono text-cyan-400 border border-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className={`text-[10px] text-slate-500 font-mono px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-md bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-500 text-xs">
                <div className="w-6 h-6 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800/40 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex gap-1">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-900 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 text-[11px] whitespace-nowrap transition-colors border border-slate-800/80 cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Inquire about architecture, phones, or SOWs..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
