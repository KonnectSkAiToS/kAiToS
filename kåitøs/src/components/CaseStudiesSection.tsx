import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/content';
import { CaseStudy, ActiveSection } from '../types';
import { ArrowRight, X, ExternalLink } from 'lucide-react';

interface CaseStudiesSectionProps {
  onNavigate: (section: ActiveSection) => void;
  onInquireSimilarProject?: (title: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onNavigate, onInquireSimilarProject }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeCaseModal, setActiveCaseModal] = useState<CaseStudy | null>(null);

  const categories = ['All', 'Enterprise AI', 'FinTech', 'Cloud & SRE', 'Logistics'];

  const filteredProjects = selectedFilter === 'All' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(p => p.category === selectedFilter);

  return (
    <section className="py-16 lg:py-24 bg-[#090D16] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Claim-to-Proof Adjacency */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-cyan-400 mb-2">
              PORTFOLIO & PROVEN RESULTS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 text-balance">
              Engineered architectures with quantified business outcomes.
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              We do not measure success in story points, but in microsecond latency drops, multi-million dollar cloud savings, and unbreakable five-nines availability.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap focus:outline-none ${
                  selectedFilter === cat
                    ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((study) => (
            <div
              key={study.id}
              className="rounded-2xl bg-slate-900/40 border border-slate-800 overflow-hidden hover:border-slate-700 transition-all flex flex-col group"
            >
              {/* Media Container with Zero-Broken-Image Policy */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-950">
                <img
                  src={study.imagePath}
                  alt={study.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Clean unboxed metadata overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                  <div className="text-slate-300 font-mono bg-slate-950/80 px-2.5 py-1 rounded backdrop-blur-md border border-slate-800">
                    {study.category} · {study.timeline}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-cyan-400">
                  {study.clientIndustry}
                </div>
              </div>

              {/* Content Block */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {study.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3">
                    {study.challenge}
                  </p>

                  {/* Quantitative Results Strip */}
                  <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 mb-6">
                    {study.results.map((res, rIdx) => (
                      <div key={rIdx} className="space-y-0.5">
                        <div className="text-lg sm:text-xl font-extrabold text-cyan-400 font-mono tabular-nums">
                          {res.metric}
                        </div>
                        <div className="text-[11px] font-semibold text-slate-200 truncate">
                          {res.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack inline */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 font-mono">
                    {study.techStack.map((tech, tIdx) => (
                      <React.Fragment key={tech}>
                        <span className="text-slate-400">{tech}</span>
                        {tIdx < study.techStack.length - 1 && <span className="text-slate-600">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setActiveCaseModal(study)}
                    className="text-xs font-semibold text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1.5 focus:outline-none"
                  >
                    <span>Read Full Architecture Case</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (onInquireSimilarProject) {
                        onInquireSimilarProject(study.title);
                      }
                      onNavigate('contact');
                    }}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                  >
                    <span>Inquire Similar</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Deep-Dive Modal */}
      {activeCaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setActiveCaseModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <span>{activeCaseModal.clientIndustry}</span>
                <span>·</span>
                <span>{activeCaseModal.timeline}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {activeCaseModal.title}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2">
                  The Enterprise Challenge
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeCaseModal.challenge}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2">
                  The kÅiTøS Architectural Solution
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeCaseModal.solution}
                </p>
              </div>
            </div>

            {/* Detailed Results with Context */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-3">
                Empirical Outcomes & Verified Metrics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {activeCaseModal.results.map((res, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                    <div className="text-2xl font-extrabold text-cyan-400 font-mono tabular-nums">
                      {res.metric}
                    </div>
                    <div className="text-xs font-bold text-white mt-1">
                      {res.value}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-tight">
                      {res.context}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Stack */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2">
                Deployment Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeCaseModal.techStack.map(t => (
                  <span key={t} className="px-2.5 py-1 text-xs font-mono bg-slate-950 text-slate-300 rounded border border-slate-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Interested in replicating these latency and cost figures?
              </span>
              <button
                onClick={() => {
                  const title = activeCaseModal.title;
                  setActiveCaseModal(null);
                  if (onInquireSimilarProject) onInquireSimilarProject(title);
                  onNavigate('contact');
                }}
                className="px-5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
              >
                Inquire For Similar Engagement
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
