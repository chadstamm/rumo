'use client'

export function CompassRose({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="0.3" opacity="0.25" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180
        const outerR = 96
        const innerR = angle % 90 === 0 ? 84 : 88
        return (
          <line
            key={angle}
            x1={100 + Math.sin(rad) * innerR}
            y1={100 - Math.cos(rad) * innerR}
            x2={100 + Math.sin(rad) * outerR}
            y2={100 - Math.cos(rad) * outerR}
            stroke="currentColor"
            strokeWidth={angle % 90 === 0 ? '0.8' : '0.4'}
            opacity={angle % 90 === 0 ? '0.5' : '0.25'}
          />
        )
      })}
      <polygon points="100,8 104,80 100,70 96,80" fill="currentColor" opacity="0.6" />
      <polygon points="100,192 96,120 100,130 104,120" fill="currentColor" opacity="0.25" />
      <polygon points="192,100 120,96 130,100 120,104" fill="currentColor" opacity="0.35" />
      <polygon points="8,100 80,104 70,100 80,96" fill="currentColor" opacity="0.35" />
      <polygon points="166,34 115,90 118,86 112,88" fill="currentColor" opacity="0.15" />
      <polygon points="166,166 118,114 115,110 112,112" fill="currentColor" opacity="0.15" />
      <polygon points="34,166 86,118 90,115 88,112" fill="currentColor" opacity="0.15" />
      <polygon points="34,34 88,88 90,85 86,82" fill="currentColor" opacity="0.15" />
      <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
      <circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.4" />
      <circle cx="100" cy="100" r="2" fill="currentColor" opacity="0.15" />
    </svg>
  )
}
