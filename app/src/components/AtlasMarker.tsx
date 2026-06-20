// app/src/components/AtlasMarker.tsx
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import type { MapPoint } from '../data/mapData'

interface AtlasMarkerProps {
  point: MapPoint
  isActive: boolean
  isVisible: boolean
  onClick: (point: MapPoint) => void
  onHover: (point: MapPoint | null) => void
}

export default function AtlasMarker({ point, isActive, isVisible, onClick, onHover }: AtlasMarkerProps) {
  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (circleRef.current) {
      gsap.fromTo(
        circleRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: isVisible ? 1 : 0.3,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: circleRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }
  }, [isVisible])

  const getColor = (): string => {
    switch (point.type) {
      case 'mountain': return '#4A4A4A'
      case 'river':    return '#5C7A7A'
      case 'beast':    return '#C9A96E'
      case 'kingdom':  return '#8B1A1A'
      case 'plant':    return '#6B8E6B'
    }
  }

  const getSize = (): number => {
    switch (point.type) {
      case 'beast':   return 8
      case 'mountain': return 6
      case 'kingdom':  return 10
      default:         return 5
    }
  }

  const size = getSize()
  const color = getColor()

  return (
    <g
      style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
      opacity={isVisible ? 1 : 0.2}
      onClick={() => onClick(point)}
      onMouseEnter={() => onHover(point)}
      onMouseLeave={() => onHover(null)}
    >
      {/* 外圈光晕（激活时显示） */}
      {isActive && (
        <circle
          cx={point.x}
          cy={point.y}
          r={size + 6}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          opacity={0.4}
        >
          <animate
            attributeName="r"
            values={`${size + 4};${size + 10};${size + 4}`}
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.4;0.1;0.4"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* 标记点主体 */}
      {point.type === 'kingdom' ? (
        <rect
          x={point.x - size / 2}
          y={point.y - size / 2}
          width={size}
          height={size}
          fill={color}
          rx={2}
          transform={`rotate(45, ${point.x}, ${point.y})`}
        />
      ) : (
        <circle
          ref={circleRef}
          cx={point.x}
          cy={point.y}
          r={size}
          fill={color}
          stroke="var(--ivory)"
          strokeWidth={1.5}
        />
      )}

      {/* 名称标签（激活/悬停时显示） */}
      <text
        x={point.x}
        y={point.y - size - 8}
        textAnchor="middle"
        fill={color}
        fontFamily="var(--font-calligraphy)"
        fontSize={point.type === 'beast' ? 13 : 11}
        opacity={isActive ? 1 : 0}
        style={{ transition: 'opacity 0.2s ease', pointerEvents: 'none' }}
      >
        {point.name}
      </text>
    </g>
  )
}
