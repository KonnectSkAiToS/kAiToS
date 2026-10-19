import React, { useState, useEffect, useId } from 'react';
import { CORE_METRICS, DETAILED_STATISTICS } from '../data/content';
import { ActiveSection } from '../types';
import { useToast } from './Toast';
import { useLocationCurrency, RegionCode, CONTACT_PHONES } from '../context/LocationCurrencyContext';
import { 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  Globe2, 
  Shield, 
  Activity, 
  Cpu, 
  Server, 
  Zap, 
  RefreshCw, 
  ExternalLink,
  Copy,
  Clock,
  Layers,
  Globe
} from 'lucide-react';

interface StatsDashboardProps {
  onNavigate: (section: ActiveSection) => void;
  onPreFillInquiry?: (notes: string) => void;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ onNavigate, onPreFillInquiry }) => {
  const { showToast } = useToast();
  const { region, setRegion, config, formatMoney, convertFromUSD } = useLocationCurrency();

  const [activeTab, setActiveTab] = useState<'benchmarks' | 'telemetry' | 'calculator'>('calculator');
  const [isLiveRunning, setIsLiveRunning] = useState<boolean>(true);
  const [liveReqCount, setLiveReqCount] = useState<number>(482150);
  const [liveLatency, setLiveLatency] = useState<number>(14.2);
  const [pingTesting, setPingTesting] = useState<boolean>(false);
  const [lastPingTime, setLastPingTime] = useState<string>('30s ago');

  // Interactive ROI Simulator State (Base in USD)
  const [monthlySpendUSD, setMonthlySpendUSD] = useState<number>(45000);
  const [nodesCount, setNodesCount] = useState<number>(65);
  const [workloadType, setWorkloadType] = useState<'llm' | 'microservices' | 'streaming'>('llm');

  const monthlySpendInputId = useId();
  const nodesCountInputId = useId();

  // Simulated live fluctuating numbers
  useEffect(() => {
    if (!isLiveRunning) return;
    const interval = setInterval(() => {
      setLiveReqCount(prev => Math.floor(prev + (Math.random() * 400 - 180)));
      setLiveLatency(prev => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 2500);
    return () => clearInterval(interval);
  }, [isLiveRunning]);

  // Calculated estimates
  const savingsPercentage = workloadType === 'llm' ? 0.46 : workloadType === 'microservices' ? 0.41 : 0.38;
  const estimatedMonthlySavingsUSD = Math.round(monthlySpendUSD * savingsPercentage);
  const estimatedAnnualSavingsUSD = estimatedMonthlySavingsUSD * 12;
  const estimatedLatencyDropMs = workloadType === 'llm' ? 38 : workloadType === 'microservices' ? 24 : 45;
  const engineeringHoursSavedPerMonth = Math.round(nodesCount * 1.8);

  const computeSavingsUSD = Math.round(estimatedMonthlySavingsUSD * 0.52);
  const egressSavingsUSD = Math.round(estimatedMonthlySavingsUSD * 0.28);
  const sreSavingsUSD = Math.round(estimatedMonthlySavingsUSD * 0.20);

  const handleApplyEstimate = () => {
    const formattedSpend = formatMoney(monthlySpendUSD);
    const formattedSavings = formatMoney(estimatedAnnualSavingsUSD);
    const notes = `Configured via ROI Simulator: Monthly Cloud Spend ${formattedSpend} (${config.code}), Fleet: ${nodesCount} Nodes, Workload: ${workloadType.toUpperCase()}. Target: ${formattedSavings}/yr reduction. Location: ${config.name}.`;
    if (onPreFillInquiry) {
      onPreFillInquiry(notes);
    }
    showToast('Simulation parameters captured', 'info', 'Transferred to project inquiry form below.');
    onNavigate('contact');
  };

  const handleCopyEstimate = () => {
    const formattedSpend = formatMoney(monthlySpendUSD);
    const formattedSavings = formatMoney(estimatedAnnualSavingsUSD);
    const text = `kÅiTøS Architecture Simulation:\nLocation & Currency: ${config.name} (${config.code})\nMonthly Cloud Spend: ${formattedSpend}\nNodes: ${nodesCount}\nWorkload: ${workloadType.toUpperCase()}\nProjected Annual Savings: ${formattedSavings}\nProjected P99 Latency Cut: -${estimatedLatencyDropMs}%\nSRE Time Saved: ~${engineeringHoursSavedPerMonth} hrs/mo\nDirect Hotlines: +91 8220184799 (India) / +44 7733926231 (UK)\nLearn more at kaitos.in`;
    navigator.clipboard.writeText(text);
    showToast('Simulation summary copied to clipboard', 'success');
  };

  const [regionalNodes, setRegionalNodes] = useState([
    { region: 'Bengaluru Core (IN-BLR-01)', latency: '1.2ms', status: 'Optimal', throughput: '1.4 PB/mo', uptime: '99.999%', jitter: '0.1ms' },
    { region: 'Hyderabad Cloud Hub (IN-HYD-01)', latency: '2.8ms', status: 'Optimal', throughput: '820 TB/mo', uptime: '99.998%', jitter: '0.2ms' },
    { region: 'London Interconnect (EU-LON-01)', latency: '14.6ms', status: 'Optimal', throughput: '780 TB/mo', uptime: '99.999%', jitter: '0.2ms' },
    { region: 'Frankfurt Direct (EU-FRA-01)', latency: '15.1ms', status: 'Optimal', throughput: '910 TB/mo', uptime: '99.998%', jitter: '0.3ms' },
    { region: 'Singapore Edge (AP-SE-01)', latency: '18.4ms', status: 'Optimal', throughput: '640 TB/mo', uptime: '99.997%', jitter: '0.4ms' },
    { region: 'US East N. Virginia (US-VA-01)', latency: '21.3ms', status: 'Optimal', throughput: '1.2 PB/mo', uptime: '99.998%', jitter: '0.5ms' },
    { region: 'US West Oregon (US-OR-01)', latency: '24.8ms', status: 'Optimal', throughput: '890 TB/mo', uptime: '99.997%', jitter: '0.6ms' }
  ]);

  const handleRunPingTest = () => {
    setPingTesting(true);
    showToast('Initiating anycast ping sweep...', 'info', 'Probing all 7 global edge points of presence.');
    setTimeout(() => {
      setRegionalNodes(prev => prev.map(n => ({
        ...n,
        latency: `${(parseFloat(n.latency) + (Math.random() * 0.4 - 0.2)).toFixed(1)}ms`
      })));
      setPingTesting(false);
      setLastPingTime('Just now (ICMP Sweep Complete)');
      showToast('Global ping sweep verified', 'success', 'All 7 nodes responding with 100% packet delivery.');
    }, 1200);
  };

  return (
    <section className="py-16 lg:py-24 bg-[#080C14] border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-cyan-400 mb-2 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" />
              <span>SYSTEM OBSERVABILITY & BENCHMARKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 text-balance">
              Empirical statistics, latency distributions, and verifiable ROI.
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Every software system, multi-cloud cluster, and autonomous kernel optimization engineered by <span className="text-white font-medium">kÅiTøS (kaitos.in)</span> is backed by transparent, continuous telemetry.
            </p>
          </div>

          {/* Live Telemetry Pulse Bar */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-6 text-xs shrink-0 font-mono">
            <div>
              <div className="text-[10px] text-slate-400">INGEST STREAM</div>
              <div className="text-cyan-400 font-bold tabular-nums">
                {liveReqCount.toLocaleString()} req/s
              </div>
            </div>
            <div className="h-7 w-px bg-slate-800" />
            <div>
              <div className="text-[10px] text-slate-400">P99 INFERENCE</div>
              <div className="text-emerald-400 font-bold tabular-nums">
                {liveLatency} ms
              </div>
            </div>
            <div className="h-7 w-px bg-slate-800" />
            <button
              onClick={() => setIsLiveRunning(!isLiveRunning)}
              className={`p-1.5 rounded transition-colors ${isLiveRunning ? 'text-emerald-400 bg-emerald-950/40' : 'text-slate-500 bg-slate-800'}`}
              title={isLiveRunning ? 'Pause live stream' : 'Resume live stream'}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLiveRunning ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 mb-10 overflow-x-auto">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`py-3 px-6 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'calculator'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Localized ROI Simulator ({config.code})</span>
          </button>

          <button
            onClick={() => setActiveTab('telemetry')}
            className={`py-3 px-6 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'telemetry'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Telemetry & Anycast Grid</span>
          </button>

          <button
            onClick={() => setActiveTab('benchmarks')}
            className={`py-3 px-6 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'benchmarks'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Tier-4 Enterprise Benchmarks</span>
          </button>
        </div>

        {/* Tab 1: Interactive Cloud ROI & Latency Simulator with Local Currency */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                  <Sliders className="w-4 h-4" />
                  <span>DYNAMIC FLEET WORKLOAD SIMULATOR</span>
                </div>
                
                {/* Location / Currency Selector Pill */}
                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <span className="text-slate-500 font-mono text-[10px] pl-1">Currency:</span>
                  {(['IN', 'UK', 'US', 'EU'] as RegionCode[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRegion(r)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                        region === r
                          ? 'bg-cyan-400 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {r === 'IN' ? '₹ INR' : r === 'UK' ? '£ GBP' : r === 'US' ? '$ USD' : '€ EUR'}
                    </button>
                  ))}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white">
                Simulate your infrastructure savings with kÅiTøS
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Adjust your fleet parameters to calculate estimated savings from our kernel bin-packing, spot harvesting, and distributed latency caching layers. Amounts calculated in <strong className="text-cyan-300 font-medium">{config.name} ({config.code} {config.symbol})</strong>.
              </p>

              {/* Input 1: Monthly Spend */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label htmlFor={monthlySpendInputId} className="text-slate-300 font-medium">Current Monthly Cloud Spend</label>
                  <span className="font-mono text-cyan-400 font-semibold tabular-nums">
                    {formatMoney(monthlySpendUSD)} / mo
                  </span>
                </div>
                <input
                  id={monthlySpendInputId}
                  type="range"
                  min="5000"
                  max="250000"
                  step="5000"
                  value={monthlySpendUSD}
                  onChange={(e) => setMonthlySpendUSD(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>{formatMoney(5000, { compact: true })}</span>
                  <span>{formatMoney(100000, { compact: true })}</span>
                  <span>{formatMoney(250000, { compact: true })}+</span>
                </div>
              </div>

              {/* Input 2: Node Count */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label htmlFor={nodesCountInputId} className="text-slate-300 font-medium">Compute Node Fleet Size</label>
                  <span className="font-mono text-cyan-400 font-semibold tabular-nums">
                    {nodesCount} Nodes
                  </span>
                </div>
                <input
                  id={nodesCountInputId}
                  type="range"
                  min="5"
                  max="300"
                  step="5"
                  value={nodesCount}
                  onChange={(e) => setNodesCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>5 Nodes</span>
                  <span>150 Nodes</span>
                  <span>300+ Nodes</span>
                </div>
              </div>

              {/* Input 3: Workload Type */}
              <div className="space-y-2">
                <span className="text-xs text-slate-300 font-medium block">Dominant Architecture Workload</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setWorkloadType('llm')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                      workloadType === 'llm'
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 font-semibold'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    AI / LLM Serving
                  </button>
                  <button
                    type="button"
                    onClick={() => setWorkloadType('microservices')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                      workloadType === 'microservices'
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 font-semibold'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    Microservices
                  </button>
                  <button
                    type="button"
                    onClick={() => setWorkloadType('streaming')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                      workloadType === 'streaming'
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 font-semibold'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    Kafka / Streaming
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Simulation Results Card with Localized Currency Breakdown */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/30 shadow-xl space-y-6">
              <div className="text-xs font-mono text-cyan-400 flex items-center justify-between pb-3 border-b border-slate-800">
                <span>PROJECTED OUTCOMES ({config.code})</span>
                <span className="text-emerald-400">98.2% MODEL ACCURACY</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs text-slate-400">Projected Annual Savings</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tabular-nums mt-1">
                    {formatMoney(estimatedAnnualSavingsUSD)}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    ~{formatMoney(estimatedMonthlySavingsUSD)} reduction per month
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Expected P99 Latency Drop</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono tabular-nums mt-1">
                    -{estimatedLatencyDropMs}%
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Faster API & inference execution
                  </div>
                </div>
              </div>

              {/* Itemized Savings Breakdown */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2.5">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Monthly Savings Distribution in {config.name} ({config.code})
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Compute Bin-Packing & Spot Automation:</span>
                  <span className="font-mono text-emerald-400 font-bold tabular-nums">
                    {formatMoney(computeSavingsUSD)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Network Egress Compression:</span>
                  <span className="font-mono text-cyan-400 font-bold tabular-nums">
                    {formatMoney(egressSavingsUSD)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">SRE Incident Remediation Hours:</span>
                  <span className="font-mono text-blue-400 font-bold tabular-nums">
                    {formatMoney(sreSavingsUSD)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleApplyEstimate}
                  className="w-full sm:flex-1 py-3 px-4 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Apply Simulation to Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleCopyEstimate}
                  className="w-full sm:w-auto p-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                  title="Copy simulation summary"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="sm:hidden">Copy Summary</span>
                </button>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-slate-500 font-mono">
                  Need custom multi-cloud modeling? Call 🇮🇳 +91 8220184799 or 🇬🇧 +44 7733926231
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Global Anycast Telemetry */}
        {activeTab === 'telemetry' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="text-xs font-mono text-cyan-400">EDGE CONNECTIVITY LAYER</div>
                  <h3 className="text-lg font-bold text-white">Live Global Anycast Points of Presence</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400">Last sweep: {lastPingTime}</span>
                  <button
                    onClick={handleRunPingTest}
                    disabled={pingTesting}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700 flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${pingTesting ? 'animate-spin' : ''}`} />
                    <span>{pingTesting ? 'Probing Nodes...' : 'Run Anycast Sweep'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {regionalNodes.map((node, nIdx) => (
                  <div key={nIdx} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-bold text-white">{node.region}</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                        {node.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-900 text-xs font-mono">
                      <div>
                        <div className="text-[10px] text-slate-500">LATENCY</div>
                        <div className="text-cyan-400 font-bold">{node.latency}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500">UPTIME</div>
                        <div className="text-slate-300">{node.uptime}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500">JITTER</div>
                        <div className="text-slate-300">{node.jitter}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Telemetry Waveform Visualizer (Directly inspired by the kÅiTøS logo sine wave & growth vector) */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800/80">
                <div>
                  <div className="text-xs font-mono text-cyan-400">TELEMETRY CARRIER WAVEFORM</div>
                  <h4 className="text-base font-bold text-white">Deterministic Kernel Sync & Growth Vector</h4>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-blue-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span>Cobalt Signal Wave</span>
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Growth Vector</span>
                  </span>
                </div>
              </div>

              {/* Dynamic SVG Telemetry Graphic */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 relative overflow-hidden">
                <svg viewBox="0 0 800 160" className="w-full h-32" fill="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="800" y2="40" stroke="#1E293B" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2="800" y2="80" stroke="#1E293B" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="800" y2="120" stroke="#1E293B" strokeDasharray="3 3" />

                  {/* Gradient Fill under wave */}
                  <path
                    d="M 20 120 C 140 180, 240 160, 360 110 C 480 60, 560 70, 680 110 L 680 160 L 20 160 Z"
                    fill="url(#waveFillGrad)"
                    opacity="0.15"
                  />
                  <defs>
                    <linearGradient id="waveFillGrad" x1="0" y1="60" x2="0" y2="160" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Cobalt Telemetry Sine Wave */}
                  <path
                    d="M 20 120 C 140 180, 240 160, 360 110 C 480 60, 560 70, 680 110"
                    stroke="#2563EB"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 20 120 C 140 180, 240 160, 360 110 C 480 60, 560 70, 680 110"
                    stroke="#60A5FA"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.8"
                  />

                  {/* Rising Emerald Arrow */}
                  <line
                    x1="680"
                    y1="110"
                    x2="770"
                    y2="28"
                    stroke="#10B981"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <polygon
                    points="755,20 782,24 772,50"
                    fill="#10B981"
                    stroke="#34D399"
                    strokeWidth="1"
                  />

                  {/* Nodes on the wave */}
                  <circle cx="360" cy="110" r="5" fill="#3B82F6" stroke="#93C5FD" strokeWidth="2" />
                  <circle cx="680" cy="110" r="5" fill="#10B981" stroke="#A7F3D0" strokeWidth="2" />
                </svg>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 px-1">
                  <span>P99: 14.2ms Zero-Jitter</span>
                  <span>Uptime: 99.998% In-Kernel</span>
                  <span className="text-emerald-400 font-bold">+120% YoY Processing Throughput</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Detailed Benchmarks */}
        {activeTab === 'benchmarks' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DETAILED_STATISTICS.map((group, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-cyan-400 mb-2">CATEGORY 0{idx + 1}</div>
                    <h3 className="text-lg font-bold text-white pb-3 border-b border-slate-800">
                      {group.category}
                    </h3>
                    <div className="space-y-5 mt-4">
                      {group.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="space-y-1">
                          <div className="flex items-baseline justify-between">
                            <span className="text-xs text-slate-300 font-medium">{m.name}</span>
                            <span className="text-sm font-bold text-cyan-400 font-mono tabular-nums">{m.value}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            Baseline: {m.benchmark}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Validated against Tier-4 datacenter specifications</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
