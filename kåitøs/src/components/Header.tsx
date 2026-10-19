import React, { useState } from 'react';
import { ActiveSection } from '../types';
import { useLocationCurrency, RegionCode, CONTACT_PHONES } from '../context/LocationCurrencyContext';
import { KaitosLogo } from './KaitosLogo';
import { Search, Menu, X, ArrowUpRight, Phone, Globe, ChevronDown, Check } from 'lucide-react';

interface HeaderProps {
  activeSection: ActiveSection;
  onNavigate: (section: ActiveSection) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const { region, setRegion, config, isAutoDetected } = useLocationCurrency();

  const navItems: { label: string; section: ActiveSection }[] = [
    { label: 'Home', section: 'home' },
    { label: 'About', section: 'about' },
    { label: 'Services', section: 'services' },
    { label: 'Statistics', section: 'statistics' },
    { label: 'Case Studies', section: 'portfolio' },
    { label: 'Blog', section: 'blog' },
    { label: 'Contact', section: 'contact' },
  ];

  const handleNavClick = (section: ActiveSection) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  const currencyOptions: { region: RegionCode; label: string; flag: string; symbol: string }[] = [
    { region: 'IN', label: 'India · INR', flag: '🇮🇳', symbol: '₹' },
    { region: 'UK', label: 'UK · GBP', flag: '🇬🇧', symbol: '£' },
    { region: 'US', label: 'Global · USD', flag: '🇺🇸', symbol: '$' },
    { region: 'EU', label: 'Europe · EUR', flag: '🇪🇺', symbol: '€' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#070B14]/95 backdrop-blur-md border-b border-slate-800/80 transition-all">
      {/* Top Utility Bar: Direct Hotline Phones & Location/Currency Indicator */}
      <div className="bg-[#04070E] border-b border-slate-800/50 py-1.5 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Direct Contact Phone Lines with Logo-Inspired Regional Badges */}
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
              <Phone className="w-3 h-3 text-cyan-400" />
              <span>Direct Hotlines:</span>
            </span>

            <a
              href={`tel:${CONTACT_PHONES.india.number.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800/80 hover:border-red-500/40 text-slate-300 hover:text-red-400 transition-colors font-mono text-[11px] group"
              title="Call India Office"
            >
              <span className="text-xs">🇮🇳</span>
              <span className="group-hover:underline">{CONTACT_PHONES.india.display}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
            </a>

            <a
              href={`tel:${CONTACT_PHONES.uk.number.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800/80 hover:border-blue-500/40 text-slate-300 hover:text-blue-400 transition-colors font-mono text-[11px] group"
              title="Call UK & Europe Office"
            >
              <span className="text-xs">🇬🇧</span>
              <span className="group-hover:underline">{CONTACT_PHONES.uk.display}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </a>
          </div>

          {/* Regional Currency & Location Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 hover:text-white hover:border-cyan-500/50 transition-colors cursor-pointer"
              title="Change location and currency"
            >
              <span>{config.flag}</span>
              <span className="font-medium text-cyan-300">{config.code} ({config.symbol})</span>
              {isAutoDetected && (
                <span className="hidden md:inline text-[10px] text-lime-400 bg-lime-950/80 px-1 py-0.2 rounded border border-lime-500/20 font-mono">
                  Auto
                </span>
              )}
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {currencyDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setCurrencyDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-1.5 w-52 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-2.5 py-1 text-[10px] font-mono text-cyan-400 uppercase tracking-wider border-b border-slate-800/80 mb-1">
                    Select Location / Currency
                  </div>
                  {currencyOptions.map((opt) => (
                    <button
                      key={opt.region}
                      onClick={() => {
                        setRegion(opt.region);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        region === opt.region
                          ? 'bg-cyan-950/60 text-cyan-300 font-semibold border border-cyan-500/30'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{opt.flag}</span>
                        <span>{opt.label}</span>
                      </span>
                      <span className="font-mono text-xs text-lime-400">{opt.symbol}</span>
                    </button>
                  ))}
                  <div className="p-2 text-[10px] text-slate-400 border-t border-slate-800/80 mt-1 leading-tight">
                    Calculators, scopes, and ROI models automatically adapt to this currency.
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Stylish kÅiTøS Logo & Wordmark */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center text-left focus:outline-none cursor-pointer"
          title="kÅiTøS Home"
        >
          <KaitosLogo size={44} variant="full" />
        </button>

        {/* Zone 2: Navigation Links with Animated Underline */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.section;
            return (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className={`whitespace-nowrap shrink-0 transition-colors relative py-1 focus:outline-none cursor-pointer ${
                  isActive 
                    ? 'text-cyan-400 font-semibold' 
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-lime-400 to-cyan-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Search, Inquiry CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            aria-label="Search website"
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-900/90 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors focus:outline-none cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400 hover:brightness-110 rounded-lg transition-all whitespace-nowrap shrink-0 shadow-lg shadow-cyan-950/40 cursor-pointer"
          >
            <span>Inquire Now</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#070B12] px-4 pt-4 pb-6 space-y-4">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <a
              href={`tel:${CONTACT_PHONES.india.number.replace(/\s+/g, '')}`}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2"
            >
              <span>🇮🇳</span>
              <span className="font-mono truncate">{CONTACT_PHONES.india.display}</span>
            </a>
            <a
              href={`tel:${CONTACT_PHONES.uk.number.replace(/\s+/g, '')}`}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2"
            >
              <span>🇬🇧</span>
              <span className="font-mono truncate">{CONTACT_PHONES.uk.display}</span>
            </a>
          </div>

          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeSection === item.section
                    ? 'text-cyan-400 bg-cyan-950/30'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-bold text-xs text-center cursor-pointer"
            >
              Initiate Project Inquiry
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
