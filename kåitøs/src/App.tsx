import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatsDashboard } from './components/StatsDashboard';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { ToastProvider } from './components/Toast';
import { LocationCurrencyProvider } from './context/LocationCurrencyContext';
import { ActiveSection } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [inquiryService, setInquiryService] = useState<string>('Software Engineering');
  const [inquiryNotes, setInquiryNotes] = useState<string>('');

  // Handle section navigation with smooth scrolling and active state updates
  const handleNavigate = (section: ActiveSection) => {
    setActiveSection(section);
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Scroll spy to update active section in header as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const sections: ActiveSection[] = ['home', 'about', 'services', 'statistics', 'portfolio', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        if (section === 'home') {
          if (window.scrollY < 400) {
            setActiveSection('home');
            break;
          }
        } else {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectServiceForInquiry = (serviceName: string) => {
    setInquiryService(serviceName);
    setInquiryNotes(`Interested in initiating a Discovery Sprint for: ${serviceName}.`);
  };

  const handlePreFillInquiry = (notes: string) => {
    setInquiryNotes(notes);
  };

  return (
    <LocationCurrencyProvider>
      <ToastProvider>
        <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
          {/* Top Bar Navigation */}
          <Header
            activeSection={activeSection}
            onNavigate={handleNavigate}
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          {/* Main Page Layout */}
          <main className="flex-1">
            {/* Section: Home & Hero */}
            <div id="home">
              <Hero onNavigate={handleNavigate} />
            </div>

            {/* Section: About Us (Mission, Meaning of kÅiTøS, Tech Stack, Core Values) */}
            <div id="about">
              <AboutSection onNavigate={handleNavigate} />
            </div>

            {/* Section: Services (Software Engineering, Cloud, Consulting, Managed IT) */}
            <div id="services">
              <ServicesSection
                onNavigate={handleNavigate}
                onSelectServiceForInquiry={handleSelectServiceForInquiry}
              />
            </div>

            {/* Section: Statistics & Telemetry Hub */}
            <div id="statistics">
              <StatsDashboard
                onNavigate={handleNavigate}
                onPreFillInquiry={handlePreFillInquiry}
              />
            </div>

            {/* Section: Case Studies / Portfolio (Project Showcases, Client Results) */}
            <div id="portfolio">
              <CaseStudiesSection
                onNavigate={handleNavigate}
                onInquireSimilarProject={(title) => {
                  setInquiryNotes(`Inquiry regarding case study architecture: "${title}". Looking to achieve comparable latency or cost reductions.`);
                }}
              />
            </div>

            {/* Section: Blog (Industry Insights, Kernel Dispatches, Company Updates) */}
            <div id="blog">
              <BlogSection />
            </div>

            {/* Section: Contact Us (Inquiry Form, Direct Email, Office Locations) */}
            <div id="contact">
              <ContactSection
                initialService={inquiryService}
                initialNotes={inquiryNotes}
              />
            </div>
          </main>

          {/* Footer with Newsletter & Social Media */}
          <Footer onNavigate={handleNavigate} />

          {/* Interactive Support & Inquiry Tracking Chatbot */}
          <Chatbot onNavigate={handleNavigate} />

          {/* Global Command / Search Modal (⌘K) */}
          <GlobalSearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onNavigate={handleNavigate}
          />
        </div>
      </ToastProvider>
    </LocationCurrencyProvider>
  );
}
