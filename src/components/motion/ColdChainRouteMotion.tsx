import React, { useState } from 'react';
import { 
  Plane, 
  Ship, 
  ThermometerSnowflake, 
  ShieldCheck, 
  Activity, 
  Globe2, 
  MapPin, 
  CheckCircle2, 
  FileText,
  Clock,
  Compass
} from 'lucide-react';

interface DestinationInfo {
  region: string;
  primaryHubs: string;
  freightOptions: string;
  packagingSpec: string;
  tempRange: string;
  dossierType: string;
}

export const ColdChainRouteMotion: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('Middle East');

  const destinations: Record<string, DestinationInfo> = {
    'Latin America': {
      region: 'Latin America (LATAM)',
      primaryHubs: 'Mexico City (MEX), São Paulo (GRU), Bogota (BOG)',
      freightOptions: 'Reefer Ocean Freight via JNPT & Temperature-Controlled Air Cargo',
      packagingSpec: 'Vacuum Insulated Panels (VIP) with dry ice or +2°C to +8°C PCM coolants (120-hour holdover)',
      tempRange: '2°C–8°C Cold Chain & 15°C–25°C Controlled Room Temp',
      dossierType: 'CTD Modules 1–5 with Spanish Translation Support'
    },
    'Middle East': {
      region: 'Middle East & Gulf (GCC)',
      primaryHubs: 'Dubai (DXB), Riyadh (RUH), Muscat (MCT)',
      freightOptions: 'Priority Air Cargo via Mumbai Airport (BOM) & Sea Freight to Jebel Ali',
      packagingSpec: 'High-Density EPS Thermal Shippers with multi-sensor USB data-loggers',
      tempRange: '2°C–8°C Biologics & 15°C–25°C Parenterals',
      dossierType: 'CTD Modules 1–5 with Bilingual Arabic/English Labeling'
    },
    'Southeast Asia': {
      region: 'Southeast Asia (ASEAN)',
      primaryHubs: 'Ho Chi Minh (SGN/Cat Lai), Manila (MNL), Bangkok (BKK)',
      freightOptions: 'Direct Air Dispatch & FCL Reefer Sea Freight via JNPT Port',
      packagingSpec: 'ICH Zone IVb Certified Thermal Packaging (Tested at 30°C / 75% RH)',
      tempRange: '2°C–8°C / 15°C–25°C with Dual Data-Logging',
      dossierType: 'ACTD / CTD Dossier Format with Certificate of Analysis'
    },
    'Africa': {
      region: 'East & West Africa',
      primaryHubs: 'Nairobi (NBO), Mombasa Port, Lagos (LOS), Accra (ACC)',
      freightOptions: 'Scheduled Sea Freight Containers & Bonded Air Express',
      packagingSpec: 'Reinforced Corrugated Outer with Thermal Barrier Blankets',
      tempRange: 'Zone IVb High-Temperature Protective Packaging',
      dossierType: 'WHO-Format COPP, FSC & Stability Data'
    },
    'CIS / Central Asia': {
      region: 'Central Asia & CIS',
      primaryHubs: 'Tashkent (TAS), Almaty (ALA), Baku (GYD)',
      freightOptions: 'Air Cargo via BOM & Multimodal Land/Rail Transit',
      packagingSpec: 'Insulated Thermal Pallet Shippers with Sub-Zero Inversion Protection',
      tempRange: 'Winter Freeze-Protection (15°C–25°C Maintained)',
      dossierType: 'CTD Dossier with Russian Language Secondary Packaging'
    }
  };

  const currentInfo = destinations[selectedRegion] || destinations['Middle East'];

  return (
    <div className="bg-[#FAF9F5] rounded-[32px] p-6 sm:p-8 border border-[#DFDCD4] space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E3DBD0]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#141414] text-white flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5 animate-spin [animation-duration:14s]" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-[#141414] font-['Plus_Jakarta_Sans']">
              Cold-Chain Export Route &amp; Packaging Simulator
            </h3>
            <p className="text-xs text-[#635F55]">
              Select a target geographic region to inspect freight logistics and temperature validation specifications.
            </p>
          </div>
        </div>

        {/* Live Sensor Simulation Pill */}
        <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-[#DFDCD4] text-xs font-mono text-[#141414] shrink-0 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-[#E2CA40] animate-pulse" />
          <span>Active Sensor: +4.6°C (Validated 2°C–8°C)</span>
        </div>
      </div>

      {/* Region Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {Object.keys(destinations).map((reg) => (
          <button
            key={reg}
            onClick={() => setSelectedRegion(reg)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              selectedRegion === reg
                ? 'bg-[#141414] text-white shadow-xs'
                : 'bg-white text-[#635F55] border border-[#DFDCD4] hover:bg-[#F3F0EA]'
            }`}
          >
            {reg}
          </button>
        ))}
      </div>

      {/* Interactive Detail Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Animated Visual Route Box */}
        <div className="lg:col-span-5 bg-white rounded-[24px] p-6 border border-[#DFDCD4] space-y-4 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono border-b border-[#EBE5DB] pb-2 text-[#8A857A]">
            <span>ORIGIN: MUMBAI, INDIA</span>
            <span className="text-[#141414] font-bold">DISPATCH READY</span>
          </div>

          {/* SVG Animated Route Line */}
          <div className="relative py-4 flex items-center justify-between">
            {/* Origin Node */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="w-9 h-9 rounded-full bg-[#F3F0EA] text-[#141414] border-2 border-[#141414] flex items-center justify-center font-bold text-xs font-mono">
                IN
              </div>
              <span className="text-[10px] font-mono font-bold text-[#141414]">JNPT / BOM</span>
            </div>

            {/* Connecting Dashed Line with moving pulse */}
            <div className="flex-1 mx-3 relative flex items-center">
              <svg className="w-full h-4" preserveAspectRatio="none">
                <line 
                  x1="0" 
                  y1="8" 
                  x2="100%" 
                  y2="8" 
                  stroke="#141414" 
                  strokeWidth="2" 
                  strokeDasharray="6,6"
                  className="animate-flow-dash"
                />
              </svg>
              {/* Transport Icon in Middle */}
              <div className="absolute left-1/2 -translate-x-1/2 bg-[#141414] text-white p-1 rounded-full shadow-md animate-float">
                <Plane className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Destination Node */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="w-9 h-9 rounded-full bg-[#FAF9F5] text-[#141414] border-2 border-[#141414] flex items-center justify-center font-bold text-xs font-mono">
                DEST
              </div>
              <span className="text-[10px] font-mono font-bold text-[#141414] text-center max-w-[80px] truncate">
                {selectedRegion}
              </span>
            </div>
          </div>

          {/* Packaging Thermal Holdover Gauge */}
          <div className="p-3.5 bg-[#FAF9F5] rounded-2xl border border-[#DFDCD4] space-y-2 text-xs">
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-[#635F55]">Thermal Holdover Capacity:</span>
              <span className="font-bold text-[#141414]">120 Hours Validated</span>
            </div>
            <div className="w-full h-2 bg-[#E2DBD0] rounded-full overflow-hidden">
              <div className="h-full bg-[#E2CA40] rounded-full w-[85%]" />
            </div>
            <p className="text-[10px] font-mono text-[#8A857A]">
              Tested with phase-change materials for multi-day international customs transits.
            </p>
          </div>
        </div>

        {/* Specifications List */}
        <div className="lg:col-span-7 space-y-3">
          <div className="p-4 bg-white rounded-2xl border border-[#DFDCD4] space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A857A] block">
              Primary Gateway Ports &amp; Airports
            </span>
            <p className="text-xs font-bold text-[#141414]">
              {currentInfo.primaryHubs}
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#DFDCD4] space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A857A] block">
              Freight Arrangements
            </span>
            <p className="text-xs text-[#58554D]">
              {currentInfo.freightOptions}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 bg-white rounded-2xl border border-[#DFDCD4] space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A857A] block">
                Thermal Packaging Standard
              </span>
              <p className="text-[11px] text-[#58554D] leading-snug">
                {currentInfo.packagingSpec}
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#DFDCD4] space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A857A] block">
                Regulatory Dossier Format
              </span>
              <p className="text-[11px] text-[#58554D] leading-snug">
                {currentInfo.dossierType}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
