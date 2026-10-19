import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/content';
import { useToast } from './Toast';
import { useLocationCurrency, CONTACT_PHONES } from '../context/LocationCurrencyContext';
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  Phone, 
  AlertCircle, 
  Copy, 
  Calendar,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Globe
} from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
  initialNotes?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService, initialNotes }) => {
  const { showToast } = useToast();
  const { region, config, formatMoney } = useLocationCurrency();

  const getInitialBudget = () => {
    switch (region) {
      case 'IN': return '₹20L - ₹50 Lakhs';
      case 'UK': return '£20,000 - £40,000';
      case 'EU': return '€25,000 - €50,000';
      default: return '$25,000 - $50,000';
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: initialService || 'Software Engineering',
    budget: getInitialBudget(),
    timeline: '1-3 Months',
    message: initialNotes || ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [careersModalOpen, setCareersModalOpen] = useState(false);
  const [schedulerModalOpen, setSchedulerModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string>('Tomorrow, 14:00 IST / 09:30 GMT');

  // Sync prop changes into form if updated from simulator or service cards
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
    if (initialNotes) {
      setFormData(prev => ({ ...prev, message: initialNotes }));
    }
  }, [initialService, initialNotes]);

  // Update budget default when region changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, budget: getInitialBudget() }));
  }, [region]);

  // Real-time world clocks for offices
  const [currentTimes, setCurrentTimes] = useState({
    ist: '',
    gmt: '',
    isIstOpen: true,
    isGmtOpen: true
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const istHours = parseInt(now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', hour12: false }), 10);
      const gmtHours = parseInt(now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', hour12: false }), 10);
      
      setCurrentTimes({
        ist: now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        gmt: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        isIstOpen: istHours >= 9 && istHours < 20,
        isGmtOpen: gmtHours >= 8 && gmtHours < 19
      });
    };
    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (email: string, department: string) => {
    navigator.clipboard.writeText(email);
    showToast(`Copied ${email}`, 'success', `Direct address for ${department} inquiries.`);
  };

  const handleCopyPhone = (number: string, label: string) => {
    navigator.clipboard.writeText(number);
    showToast(`Phone copied: ${number}`, 'success', `${label} line copied to clipboard.`);
  };

  const handleCopyTrackingId = (id: string) => {
    navigator.clipboard.writeText(id);
    showToast(`Tracking ID copied: ${id}`, 'info', 'Use this in our chatbot to check inquiry status anytime.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and project scope details.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMessage('Please provide a valid corporate email address.');
      return;
    }

    setErrorMessage('');
    const randomId = `KTS-${Math.floor(1000 + Math.random() * 9000)}-INQ`;
    setTrackingId(randomId);
    setFormSubmitted(true);
    showToast('Inquiry logged successfully!', 'success', `Tracking reference ${randomId} generated.`);
  };

  const handleBookConsultation = () => {
    setSchedulerModalOpen(false);
    showToast('Briefing reserved', 'success', `Your 30-min systems consultation is booked for ${selectedSlot}.`);
  };

  const handleResetForm = () => {
    setFormSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      service: 'Software Engineering',
      budget: getInitialBudget(),
      timeline: '1-3 Months',
      message: ''
    });
  };

  const budgetOptions: Record<string, string[]> = {
    IN: ['< ₹20 Lakhs', '₹20L - ₹50 Lakhs', '₹50L - ₹1.5 Crores', '₹1.5 Crores+'],
    UK: ['< £20,000', '£20,000 - £40,000', '£40,000 - £120,000', '£120,000+'],
    EU: ['< €25,000', '€25,000 - €50,000', '€50,000 - €150,000', '€150,000+'],
    US: ['< $25,000', '$25,000 - $50,000', '$50,000 - $150,000', '$150,000+']
  };

  return (
    <section className="py-16 lg:py-24 bg-[#080C14] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-mono text-cyan-400 mb-2 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              <span>DIRECT CHANNELS & PROPOSALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 text-balance">
              Direct communication with senior systems architects.
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              No sales intermediaries, no call centers. Every inquiry at <span className="text-white font-medium">kÅiTøS (kaitos.in)</span> is triaged directly by our principal systems architects and engineering leads within 24 business hours.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setSchedulerModalOpen(true)}
              className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Book 30-Min Architecture Briefing</span>
            </button>
          </div>
        </div>

        {/* Featured Contact Phone Hotlines Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {/* India Contact Hotline */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                  <span>🇮🇳</span>
                  <span>INDIA & ASIA-PACIFIC DESK</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/20">
                  IST {currentTimes.ist} ({currentTimes.isIstOpen ? 'Active' : 'Night Ops'})
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight my-1">
                {CONTACT_PHONES.india.display}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Primary engineering hotline for software architecture, client scoping, and enterprise inquiries across India.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
              <a
                href={`tel:${CONTACT_PHONES.india.number.replace(/\s+/g, '')}`}
                className="px-3.5 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call India Line</span>
              </a>

              <a
                href={`https://wa.me/${CONTACT_PHONES.india.cleanNumber}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Message</span>
              </a>

              <button
                type="button"
                onClick={() => handleCopyPhone(CONTACT_PHONES.india.number, 'India')}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors ml-auto cursor-pointer"
                title="Copy phone number"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* UK & Europe Contact Hotline */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                  <span>🇬🇧</span>
                  <span>UK & EUROPEAN DESK</span>
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/20">
                  GMT {currentTimes.gmt} ({currentTimes.isGmtOpen ? 'Active' : 'Night Ops'})
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight my-1">
                {CONTACT_PHONES.uk.display}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                London and international client delivery node for multi-cloud migrations, FinOps, and distributed computing.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
              <a
                href={`tel:${CONTACT_PHONES.uk.number.replace(/\s+/g, '')}`}
                className="px-3.5 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call UK Line</span>
              </a>

              <a
                href={`https://wa.me/${CONTACT_PHONES.uk.cleanNumber}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Message</span>
              </a>

              <button
                type="button"
                onClick={() => handleCopyPhone(CONTACT_PHONES.uk.number, 'UK')}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors ml-auto cursor-pointer"
                title="Copy phone number"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Dedicated Direct Email Channels with 1-Click Copy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            {
              email: 'info@kaitos.in',
              role: 'General Inquiries',
              desc: 'General queries, press, and technical architectural publications.',
              dept: 'General'
            },
            {
              email: 'contact@kaitos.in',
              role: 'New Client Engagements',
              desc: 'Custom proposals, discovery sprints, and enterprise architecture SOWs.',
              dept: 'Client Engagements'
            },
            {
              email: 'support@kaitos.in',
              role: '24/7 SRE & Incident SLA',
              desc: 'Active production support and guaranteed sub-10 min P1 triage.',
              dept: 'Operations & SRE'
            },
            {
              email: 'careers@kaitos.in',
              role: 'Engineering Careers',
              desc: 'Rust, CUDA/Triton, eBPF, and distributed cloud engineering roles.',
              dept: 'Careers'
            }
          ].map((item) => (
            <div 
              key={item.email}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>{item.role}</span>
                  <button
                    onClick={() => handleCopyEmail(item.email, item.dept)}
                    title={`Copy ${item.email}`}
                    className="p-1 hover:text-cyan-400 transition-colors text-slate-500 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-sm font-bold text-white mb-2 font-mono">
                  {item.email}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <a
                  href={`mailto:${item.email}`}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 focus:outline-none"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Mail</span>
                </a>

                {item.email === 'careers@kaitos.in' && (
                  <button
                    type="button"
                    onClick={() => setCareersModalOpen(true)}
                    className="text-[11px] font-mono text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    View Roles
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 2-Column Section: Inquiry Form on Left, Office Locations & Clocks on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Inquiry Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="mb-6 pb-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Project Inquiry & Discovery Form</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Share your requirements to receive a technical scoping response within 24 business hours.
                </p>
              </div>
              <div className="text-xs font-mono text-cyan-400 hidden sm:block">
                {config.flag} {config.code}
              </div>
            </div>

            {formSubmitted ? (
              <div className="py-10 text-center space-y-4 animate-in fade-in duration-200">
                <div className="w-12 h-12 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">Inquiry Transmitted Successfully</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your project proposal has been queued directly with our systems architects.
                </p>
                
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-400 max-w-xs mx-auto flex items-center justify-between">
                  <span>Tracking ID: {trackingId}</span>
                  <button
                    onClick={() => handleCopyTrackingId(trackingId)}
                    title="Copy tracking ID"
                    className="p-1 hover:text-white transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-[11px] text-slate-500">
                  A receipt has been recorded for {formData.email}. You can also paste this ticket ID into our interactive Chatbot at the bottom right.
                </p>

                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={handleResetForm}
                    className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Company / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Acme FinTech"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Phone / WhatsApp (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+91 or +44 international"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Service Focus</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                    >
                      <option value="Software Engineering">Software Engineering</option>
                      <option value="Cloud & DevOps">Cloud & DevOps</option>
                      <option value="Strategic Consulting">Strategic Consulting</option>
                      <option value="Managed IT">Managed IT & SRE</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Budget Range ({config.code})
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                    >
                      {(budgetOptions[region] || budgetOptions['US']).map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Target Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                    >
                      <option value="Immediate (<3 weeks)">Immediate (&lt;3 weeks)</option>
                      <option value="1-3 Months">1-3 Months</option>
                      <option value="3-6 Months">3-6 Months</option>
                      <option value="Long-term Advisory">Long-term Advisory</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Project Overview & Technical Constraints *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe your current architecture, target scale, performance bottlenecks, or objectives..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm focus:outline-none cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Project Inquiry to Architects</span>
                </button>
              </form>
            )}
          </div>

          {/* Office Locations & Live Time Clocks */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white">Global Presence</h3>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>24/7 Operations</span>
                </div>
              </div>

              <div className="space-y-6">
                {COMPANY_INFO.offices.map((office) => (
                  <div key={office.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-mono text-cyan-400">{office.type}</div>
                        <h4 className="text-sm font-bold text-white">{office.name}</h4>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                        {office.utcOffset}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{office.address}, {office.city}, {office.country}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-900 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                      <a 
                        href={`tel:${office.phone.replace(/\s+/g, '')}`} 
                        className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                      >
                        <Phone className="w-3 h-3 text-cyan-400" />
                        <span>{office.phone}</span>
                      </a>
                      <span>{office.activeHours}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Careers Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/20 to-slate-900 border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">Join the kÅiTøS Engineering Core</h4>
                <p className="text-xs text-slate-400 mt-1">
                  We are looking for Rust systems engineers, CUDA optimization specialists, and SRE leads.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCareersModalOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                View Roles
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 30-Minute Architecture Consultation Scheduler Modal */}
      {schedulerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">30-Min Architecture Briefing</h3>
              </div>
              <button
                onClick={() => setSchedulerModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Reserve an engineering consultation with our systems architects. We will conduct an initial architectural audit of your workload, bottleneck vectors, and ROI projections.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Select Consultation Window
              </label>
              <div className="space-y-2">
                {[
                  'Tomorrow, 14:00 IST / 09:30 GMT',
                  'Thursday, 16:30 IST / 12:00 GMT',
                  'Friday, 11:00 IST / 06:30 GMT',
                  'Next Monday, 15:00 IST / 10:30 GMT'
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`w-full p-3 rounded-lg text-xs font-mono text-left border transition-colors flex items-center justify-between cursor-pointer ${
                      selectedSlot === slot
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 font-semibold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{slot}</span>
                    {selectedSlot === slot && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 space-y-1 font-mono">
              <div>• Direct hotline: 🇮🇳 +91 8220184799 | 🇬🇧 +44 7733926231</div>
              <div>• NDA: Automatically secured under mutual confidentiality</div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSchedulerModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBookConsultation}
                className="px-5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
              >
                Confirm Reservation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Careers Open Roles Modal */}
      {careersModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Engineering Core Roles at kÅiTøS</h3>
              </div>
              <button
                onClick={() => setCareersModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Principal Systems Architect (Rust / eBPF)',
                  location: 'Bengaluru HQ / Remote',
                  exp: '8+ Years Systems Programming',
                  desc: 'Design low-latency Linux kernel hooks, memory-mapped streaming engines, and micro-schedulers for enterprise workloads.'
                },
                {
                  title: 'Staff Inference Engineer (CUDA / Triton)',
                  location: 'London Node / Bengaluru / Remote',
                  exp: '5+ Years High-Performance Computing',
                  desc: 'Implement quantization kernels (FP8/INT8), continuous paged attention hooks, and model-parallel serving clusters.'
                },
                {
                  title: 'Lead SRE & Multi-Cloud Infrastructure Architect',
                  location: 'Hyderabad SRE Lab / Remote',
                  exp: '6+ Years Kubernetes GitOps',
                  desc: 'Orchestrate automated failover mechanisms, zero-trust WireGuard mesh topologies, and continuous FinOps bin-packing.'
                }
              ].map((role, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-sm font-bold text-white font-mono">{role.title}</h4>
                    <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                      {role.location}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">{role.exp}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{role.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-300">
                To apply, submit your resume, GitHub profile, and a summary of your systems accomplishments to:
              </div>
              <div className="flex items-center justify-between">
                <a 
                  href="mailto:careers@kaitos.in" 
                  className="text-sm font-bold text-cyan-400 font-mono hover:underline flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" />
                  <span>careers@kaitos.in</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopyEmail('careers@kaitos.in', 'Careers')}
                  className="px-3 py-1 rounded bg-slate-800 text-xs text-slate-300 hover:text-white cursor-pointer"
                >
                  Copy Address
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setCareersModalOpen(false)}
                className="px-5 py-2 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
