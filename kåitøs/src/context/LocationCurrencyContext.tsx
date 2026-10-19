import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type RegionCode = 'IN' | 'UK' | 'US' | 'EU';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  flag: string;
  locale: string;
  exchangeRate: number; // multiplier from USD
  primaryPhone: string;
  phoneLabel: string;
}

export const REGIONS: Record<RegionCode, CurrencyConfig> = {
  IN: {
    code: 'INR',
    symbol: '₹',
    name: 'India',
    flag: '🇮🇳',
    locale: 'en-IN',
    exchangeRate: 86.5,
    primaryPhone: '+91 8220184799',
    phoneLabel: 'India Direct Hotline / WhatsApp'
  },
  UK: {
    code: 'GBP',
    symbol: '£',
    name: 'United Kingdom',
    flag: '🇬🇧',
    locale: 'en-GB',
    exchangeRate: 0.79,
    primaryPhone: '+44 7733926231',
    phoneLabel: 'UK & Europe Regional Line'
  },
  US: {
    code: 'USD',
    symbol: '$',
    name: 'United States & Global',
    flag: '🇺🇸',
    locale: 'en-US',
    exchangeRate: 1.0,
    primaryPhone: '+44 7733926231', // direct international line
    phoneLabel: 'International Operations Line'
  },
  EU: {
    code: 'EUR',
    symbol: '€',
    name: 'European Union',
    flag: '🇪🇺',
    locale: 'de-DE',
    exchangeRate: 0.92,
    primaryPhone: '+44 7733926231',
    phoneLabel: 'European Operations Desk'
  }
};

export const CONTACT_PHONES = {
  india: {
    number: '+91 8220184799',
    cleanNumber: '918220184799',
    display: '+91 8220184799',
    region: 'India / APAC Headquarters',
    location: 'Bengaluru & Hyderabad',
    hours: '09:00 - 20:00 IST (24/7 SRE Escalation)'
  },
  uk: {
    number: '+44 7733926231',
    cleanNumber: '447733926231',
    display: '+44 7733926231',
    region: 'UK / Europe & International',
    location: 'London & International Nodes',
    hours: '08:00 - 19:00 GMT / BST (Follow-the-Sun)'
  }
};

interface LocationCurrencyContextType {
  region: RegionCode;
  config: CurrencyConfig;
  setRegion: (region: RegionCode) => void;
  formatMoney: (amountInUSD: number, options?: { roundToHundreds?: boolean; compact?: boolean }) => string;
  convertFromUSD: (amountInUSD: number) => number;
  isAutoDetected: boolean;
  detectedTz: string;
}

const LocationCurrencyContext = createContext<LocationCurrencyContextType | undefined>(undefined);

export const LocationCurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [region, setRegionState] = useState<RegionCode>('IN');
  const [isAutoDetected, setIsAutoDetected] = useState(false);
  const [detectedTz, setDetectedTz] = useState('Asia/Kolkata');

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      setDetectedTz(tz);
      const lowerTz = tz.toLowerCase();
      const userLang = (navigator.language || '').toLowerCase();

      // Location auto-detection heuristic
      if (
        lowerTz.includes('kolkata') || 
        lowerTz.includes('calcutta') || 
        lowerTz.includes('india') || 
        userLang.includes('en-in') || 
        userLang.includes('hi')
      ) {
        setRegionState('IN');
        setIsAutoDetected(true);
      } else if (
        lowerTz.includes('london') || 
        lowerTz.includes('belfast') || 
        lowerTz.includes('europe/london') || 
        userLang.includes('en-gb')
      ) {
        setRegionState('UK');
        setIsAutoDetected(true);
      } else if (lowerTz.startsWith('europe/')) {
        setRegionState('EU');
        setIsAutoDetected(true);
      } else if (lowerTz.includes('america') || lowerTz.includes('us/')) {
        setRegionState('US');
        setIsAutoDetected(true);
      } else {
        // Default to India (as kÅiTøS operates kaitos.in)
        setRegionState('IN');
        setIsAutoDetected(true);
      }
    } catch {
      setRegionState('IN');
    }
  }, []);

  const setRegion = (newRegion: RegionCode) => {
    setRegionState(newRegion);
  };

  const config = REGIONS[region];

  const convertFromUSD = (amountInUSD: number): number => {
    return amountInUSD * config.exchangeRate;
  };

  const formatMoney = (
    amountInUSD: number, 
    options?: { roundToHundreds?: boolean; compact?: boolean }
  ): string => {
    const rawConverted = amountInUSD * config.exchangeRate;
    const rounded = options?.roundToHundreds 
      ? Math.round(rawConverted / 100) * 100 
      : Math.round(rawConverted);

    if (options?.compact) {
      if (region === 'IN') {
        if (rounded >= 10000000) {
          return `${config.symbol}${(rounded / 10000000).toFixed(1)} Cr`;
        }
        if (rounded >= 100000) {
          return `${config.symbol}${(rounded / 100000).toFixed(1)} Lakhs`;
        }
      } else {
        if (rounded >= 1000000) {
          return `${config.symbol}${(rounded / 1000000).toFixed(1)}M`;
        }
        if (rounded >= 1000) {
          return `${config.symbol}${(rounded / 1000).toFixed(0)}k`;
        }
      }
    }

    try {
      return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.code,
        maximumFractionDigits: 0,
      }).format(rounded);
    } catch {
      return `${config.symbol}${rounded.toLocaleString()}`;
    }
  };

  return (
    <LocationCurrencyContext.Provider
      value={{
        region,
        config,
        setRegion,
        formatMoney,
        convertFromUSD,
        isAutoDetected,
        detectedTz
      }}
    >
      {children}
    </LocationCurrencyContext.Provider>
  );
};

export const useLocationCurrency = (): LocationCurrencyContextType => {
  const context = useContext(LocationCurrencyContext);
  if (!context) {
    throw new Error('useLocationCurrency must be used within a LocationCurrencyProvider');
  }
  return context;
};
