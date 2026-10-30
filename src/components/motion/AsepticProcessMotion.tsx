import React, { useState } from 'react';
import { 
  Sparkles, 
  FlaskConical, 
  ThermometerSnowflake, 
  ShieldCheck, 
  Scan, 
  Activity, 
  Wind, 
  CheckCircle2, 
  ArrowRight,
  Gauge,
  Layers,
  Droplets
} from 'lucide-react';

interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  parameters: { label: string; value: string }[];
  description: string;
  graphicType: 'compounding' | 'filling' | 'lyophilization' | 'inspection';
}

export const AsepticProcessMotion: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<string>('lyophilization');

  const steps: ProcessStep[] = [
    {
      id: 'compounding',
      stepNumber: '01',
      title: 'Compounding & Sterile Filtration',
      subtitle: 'Class C to Grade A Preparation Suite',
      parameters: [
        { label: 'Membrane Rating', value: '0.22 µm PES Dual-Layer' },
        { label: 'Bioburden Control', value: '< 10 CFU / 100 mL' },
        { label: 'WFI Conductivity', value: '< 1.1 µS/cm @ 20°C' }
      ],
      description: 'Active substances are formulated in 316L electropolished stainless steel vessels with magnetic stirrers. Terminal sterile filtration removes sub-micron contaminants prior to aseptic filling.',
      graphicType: 'compounding'
    },
    {
      id: 'filling',
      stepNumber: '02',
      title: 'Aseptic Filling & Partial Stoppering',
      subtitle: 'ISO Class 5 / Grade A Laminar Flow Zone',
      parameters: [
        { label: 'Airflow Velocity', value: '0.45 m/s ± 20%' },
        { label: 'Differential Pressure', value: '+15 Pa Positive' },
        { label: 'Vial Type', value: 'USP Type I Borosilicate' }
      ],
      description: 'Depyrogenated tubular vials are dosed with high-accuracy rotary piston pumps under Class 100 unidirectional airflow. Bromobutyl stoppers are seated in slotted position for subsequent sublimation.',
      graphicType: 'filling'
    },
    {
      id: 'lyophilization',
      stepNumber: '03',
      title: 'Freeze-Drying (Lyophilization)',
      subtitle: 'Deep Vacuum Sublimation & Shelf Freezing',
      parameters: [
        { label: 'Freezing Temp', value: '-45°C Core Freezing' },
        { label: 'Chamber Vacuum', value: '0.08 mbar High Vacuum' },
        { label: 'Cake Moisture', value: '< 1.5% Residual' }
      ],
      description: 'Sublimation cycles eliminate water directly from frozen state under high vacuum, preserving molecular stability of heat-labile antibiotics (Tigecycline, Meropenem) without thermal degradation.',
      graphicType: 'lyophilization'
    },
    {
      id: 'inspection',
      stepNumber: '04',
      title: 'Stoppering & Automated Inspection',
      subtitle: 'Hermetic Sealing & Optical Particle Detection',
      parameters: [
        { label: 'Hydraulic Stoppering', value: 'Full Vacuum Sealing' },
        { label: 'Aluminum Crimp', value: 'Flip-Off Tamper Proof' },
        { label: 'Inspection Beam', value: '360° High-Speed Laser' }
      ],
      description: 'Chamber shelves collapse under pure sterile nitrogen blanket to seal stoppers hermetically. Vials proceed to high-speed optical inspection for particulate matter and seal integrity.',
      graphicType: 'inspection'
    }
  ];

  const currentStep = steps.find(s => s.id === activeStepId) || steps[2];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="bg-white rounded-[40px] p-6 sm:p-10 border border-[#DFDCD4] shadow-sm space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EFECE5]">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3EC] border border-[#DFDCD4] text-[10px] font-mono uppercase font-bold text-[#4A463B] w-fit mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2CA40]" />
              <Activity className="w-3.5 h-3.5 text-[#4A463B]" />
              <span>Sterile Manufacturing Motion Architecture</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#141414] font-['Plus_Jakarta_Sans'] tracking-tight">
              Interactive Aseptic &amp; <br />
              <span className="text-[#4A463B]">Lyophilization Engineering Process</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#635F55] leading-relaxed">
              Explore the critical sterile phases engineered into every batch. Interactive physical parameters aligned with Current Good Manufacturing Practices (cGMP) and Grade A cleanroom standards.
            </p>
          </div>

          {/* Cleanroom Telemetry Live Simulation */}
          <div className="shrink-0 flex items-center gap-3 bg-[#FAF9F5] px-4 py-3 rounded-2xl border border-[#DFDCD4]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E2CA40] animate-ping" />
            <div className="text-xs">
              <p className="font-bold text-[#141414] font-mono">Grade A / ISO 5 Cleanroom</p>
              <p className="text-[10px] font-mono text-[#8A857A]">Particles ≥0.5µm: 0/m³ • Laminar: 0.45 m/s</p>
            </div>
          </div>
        </div>

        {/* Step Navigation Tabs with Progress Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((step) => {
            const isActive = step.id === activeStepId;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                  isActive 
                    ? 'bg-[#FAF9F5] border-[#141414] shadow-xs' 
                    : 'bg-white border-[#DFDCD4] hover:border-[#CDC8BC]'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#E2CA40]" />
                )}
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#141414]' : 'text-[#8A857A]'}`}>
                    PHASE {step.stepNumber}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#E2CA40]" />
                  )}
                </div>
                <h3 className={`font-bold text-xs sm:text-sm font-['Plus_Jakarta_Sans'] line-clamp-1 ${isActive ? 'text-[#141414]' : 'text-[#58554D]'}`}>
                  {step.title}
                </h3>
                <p className="text-[11px] text-[#8A857A] mt-0.5 truncate">
                  {step.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Interactive Motion Graphic Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F4] p-6 sm:p-8 rounded-3xl border border-[#EAE3D5]">
          
          {/* Left Column: Visual Motion Simulation Graphic */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[300px] sm:min-h-[340px] bg-white rounded-2xl border border-[#E2DBD0] p-6 overflow-hidden shadow-xs">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6E8E7C_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Graphic 1: Compounding & Sterile Filtration */}
            {currentStep.graphicType === 'compounding' && (
              <div className="relative w-full flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="relative w-40 h-48 border-2 border-[#3B5244] rounded-b-3xl rounded-t-lg bg-[#FAF8F3] overflow-hidden flex items-end justify-center">
                  {/* Stirrer shaft with rotation */}
                  <div className="absolute top-2 w-1.5 h-32 bg-[#738279] rounded-full animate-spin [animation-duration:4s]" />
                  <div className="absolute top-30 w-16 h-2 bg-[#738279] rounded-full animate-spin [animation-duration:4s]" />
                  
                  {/* Fluid liquid layer */}
                  <div className="w-full bg-gradient-to-t from-[#6E8E7C]/40 to-[#A2BFAF]/30 rounded-b-2xl animate-liquid relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#6E8E7C]/60" />
                  </div>
                </div>

                {/* Filter pipeline */}
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#3B5244]">
                  <span>0.22µm Filter</span>
                  <div className="w-16 h-0.5 bg-[#6E8E7C] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#D96B43] animate-pulse" />
                  </div>
                  <span>Sterile Reservoir</span>
                </div>
              </div>
            )}

            {/* Graphic 2: Aseptic Liquid Filling */}
            {currentStep.graphicType === 'filling' && (
              <div className="relative w-full flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                {/* Dispensing Nozzle */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-12 bg-[#3B5244] rounded-t-sm" />
                  <div className="w-1.5 h-6 bg-[#6E8E7C] relative">
                    {/* Animated droplet */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D96B43] absolute -bottom-3 -left-0.5 animate-bounce" />
                  </div>
                </div>

                {/* Conveyor Line with Vials */}
                <div className="flex items-end gap-6 pt-2 border-b-2 border-[#CCD8D0] pb-2 w-full justify-center">
                  {[0, 1, 2].map((idx) => (
                    <div 
                      key={idx} 
                      className={`w-12 h-20 rounded-t-md rounded-b-xl border-2 border-[#5A6D61] bg-white/80 p-1 flex flex-col justify-end transition-all ${
                        idx === 1 ? 'scale-110 border-[#D96B43] shadow-md' : 'opacity-70'
                      }`}
                    >
                      <div className="w-full h-8 rounded-b-lg bg-[#6E8E7C]/30 relative overflow-hidden" />
                      <div className="w-6 h-2 rounded-sm bg-[#8A9A90] mx-auto -mt-1" />
                    </div>
                  ))}
                </div>

                <div className="text-[11px] font-mono text-[#6E8E7C] flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-[#3B5244]" />
                  <span>Unidirectional HEPA Airflow (0.45 m/s)</span>
                </div>
              </div>
            )}

            {/* Graphic 3: Deep Sublimation Freeze-Drying */}
            {currentStep.graphicType === 'lyophilization' && (
              <div className="relative w-full flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                {/* Lyophilizer Chamber Frame */}
                <div className="w-64 h-48 rounded-2xl border-2 border-[#3B5244] bg-[#F7FAF8] p-3 flex flex-col justify-between relative shadow-inner">
                  {/* Vacuum Indicator Badge */}
                  <div className="flex items-center justify-between text-[10px] font-mono border-b border-[#D8E4DC] pb-1.5">
                    <span className="text-[#3B5244] font-bold">VACUUM: 0.08 mbar</span>
                    <span className="text-[#D96B43] font-bold">-45.2°C FROZEN</span>
                  </div>

                  {/* 3 Refrigerated Shelves */}
                  <div className="space-y-4 py-2">
                    {[1, 2].map((shelf) => (
                      <div key={shelf} className="space-y-1">
                        <div className="flex justify-around items-end">
                          {[1, 2, 3].map((v) => (
                            <div key={v} className="w-6 h-10 border border-[#4D6154] rounded-t-sm rounded-b-md bg-white p-0.5 flex flex-col justify-end">
                              {/* Freeze dried crystalline cake */}
                              <div className="w-full h-4 bg-[#E2ECE5] border-t border-[#A4BCAF] rounded-b-sm flex items-center justify-center">
                                <span className="text-[6px] text-[#476050] font-bold font-mono">CAKE</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="h-1.5 bg-[#8DA596] rounded-full w-full" />
                      </div>
                    ))}
                  </div>

                  {/* Sublimation Vapor Particles Animation */}
                  <div className="flex items-center justify-center gap-1 text-[10px] text-[#55695C] font-mono">
                    <ThermometerSnowflake className="w-3.5 h-3.5 text-[#3B5244] animate-spin [animation-duration:8s]" />
                    <span>Sublimation Phase Active (Ice to Vapor)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Graphic 4: Optical Laser Inspection */}
            {currentStep.graphicType === 'inspection' && (
              <div className="relative w-full flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="relative w-36 h-52 border-2 border-[#3B5244] rounded-xl bg-white p-2 flex flex-col items-center justify-between overflow-hidden shadow-md">
                  {/* Laser Scan Line Beam */}
                  <div className="absolute left-0 right-0 h-1 bg-[#D96B43] shadow-[0_0_8px_#D96B43] animate-scan z-20 pointer-events-none" />

                  {/* Sealed Vial Details */}
                  <div className="w-14 h-4 bg-[#9AA99F] rounded-t-md border border-[#6E7F74]" />
                  <div className="w-10 h-3 bg-[#D96B43] rounded-sm" />
                  <div className="w-24 h-36 border-2 border-[#526659] rounded-b-2xl bg-white/90 p-2 flex flex-col justify-end">
                    <div className="w-full h-12 bg-[#E2EDE5] rounded-b-lg border border-[#B1C6B9] flex flex-col items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-[#3B5244]" />
                      <span className="text-[8px] font-mono font-bold text-[#3B5244]">100% STERILE</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-[#D96B43] font-bold flex items-center gap-1.5">
                  <Scan className="w-3.5 h-3.5 animate-pulse" />
                  <span>360° Automated Optical Inspection Passed</span>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Parameters & Description */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-xs font-bold font-mono text-[#D96B43] tracking-widest uppercase">
                PHASE SPECIFICATION: {currentStep.stepNumber}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1C221E] font-['Outfit'] mt-1">
                {currentStep.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5D6B62] leading-relaxed mt-2">
                {currentStep.description}
              </p>
            </div>

            {/* Technical Parameters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentStep.parameters.map((param, pidx) => (
                <div key={pidx} className="p-3.5 rounded-xl bg-white border border-[#E3DBD0] space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-[#7E8E84] block">
                    {param.label}
                  </span>
                  <span className="font-bold text-xs text-[#1C221E] font-mono block">
                    {param.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Quality Standard Note */}
            <div className="p-4 rounded-xl bg-[#EAF2ED] border border-[#D0E2D5] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#3B5244] shrink-0 mt-0.5" />
              <div className="text-xs text-[#3C4F42] leading-snug">
                <strong>Pharmacopeial Release Standard:</strong> Every batch is released with validated analytical COAs meeting USP, BP, and IP monographs. Full batch records archived for regulatory inspection.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
