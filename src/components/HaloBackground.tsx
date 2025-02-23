'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface VantaEffect {
  destroy: () => void;
}

export default function HaloBackground({ children }: { children: React.ReactNode }) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<VantaEffect | null>(null);

  const initVanta = () => {
    if (typeof window !== 'undefined' && window.VANTA && vantaRef.current && !vantaEffect) {
      const effect = window.VANTA.HALO({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        amplitudeFactor: 1.10,
        size: 0.80
      });
      setVantaEffect(effect);
    }
  };

  useEffect(() => {
    initVanta();
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return (
    <>
      <Script 
        src="/three.r134.min.js" 
        strategy="afterInteractive"
      />
      <Script 
        src="/vanta.halo.min.js"
        strategy="afterInteractive"
        onLoad={initVanta}
      />
      <div ref={vantaRef} className="fixed inset-0 -z-10">
        {children}
      </div>
    </>
  );
} 