import React from 'react';
import { Phone } from 'lucide-react';

interface CallFloatingButtonProps {
  phoneNumber?: string;
  displayNumber?: string;
}

export const CallFloatingButton: React.FC<CallFloatingButtonProps> = ({
  phoneNumber = '+918010484563',
  displayNumber = '+91 80104 84563'
}) => {
  const cleanTelNumber = phoneNumber.replace(/[^\d+]/g, '');

  return (
    <div className="fixed bottom-17 right-4 sm:bottom-20 sm:right-6 z-50">
      <a
        href={`tel:${cleanTelNumber}`}
        className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#141414] hover:bg-[#262626] text-white flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-200 active:scale-95"
        aria-label={`Call Adivari Pharmaceuticals at ${displayNumber}`}
        title={`Call ${displayNumber}`}
      >
        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />

        <span className="hidden sm:block absolute right-full mr-2.5 top-1/2 -translate-y-1/2 bg-[#141414] text-white text-[11px] font-mono px-3 py-1 rounded-full shadow-lg border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
          Call: {displayNumber}
        </span>
      </a>
    </div>
  );
};

export default CallFloatingButton;
