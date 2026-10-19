import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/content';
import { ActiveSection } from '../types';
import { useToast } from './Toast';
import { useLocationCurrency, CONTACT_PHONES } from '../context/LocationCurrencyContext';
import { KaitosLogo } from './KaitosLogo';
import { Mail, CheckCircle2, ArrowRight, Copy, Phone, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: ActiveSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const { config, region, setRegion } = useLocationCurrency();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscriptionTopic, setSubscriptionTopic] = useState<'all' | 'kernel' | 'finops'>('all');
  const [emailError, setEmailError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@') || !newsletterEmail.includes('.')) {
      setEmailError('Please provide a valid corporate email address.');
      return;
    }
    setEmailError('');
    setSubscribed(true);
    showToast('Subscribed to kÅiTøS Systems Quarterly', 'success', `Confirmation sent to ${newsletterEmail}`);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${text}`, 'success', `${label} copied to clipboard.`);
  };

  return (
    <footer className="bg-[#060910] border-t border-slate-800 text-slate-400">
      {/* Newsletter Subscription Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <div className="text-xs font-mono text-cyan-400">
              ENGINEERING DISPATCHES
            </div>
            <h3 className="text-xl font-bold text-white">
              Subscribe to the kÅiTøS Systems Quarterly
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              In-depth research on Linux eBPF kernel hooks, multi-cloud FinOps reduction tactics, and autonomous AI operating agent architectures. No marketing spam.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <div>
                  <div className="font-semibold text-white">Subscription Active</div>
                  <div>You have been registered for our technical releases at <span className="font-mono text-emerald-300">{newsletterEmail}</span>.</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter corporate email (e.g. alex@enterprise.com)"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5 focus:outline-none cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="topic"
                        checked={subscriptionTopic === 'all'}
                        onChange={() => setSubscriptionTopic('all')}
                        className="accent-cyan-400"
                      />
                      <span>All Dispatches</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="topic"
                        checked={subscriptionTopic === 'kernel'}
                        onChange={() => setSubscriptionTopic('kernel')}
                        className="accent-cyan-400"
                      />
                      <span>Kernel & AI</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="topic"
                        checked={subscriptionTopic === 'finops'}
                        onChange={() => setSubscriptionTopic('finops')}
                        className="accent-cyan-400"
                      />
                      <span>Cloud & FinOps</span>
                    </label>
                  </div>
                  <span>Published quarterly · One-click opt-out</span>
                </div>

                {emailError && (
                  <div className="text-[11px] text-rose-400">{emailError}</div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Etymology Column */}
          <div className="lg:col-span-2 space-y-4">
            <button 
              onClick={() => onNavigate('home')} 
              className="text-left focus:outline-none cursor-pointer"
            >
              <KaitosLogo size={44} variant="full" />
            </button>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {COMPANY_INFO.legalName}. Engineered for deterministic computing across Kernel Systems, Artificial Intelligence, Information Technology, Operating Systems, and Scalable Infrastructure.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 text-[11px] font-mono text-slate-400">
              <span><strong>K</strong>: Kernel Systems</span>
              <span>·</span>
              <span><strong>Ai</strong>: Artificial Intelligence</span>
              <span>·</span>
              <span><strong>IT</strong>: Information Technology</span>
              <span>·</span>
              <span><strong>øS</strong>: Operating System</span>
              <span>·</span>
              <span><strong>S</strong>: Scalable Infrastructure</span>
            </div>

            {/* Direct Phone Lines Callout */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5 text-xs font-mono">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Phone className="w-3 h-3 text-cyan-400" />
                <span>Verified Direct Engineering Hotlines</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-slate-300">
                <a href={`tel:${CONTACT_PHONES.india.number.replace(/\s+/g, '')}`} className="hover:text-cyan-400 transition-colors">
                  🇮🇳 {CONTACT_PHONES.india.display}
                </a>
                <span className="text-slate-700">|</span>
                <a href={`tel:${CONTACT_PHONES.uk.number.replace(/\s+/g, '')}`} className="hover:text-cyan-400 transition-colors">
                  🇬🇧 {CONTACT_PHONES.uk.display}
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 flex flex-wrap gap-2">
              {COMPANY_INFO.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-800 transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home (Overview)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  About & Architecture
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Engineering Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('statistics')} className="hover:text-white transition-colors cursor-pointer">
                  Statistics & Telemetry
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-white transition-colors cursor-pointer">
                  Case Studies / Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors cursor-pointer">
                  Technical Blog & Updates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact & Hotlines
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Engineering Practices
            </h4>
            <ul className="space-y-2 text-xs">
              <li>Software Engineering (Rust / Go)</li>
              <li>Cloud & DevOps (Multi-Cloud EKS)</li>
              <li>Strategic IT & AI Consulting</li>
              <li>Managed IT & 24/7 SRE</li>
              <li>Autonomous Kernel Schedulers</li>
              <li>Zero-Trust Network Meshes</li>
            </ul>
          </div>

          {/* Direct Contact Channels */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Official Email Index
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li className="flex items-center justify-between group">
                <a href="mailto:info@kaitos.in" className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-slate-500" />
                  <span>info@kaitos.in</span>
                </a>
                <button
                  onClick={() => handleCopyText('info@kaitos.in', 'General info email')}
                  title="Copy email"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </li>
              <span className="text-[10px] text-slate-500 font-sans block -mt-1">General queries & press</span>

              <li className="pt-2 flex items-center justify-between group">
                <a href="mailto:contact@kaitos.in" className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-slate-500" />
                  <span>contact@kaitos.in</span>
                </a>
                <button
                  onClick={() => handleCopyText('contact@kaitos.in', 'Client engagements email')}
                  title="Copy email"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </li>
              <span className="text-[10px] text-slate-500 font-sans block -mt-1">New client engagements</span>

              <li className="pt-2 flex items-center justify-between group">
                <a href="mailto:support@kaitos.in" className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-slate-500" />
                  <span>support@kaitos.in</span>
                </a>
                <button
                  onClick={() => handleCopyText('support@kaitos.in', 'Production support email')}
                  title="Copy email"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </li>
              <span className="text-[10px] text-slate-500 font-sans block -mt-1">24/7 Production SRE & SLA</span>

              <li className="pt-2 flex items-center justify-between group">
                <a href="mailto:careers@kaitos.in" className="text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-slate-500" />
                  <span>careers@kaitos.in</span>
                </a>
                <button
                  onClick={() => handleCopyText('careers@kaitos.in', 'Careers email')}
                  title="Copy email"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </li>
              <span className="text-[10px] text-slate-500 font-sans block -mt-1">Engineering job opportunities</span>
            </ul>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 kÅiTøS Technologies Private Limited. Official domain: <span className="font-mono text-slate-400">kaitos.in</span>.
          </div>
          <div className="flex items-center gap-6">
            <span>Location: {config.flag} {config.name} ({config.code})</span>
            <span>·</span>
            <span>Security & Compliance</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>SLA Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
