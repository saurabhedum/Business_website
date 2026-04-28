
import React, { useEffect, useState, useRef } from 'react';

interface SparklineProps {
  color?: string;
  pointsCount?: number;
}

const Sparkline: React.FC<SparklineProps> = ({ color = 'var(--theme-color)', pointsCount = 20 }) => {
  const [points, setPoints] = useState<number[]>([]);
  const timerRef = useRef<number>(null);

  useEffect(() => {
    // Initialize with random points
    const initialPoints = Array.from({ length: pointsCount }, () => Math.random() * 100);
    setPoints(initialPoints);

    const update = () => {
      setPoints(prev => {
        const next = [...prev.slice(1), Math.random() * 100];
        return next;
      });
      timerRef.current = window.setTimeout(update, 800 + Math.random() * 1000);
    };

    update();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pointsCount]);

  const pathData = points.map((p, i) => {
    const x = (i / (pointsCount - 1)) * 100;
    const y = 100 - p;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="w-full h-8 overflow-hidden">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-700 ease-in-out opacity-60"
        />
        <path
          d={`${pathData} L 100 100 L 0 100 Z`}
          fill={`url(#gradient-${color.replace(/[^a-zA-Z0-9]/g, '')})`}
          className="opacity-20"
        />
        <defs>
          <linearGradient id={`gradient-${color.replace(/[^a-zA-Z0-9]/g, '')}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Sparkline;
