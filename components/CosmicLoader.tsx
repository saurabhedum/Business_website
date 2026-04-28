import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export const CosmicLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loaderRef.current) {
      animate(loaderRef.current, {
        opacity: [0, 1, 1, 0],
        duration: 2000,
        easing: 'easeInOutQuad',
        complete: onComplete
      });
    }
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0B0F19]">
      <div className="text-white text-4xl font-bold tracking-widest">COSMIC FORMING...</div>
    </div>
  );
};
