import React from 'react';
import { COMPANY_INFO, CORE_METRICS } from '../data/content';
import { ActiveSection } from '../types';
import { useLocationCurrency, CONTACT_PHONES } from '../context/LocationCurrencyContext';
import { KaitosLogo, KaitosWordmark } from './KaitosLogo';
import heroDatacenterImg from '../assets/images/kaitos_hero_datacenter_ai_1791994196980.jpg';
import { ArrowRight, Cpu, Layers, BarChart3, ShieldCheck, Phone, Globe, Activity, TrendingUp } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: ActiveSection) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { formatMoney, config } = useLocationCurrency();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 bg-grid-pattern">
      {/* Signature Logo Tri-Color Ambient Lighting (Crimson Red, Cobalt Blue, Emerald/Lime) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-red-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/4 right-10 w-[450px] h-[320px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Brand Kicker with Logo-Derived Multi-Color Spectrum */}
        <div className="mb-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs">
          <div className="px-2 py-0.5 rounded-lg bg-white border border-slate-200 shadow-sm inline-flex items-center">
            <KaitosWordmark size="sm" />
          </div>
          <span className="text-slate-600">·</span>
          <span className="text-red-400/90 font-medium">Kernel Runtimes</span>
          <span className="text-slate-600">/</span>
          <span className="text-lime-400/90 font-medium">Artificial Intelligence</span>
          <span className="text-slate-600">/</span>
          <span className="text-cyan-400/90 font-medium">Enterprise Cloud</span>
          <span className="text-slate-600">/</span>
          <span className="text-blue-400/90 font-medium">Deterministic OS</span>
          <span className="text-slate-600">·</span>
          <span className="text-emerald-400 font-mono flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>kaitos.in</span>
          </span>
        </div>

        {/* 2-Column Split: Editorial Value Prop on Left, High-Fidelity Visual with Logo Crest on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch mb-16">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance mb-6">
              Engineering the convergence of AI, enterprise IT, and autonomous operating systems.
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              {COMPANY_INFO.mission} At <span className="text-cyan-400 font-mono font-semibold">kaitos.in</span>, we construct high-concurrency microservices, automated multi-cloud meshes, and deterministic kernel runtimes designed for zero downtime and measurable enterprise ROI.
            </p>

            {/* Direct Phone Assistance Banner with Logo-Matched Border Accents */}
            <div className="mb-8 p-3.5 rounded-xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-950 border border-slate-800/90 flex flex-wrap items-center justify-between gap-3 max-w-xl shadow-lg">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Speak directly with our systems engineering team:</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <a
                  href={`tel:${CONTACT_PHONES.india.number.replace(/\s+/g, '')}`}
                  className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-red-400 hover:text-white transition-colors"
                >
                  🇮🇳 {CONTACT_PHONES.india.display}
                </a>
                <span className="text-slate-700">·</span>
                <a
                  href={`tel:${CONTACT_PHONES.uk.number.replace(/\s+/g, '')}`}
                  className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-blue-400 hover:text-white transition-colors"
                >
                  🇬🇧 {CONTACT_PHONES.uk.display}
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400 hover:brightness-110 rounded-lg transition-all inline-flex items-center gap-2 shadow-lg shadow-cyan-950/40 focus:outline-none cursor-pointer"
              >
                <span>Initiate Project Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('statistics')}
                className="px-6 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-all inline-flex items-center gap-2 focus:outline-none cursor-pointer hover:border-slate-700"
              >
                <BarChart3 className="w-4 h-4 text-lime-400" />
                <span>View Performance Telemetry</span>
              </button>
            </div>

            {/* Trust markers with logo color themes */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-400 font-medium">SOC2 & ISO Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs text-slate-400 font-medium">Sub-15ms Latency</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs text-slate-400 font-medium">100% Client IP</span>
              </div>
            </div>
          </div>

          {/* Right Visual Carrier: Single-Elevation Architectural Image with Floating kÅiTøS Logo Badge */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl h-full min-h-[380px] flex flex-col justify-between group">
              <img
                src={heroDatacenterImg}
                alt="kÅiTøS mission-critical enterprise AI and data center infrastructure"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/assets/images/kaitos_hero_datacenter_ai_1791994196980.jpg') {
                    target.src = '/assets/images/kaitos_hero_datacenter_ai_1791994196980.jpg';
                  }
                }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/50 to-transparent" />
              
              {/* Floating Top Logo Badge */}
              <div className="relative z-10 p-5 flex items-center justify-between">
                <div className="p-2.5 px-3.5 rounded-xl bg-white text-slate-900 border border-slate-200 shadow-2xl flex items-center gap-3">
                  <KaitosLogo size={36} variant="icon" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                      OFFICIAL EMBLEM
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <KaitosWordmark size="sm" />
                      <span className="text-xs font-bold text-slate-800">Core Substrate</span>
                    </div>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SLA 99.998%</span>
                </div>
              </div>

              {/* Bottom Specification Details */}
              <div className="relative z-10 p-6 space-y-2">
                <div className="text-xs text-cyan-400 font-mono flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  <span>KÅITØS COMPUTATIONAL SUBSTRATE</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Autonomous Multi-Cluster Mesh
                </h3>
                <p className="text-xs text-slate-300 leading-normal">
                  Continuous bin-packing, eBPF telemetry, and sub-millisecond inter-process communication across 18 availability regions.
                </p>

                {/* Logo Design Anatomy Strip */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-400 border-t border-slate-800/60">
                  <span className="text-cyan-300 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" /> Globe: Anycast Edge
                  </span>
                  <span className="text-red-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500" /> Portal: Kernel
                  </span>
                  <span className="text-blue-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Wave: Telemetry
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" /> Arrow: Growth
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Executive KPI Strip with Localized Savings Metric and Logo Spectrum Accents */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
          {CORE_METRICS.map((metric, idx) => {
            const displayValue = metric.id === 'cost' 
              ? formatMoney(48600000, { compact: true })
              : metric.value;

            // Give each metric a subtle logo color indicator
            const borderColors = [
              'border-l-cyan-400',
              'border-l-lime-400',
              'border-l-emerald-400',
              'border-l-blue-400'
            ];

            return (
              <div 
                key={metric.id} 
                className={`space-y-1 p-3 pl-4 border-l-2 bg-slate-950/40 rounded-r-xl ${borderColors[idx % borderColors.length]}`}
              >
                <div className="text-xs text-slate-400 font-medium">
                  {metric.label}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight flex items-baseline gap-2">
                  <span>{displayValue}</span>
                  <span className="text-xs text-emerald-400 font-sans font-semibold">
                    {metric.delta}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  {metric.period}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
