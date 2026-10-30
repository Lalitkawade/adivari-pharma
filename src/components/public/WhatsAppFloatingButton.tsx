import React, { useState } from 'react';

interface WhatsAppFloatingButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  phoneNumber = '919922868727',
  defaultMessage = 'Hello Adivari Pharma, I am interested in inquiring about your sterile injectable formulations and export catalogue.'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip badge on hover or always subtle */}
      <div 
        className={`hidden sm:flex items-center gap-2 bg-[#141414]/95 text-white text-xs px-3.5 py-2 rounded-full shadow-xl border border-white/10 backdrop-blur-md transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
        <span className="font-medium">Chat on WhatsApp (+91 99228 68727)</span>
      </div>

      {/* Main Floating Trigger Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Contact Adivari Pharma on WhatsApp at 9922868727"
        title="Chat with us on WhatsApp"
      >
        {/* Pulsing ring animation behind button */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none group-hover:hidden" />

        {/* Online green indicator dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#141414] border-2 border-white flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
        </span>

        {/* Official WhatsApp Icon */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-xs"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.83C9.36 7.83 9.09 7.89 8.87 8.13C8.65 8.38 8.02 8.97 8.02 10.17C8.02 11.38 8.9 12.54 9.02 12.71C9.15 12.87 10.74 15.33 13.18 16.38C13.76 16.63 14.21 16.78 14.57 16.89C15.15 17.08 15.68 17.05 16.1 16.99C16.57 16.92 17.54 16.4 17.74 15.83C17.95 15.26 17.95 14.77 17.89 14.67C17.82 14.57 17.66 14.51 17.41 14.39C17.16 14.26 15.94 13.66 15.71 13.58C15.49 13.49 15.32 13.45 15.16 13.7C15 13.94 14.53 14.51 14.39 14.67C14.24 14.83 14.1 14.85 13.85 14.72C13.6 14.6 12.79 14.33 11.84 13.49C11.1 12.83 10.6 12.02 10.46 11.77C10.31 11.53 10.44 11.39 10.57 11.27C10.68 11.16 10.81 10.98 10.94 10.83C11.06 10.69 11.11 10.58 11.19 10.42C11.27 10.25 11.23 10.11 11.17 9.99C11.11 9.86 10.64 8.71 10.44 8.24C10.25 7.78 10.06 7.84 9.91 7.83C9.77 7.83 9.62 7.83 9.53 7.83Z"/>
        </svg>
      </a>
    </div>
  );
};
