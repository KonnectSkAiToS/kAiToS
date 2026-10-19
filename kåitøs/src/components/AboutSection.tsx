import React, { useState } from 'react';
import { COMPANY_INFO, CORE_VALUES, TECH_STACK } from '../data/content';
import { ActiveSection } from '../types';
import { useToast } from './Toast';
import { CONTACT_PHONES } from '../context/LocationCurrencyContext';
import { KaitosLogo, KaitosWordmark } from './KaitosLogo';
import { Terminal, Shield, ArrowRight, Code2, Layers, Cpu, Check, Copy, Phone, Activity, Globe, TrendingUp } from 'lucide-react';

interface AboutSectionProps {
  onNavigate: (section: ActiveSection) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const [activeLayer, setActiveLayer] = useState<'K' | 'Ai' | 'IT' | 'OS' | 'S'>('K');

  const layerDetails: Record<'K' | 'Ai' | 'IT' | 'OS' | 'S', {
    letter: string;
    letterColor: string;
    borderColor: string;
    badgeBg: string;
    title: string;
    subtitle: string;
    description: string;
    codeSnippet: string;
    lang: string;
  }> = {
    K: {
      letter: 'K',
      letterColor: 'text-red-500',
      borderColor: 'border-red-500',
      badgeBg: 'bg-red-950 text-red-400 border-red-800',
      title: 'Kernel Computing — Hardware-Level Determinism',
      subtitle: 'Low-Latency Schedulers & Memory Locality',
      description: 'At the kernel boundary, microseconds dictate market viability. We engineer custom low-latency execution loops, bypass standard CPU queue contention, and pin memory allocations directly to NUMA nodes matching dedicated accelerators.',
      codeSnippet: `// kÅiTøS Deterministic Kernel Ring Buffer (Crimson Layer)
struct kaitos_ring_buffer {
    void*  __restrict__ dma_buffer;
    size_t capacity;
    atomic_uint64_t head;
    atomic_uint64_t tail;
};

int kaitos_ring_publish(struct kaitos_ring_buffer* rb, const void* data) {
    // Zero-copy direct memory access execution
    return 0;
}`,
      lang: 'c'
    },
    Ai: {
      letter: 'Ai',
      letterColor: 'text-lime-400',
      borderColor: 'border-lime-400',
      badgeBg: 'bg-lime-950 text-lime-400 border-lime-800',
      title: 'Artificial Intelligence — Neural Inference & Autonomous Agents',
      subtitle: 'Sub-Millisecond Serving & Agentic State Machines',
      description: 'We do not wrap black-box third-party APIs. We design dedicated CUDA/Triton kernels, quantize LLM weights into INT8/FP8 for 3.4x density, and construct deterministic agent state machines with verifiable execution boundaries.',
      codeSnippet: `// kÅiTøS Continuous Batching Kernel Hook (Lime Layer)
__global__ void kaitos_paged_attention_v2(
    const float* __restrict__ q,
    const float* __restrict__ k_cache,
    const float* __restrict__ v_cache,
    float* __restrict__ out,
    const int stride_numa,
    const float softmax_scale
) {
    // Memory coalescence and zero-copy tensor streaming
}`,
      lang: 'cuda'
    },
    IT: {
      letter: 'IT',
      letterColor: 'text-cyan-400',
      borderColor: 'border-cyan-400',
      badgeBg: 'bg-cyan-950 text-cyan-400 border-cyan-800',
      title: 'Information Technology — Mission-Critical Cloud Fabric',
      subtitle: 'Multi-Cloud GitOps, Zero-Trust Meshes & SRE',
      description: 'Enterprise IT is re-engineered as code. Using Terraform and OpenTofu, we provision immutable multi-region Kubernetes clusters with automated WireGuard mTLS, zero single points of failure, and automated FinOps bin-packing.',
      codeSnippet: `# kÅiTøS Multi-Cloud Infrastructure as Code (Cyan Layer)
module "kaitos_zero_trust_mesh" {
  source             = "git::https://github.com/kaitos-technologies/infra.git"
  regions            = ["in-blr-01", "in-hyd-01", "eu-lon-01"]
  sla_tier           = "mission_critical_99_998"
  ebpf_self_healing  = true
  finops_binpacking  = true
}`,
      lang: 'hcl'
    },
    OS: {
      letter: 'øS',
      letterColor: 'text-slate-100',
      borderColor: 'border-slate-300',
      badgeBg: 'bg-slate-800 text-slate-200 border-slate-600',
      title: 'Operating System — Low-Latency Kernel Tuning',
      subtitle: 'Custom eBPF Schedulers & NUMA Memory Pinning',
      description: 'Standard Linux kernel thread schedulers introduce jitter under multimodal inference bursts. We deploy custom eBPF programs into the scheduler fast-path, pinning tensors directly to NUMA memory nodes to eliminate 41% of tail latency.',
      codeSnippet: `// kÅiTøS eBPF Scheduler Fast-Path (Silver Layer)
SEC("sched/sched_switch")
int kaitos_enforce_deterministic_slice(struct trace_event_raw_sched_switch *ctx) {
    u32 pid = ctx->next_pid;
    if (is_kaitos_ai_worker(pid)) {
        bpf_pin_to_numa_node(pid, GPU_DIRECT_PCIE_NODE);
    }
    return 0;
}`,
      lang: 'c'
    },
    S: {
      letter: 'S',
      letterColor: 'bg-gradient-to-r from-cyan-400 to-red-500 bg-clip-text text-transparent',
      borderColor: 'border-cyan-500/80',
      badgeBg: 'bg-slate-900 text-cyan-300 border-cyan-800',
      title: 'Scalable Systems — Global Edge & Enterprise Security',
      subtitle: 'High-Concurrency Event Brokers & Zero-Trust Defense',
      description: 'Distributed ledger pipelines, Kafka event streaming handling over 480k msg/sec, and distributed fault-tolerant microservices that recover in under 3.8 minutes without manual intervention.',
      codeSnippet: `// kÅiTøS High-Throughput Event Broker Ingest (Cobalt Layer)
pub async fn process_enterprise_stream(
    mut stream: EventStream,
    node_cluster: &ClusterTopology
) -> Result<ThroughputReport, EngineError> {
    stream.validate_cryptographic_signature()?;
    node_cluster.replicate_quorum(stream).await
}`,
      lang: 'rust'
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast('Code snippet copied to clipboard', 'success');
  };

  return (
    <section className="py-16 lg:py-24 bg-[#080C14] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-cyan-400 mb-2 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" />
            <span>ORIGIN & ARCHITECTURAL FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 text-balance">
            Rooted in engineering first principles. Built for the autonomous era.
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            <strong className="text-white">kÅiTøS (kaitos.in)</strong> was engineered on an uncompromising premise: modern software can no longer treat enterprise cloud infrastructure and operating system kernels as isolated black boxes. We bridge hardware, cloud meshes, and autonomous intelligence into a unified computational fabric.
          </p>

          {/* Quick Contact Numbers Badge */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Phone className="w-3.5 h-3.5" />
              <span>Direct Hotline:</span>
            </span>
            <a href={`tel:${CONTACT_PHONES.india.number.replace(/\s+/g, '')}`} className="text-red-400 hover:text-white transition-colors">
              🇮🇳 {CONTACT_PHONES.india.display}
            </a>
            <span>·</span>
            <a href={`tel:${CONTACT_PHONES.uk.number.replace(/\s+/g, '')}`} className="text-blue-400 hover:text-white transition-colors">
              🇬🇧 {CONTACT_PHONES.uk.display}
            </a>
          </div>
        </div>

        {/* Brand Emblem & Visual Anatomy Showcase Card */}
        <div className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-slate-200 shadow-xl text-center text-slate-900">
              <KaitosLogo size={110} variant="icon" />
              <div className="mt-4">
                <KaitosWordmark size="xl" />
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-xs font-mono text-slate-800 font-bold">kaitos.in</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="text-[11px] text-slate-500 mt-2 font-medium">
                Official Registered Visual Emblem & Telemetry Signature
              </span>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                SYMBOLIC SYSTEM ARCHITECTURE
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Anatomy of the <span className="text-cyan-400">kÅiTøS</span> Identity
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every geometric facet of the kÅiTøS emblem embodies a vital tenet of deterministic computational engineering:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0 shadow-sm shadow-cyan-400/50" />
                  <div>
                    <strong className="text-white">Celestial Earth Globe:</strong>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Represents 18 global availability regions, multi-cloud anycast edge nodes, and planetary-scale distributed systems.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1 shrink-0 shadow-sm shadow-red-500/50" />
                  <div>
                    <strong className="text-white">Crimson Truss Portal:</strong>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      The Japanese torii / structural truss symbolizes mathematical determinism, unyielding kernel stability, and hardware-level locks.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1 shrink-0 shadow-sm shadow-blue-500/50" />
                  <div>
                    <strong className="text-white">Royal Cobalt Telemetry Wave:</strong>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      A continuous sinusoidal waveform representing real-time telemetry, low-jitter signal processing, and eBPF kernel event streams.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 shrink-0 shadow-sm shadow-emerald-400/50" />
                  <div>
                    <strong className="text-white">Emerald Growth Arrow:</strong>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      The dynamic 45° vector points to compounding enterprise ROI, operational efficiency, and continuous velocity acceleration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Architecture Explorer: K, AI, IT, øS, S with Logo-Matched Color Spectrum */}
        <div className="mb-20 p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono text-cyan-400">THE FIVE ARCHITECTURAL PILLARS OF KÅITØS</div>
              <h3 className="text-2xl font-bold text-white">
                Technical Meaning & Kernel Layers of <span className="text-cyan-400">kÅiTøS</span>
              </h3>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Click any pillar below to inspect its system specification
            </div>
          </div>

          {/* 5 Interactive Layer Selector Cards with Signature Letter Colors */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {(['K', 'Ai', 'IT', 'OS', 'S'] as const).map((key) => {
              const item = layerDetails[key];
              const isSelected = activeLayer === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveLayer(key)}
                  className={`p-4 rounded-xl border text-left transition-all focus:outline-none cursor-pointer ${
                    isSelected
                      ? `${item.borderColor} bg-slate-900 shadow-xl`
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-2xl font-black font-mono ${item.letterColor}`}>
                      {item.letter}
                    </span>
                    {isSelected && (
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${item.badgeBg}`}>
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-white truncate">
                    {item.title.split('—')[0].trim()}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                    {item.subtitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Layer Deep Dive & Live Code Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch p-6 rounded-xl bg-slate-950 border border-slate-800/80">
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs font-mono text-cyan-400 mb-1 flex items-center gap-1.5">
                  <span className={`font-bold ${layerDetails[activeLayer].letterColor}`}>
                    [{layerDetails[activeLayer].letter}]
                  </span>
                  <span>LAYER SPECIFICATION</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {layerDetails[activeLayer].title}
                </h4>
                <div className="text-xs text-slate-400 font-mono mb-4">
                  {layerDetails[activeLayer].subtitle}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {layerDetails[activeLayer].description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-900 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">
                  Runtime: Deterministic / Zero-Lock
                </span>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 focus:outline-none cursor-pointer"
                >
                  <span>Consult on this Layer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="lg:col-span-6 flex flex-col justify-between rounded-lg bg-[#05070D] border border-slate-800 p-4 font-mono text-xs overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>kernel_hook_{activeLayer.toLowerCase()}.{layerDetails[activeLayer].lang}</span>
                </div>
                <button
                  onClick={() => handleCopyCode(layerDetails[activeLayer].codeSnippet)}
                  className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors flex items-center gap-1 text-[10px] cursor-pointer"
                  title="Copy code snippet"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>

              <pre className="p-3 overflow-x-auto text-cyan-300/90 text-xs leading-relaxed my-2 select-all">
                <code>{layerDetails[activeLayer].codeSnippet}</code>
              </pre>

              <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 flex justify-between">
                <span>Memory model: Zero-copy</span>
                <span>Invariants: Formalized</span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Core Values */}
        <div className="mb-20">
          <div className="text-xs font-mono text-cyan-400 mb-2">
            ENGINEERING CONSTITUTION
          </div>
          <h3 className="text-2xl font-bold text-white mb-8">
            The Four Tenets of kÅiTøS Systems
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CORE_VALUES.map((val, idx) => {
              const borderColors = [
                'hover:border-red-500/50',
                'hover:border-lime-500/50',
                'hover:border-blue-500/50',
                'hover:border-emerald-500/50'
              ];
              return (
                <div 
                  key={val.number} 
                  className={`p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3 transition-colors ${borderColors[idx % borderColors.length]}`}
                >
                  <div className="text-xs font-mono font-bold text-cyan-400">
                    {val.number}
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {val.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Tech Stack Matrix */}
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono text-cyan-400 mb-1">
                SYSTEMS ARCHITECTURE MATRIX
              </div>
              <h3 className="text-xl font-bold text-white">
                Battle-Tested Technology Stack
              </h3>
            </div>
            
            {/* Category tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg overflow-x-auto max-w-full">
              {TECH_STACK.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategoryIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap focus:outline-none cursor-pointer ${
                    selectedCategoryIndex === idx
                      ? 'bg-cyan-400 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.category.split(',')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-white">{TECH_STACK[selectedCategoryIndex].category}</span>: {TECH_STACK[selectedCategoryIndex].description}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TECH_STACK[selectedCategoryIndex].technologies.map((tech, tIdx) => (
                <div key={tIdx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white font-mono">{tech.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{tech.role}</div>
                  </div>
                  <div className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-1 rounded border border-cyan-900/30">
                    {tech.proficiency}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA block */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-400 mb-4">
            Looking for an engineering partner that operates with this level of mathematical depth?
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400 hover:brightness-110 rounded-lg transition-all inline-flex items-center gap-2 focus:outline-none cursor-pointer shadow-lg shadow-cyan-950/40"
          >
            <span>Consult with our Principal Systems Architects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
