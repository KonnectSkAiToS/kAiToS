import React, { useState } from 'react';
import { SERVICES } from '../data/content';
import { ActiveSection, ServiceItem } from '../types';
import { useToast } from './Toast';
import { useLocationCurrency, RegionCode } from '../context/LocationCurrencyContext';
import { 
  ArrowRight, 
  Check, 
  X, 
  Shield, 
  Clock, 
  Users, 
  ArrowUpRight, 
  Copy, 
  Layers,
  Sparkles,
  Globe,
  ChevronDown
} from 'lucide-react';

interface ServicesSectionProps {
  onNavigate: (section: ActiveSection) => void;
  onSelectServiceForInquiry?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate, onSelectServiceForInquiry }) => {
  const { showToast } = useToast();
  const { region, setRegion, config, formatMoney, convertFromUSD } = useLocationCurrency();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Estimator Widget State
  const [estimatorService, setEstimatorService] = useState<string>('Software Engineering');
  const [estimatorComplexity, setEstimatorComplexity] = useState<'Standard' | 'Advanced' | 'Enterprise Scale'>('Advanced');
  const [sprintDuration, setSprintDuration] = useState<number>(8);

  const calculateEstimate = () => {
    // Base weekly rate in USD
    const baseWeeklyUSD = estimatorComplexity === 'Standard' ? 6500 : estimatorComplexity === 'Advanced' ? 9800 : 14500;
    const totalUSD = baseWeeklyUSD * sprintDuration;
    return {
      totalUSD,
      teamSize: estimatorComplexity === 'Standard' ? '2 Senior Systems Engineers' : estimatorComplexity === 'Advanced' ? '1 Principal Architect + 3 Senior Staff' : 'Dedicated Core Squad (6 Specialists)'
    };
  };

  const estimate = calculateEstimate();

  const handleBookService = (serviceTitle: string) => {
    if (onSelectServiceForInquiry) {
      onSelectServiceForInquiry(serviceTitle);
    }
    showToast(`Inquiry configured for ${serviceTitle}`, 'info', 'Navigating to project inquiry form.');
    onNavigate('contact');
  };

  const handleCopyScopeSpec = () => {
    const formattedAmount = formatMoney(estimate.totalUSD);
    const text = `kÅiTøS Sprint Scope Specification:\nTarget Practice: ${estimatorService}\nComplexity: ${estimatorComplexity}\nDuration: ${sprintDuration} Weeks\nEstimated Investment: ${formattedAmount} (${config.code})\nLocation: ${config.name}\nSquad: ${estimate.teamSize}\nClient IP: 100% Client-Owned GitOps Repo\nRequest this scope at contact@kaitos.in or call +91 8220184799 / +44 7733926231`;
    navigator.clipboard.writeText(text);
    showToast('Sprint scope specification copied', 'success');
  };

  return (
    <section className="py-16 lg:py-24 bg-[#080C14] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-cyan-400 mb-2 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" />
            <span>DISCIPLINES & CORE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 text-balance">
            Precision engineering across the entire digital lifecycle.
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            From distributed backend kernels to automated multi-cloud meshes and proactive 24/7 SRE, <span className="text-white font-medium">kÅiTøS (kaitos.in)</span> builds systems that thrive under extreme concurrency.
          </p>
        </div>

        {/* 4 Core Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {SERVICES.map((service, idx) => {
            const accents = [
              { border: 'border-l-red-500', text: 'text-red-400', badge: 'text-red-400' },
              { border: 'border-l-cyan-400', text: 'text-cyan-400', badge: 'text-cyan-400' },
              { border: 'border-l-lime-400', text: 'text-lime-400', badge: 'text-lime-400' },
              { border: 'border-l-blue-500', text: 'text-blue-400', badge: 'text-blue-400' }
            ];
            const currentAccent = accents[idx % accents.length];

            return (
              <div
                key={service.id}
                className={`p-8 rounded-2xl bg-slate-900/40 border border-slate-800 ${currentAccent.border} border-l-4 hover:border-slate-700 transition-all flex flex-col justify-between group hover:shadow-xl hover:shadow-cyan-950/20`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-mono font-bold ${currentAccent.text}`}>
                      {service.number}. {service.category.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-2">
                      {service.metrics.map((m, mIdx) => (
                        <span key={mIdx} className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                          {m.label}: <strong className={`${currentAccent.text} font-bold`}>{m.value}</strong>
                        </span>
                      ))}
                    </div>
                  </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {service.summary}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-2.5 mb-8">
                  {service.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-semibold text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1 focus:outline-none cursor-pointer"
                >
                  <span>Detailed Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleBookService(service.title)}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors inline-flex items-center gap-1.5 focus:outline-none cursor-pointer"
                >
                  <span>Inquire for {service.number}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
        </div>

        {/* Interactive Sprint & Team Scope Estimator with Dynamic Location Currency */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <div className="text-xs font-mono text-cyan-400 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>LOCALIZED SPRINT ESTIMATOR</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Calculate an Engineering Sprint Scope
              </h3>
              <p className="text-xs text-slate-400">
                Configure your practice area, architectural depth, and delivery horizon. Pricing is dynamically calculated based on your detected location ({config.name}).
              </p>
            </div>

            {/* Region / Currency Switcher Badge */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-slate-400 font-mono">Location:</span>
              <div className="flex gap-1">
                {(['IN', 'UK', 'US', 'EU'] as RegionCode[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRegion(r)}
                    className={`px-2 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                      region === r
                        ? 'bg-cyan-400 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white bg-slate-900'
                    }`}
                  >
                    {r === 'IN' ? '🇮🇳 ₹ INR' : r === 'UK' ? '🇬🇧 £ GBP' : r === 'US' ? '🇺🇸 $ USD' : '🇪🇺 € EUR'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* Service Select */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Target Practice Area</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Software Engineering', 'Cloud & DevOps', 'Strategic Consulting', 'Managed IT'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setEstimatorService(s)}
                      className={`p-2.5 text-xs font-medium rounded-lg border text-center transition-colors truncate cursor-pointer ${
                        estimatorService === s
                          ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 font-semibold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Complexity Level */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">System Complexity & Architecture Depth</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Standard', 'Advanced', 'Enterprise Scale'] as const).map((comp) => (
                    <button
                      key={comp}
                      type="button"
                      onClick={() => setEstimatorComplexity(comp)}
                      className={`p-2.5 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                        estimatorComplexity === comp
                          ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 font-semibold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      {comp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline duration slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Sprint Horizon</span>
                  <span className="font-mono text-cyan-400 font-semibold">{sprintDuration} Weeks</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="24"
                  step="2"
                  value={sprintDuration}
                  onChange={(e) => setSprintDuration(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>4 Weeks (Rapid PoC)</span>
                  <span>12 Weeks (Core Release)</span>
                  <span>24 Weeks (Full Enterprise Suite)</span>
                </div>
              </div>
            </div>

            {/* Calculated Output Summary in User's Local Currency */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-slate-950 border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono text-cyan-400">ESTIMATED PROPOSAL</span>
                <span className="text-xs font-mono text-slate-400">
                  {config.flag} {config.name} ({config.code})
                </span>
              </div>

              <div>
                <div className="text-xs text-slate-400">Projected Sprint Investment</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums mt-1 text-cyan-300">
                  {formatMoney(estimate.totalUSD)}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Transparent milestone pricing calculated for {config.name}
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Squad: {estimate.teamSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Cycle: Bi-weekly deliverable sprints & code freeze</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ownership: 100% Client IP & GitOps manifests</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900 flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyScopeSpec}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Proposal Spec</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleBookService(`${estimatorService} (${estimatorComplexity})`)}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Request SOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Service Specifications Modal */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="text-xs font-mono text-cyan-400 mb-1">
                    {selectedService.number}. {selectedService.category.toUpperCase()}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedService.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedService.description}
              </p>

              <div>
                <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3">
                  Scope of Deliverables
                </h4>
                <div className="space-y-2">
                  {selectedService.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {selectedService.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs">
                    <div className="text-slate-400">{m.label}</div>
                    <div className="text-base font-bold text-cyan-400 mt-1">{m.value}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    handleBookService(title);
                  }}
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
                >
                  Proceed to Project Inquiry
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
