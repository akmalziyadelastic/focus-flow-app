import React from 'react';

const CircularTimer = ({ timeLeft, maxTime, isActive }) => {
  const radius = 140;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // If timeLeft is 0, full circle? No, usually it shrinks. 
  // Let's make it start full and shrink.
  const strokeDashoffset = circumference - (timeLeft / maxTime) * circumference;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  return (
    <div className="flex-center" style={{ position: 'relative', margin: '2rem auto' }}>
       {/* Background Glow Effect */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, var(--color-primary-glow) 0%, transparent 70%)',
        opacity: isActive ? 0.2 : 0.05,
        transition: 'opacity 0.5s ease'
      }} />

      <svg
        height={radius * 2}
        width={radius * 2}
        style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}
      >
        {/* Track */}
        <circle
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          fill="transparent"
        />
        {/* Progress */}
        <circle
          stroke="var(--color-primary)"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ 
            strokeDashoffset,
            transition: 'stroke-dashoffset 1s linear',
            filter: isActive ? 'drop-shadow(0 0 6px var(--color-primary))' : 'none'
          }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          fill="transparent"
        />
      </svg>
      
      <div 
        style={{ 
          position: 'absolute', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}
      >
        <span style={{ 
          fontSize: '4.5rem', 
          fontWeight: '700', 
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1,
          letterSpacing: '-2px',
          textShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}>
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </span>
        <span style={{ 
          color: 'var(--text-secondary)', 
          marginTop: '0.8rem',
          fontSize: '0.85rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontWeight: 600
        }}>
          {isActive ? 'Simulate Focus' : 'Ready'}
        </span>
      </div>
    </div>
  );
};

export default CircularTimer;
