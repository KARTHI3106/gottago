'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Database,
  Code2,
  Layers,
  Globe,
  Server,
  Container,
  Flame,
  Cpu,
  BarChart3,
  Fingerprint,
} from 'lucide-react'

const TECH_STACK = [
  { name: 'Supabase', icon: Database, color: '#3ecf8e' },
  { name: 'PostgreSQL', icon: Server, color: '#336791' },
  { name: 'Next.js', icon: Globe, color: '#000000' },
  { name: 'TypeScript', icon: Code2, color: '#3178c6' },
  { name: 'React', icon: Layers, color: '#61dafb' },
  { name: 'FastAPI', icon: Cpu, color: '#009688' },
  { name: 'Python', icon: Code2, color: '#3776ab' },
  { name: 'Docker', icon: Container, color: '#2496ed' },
  { name: 'Firebase', icon: Flame, color: '#ffca28' },
  { name: 'XGBoost', icon: BarChart3, color: '#ff6600' },
  { name: 'Vercel', icon: Globe, color: '#000000' },
  { name: 'Fingerprint', icon: Fingerprint, color: '#6366f1' },
]

export function TechStackMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let animationId: number
    let position = 0
    const speed = 0.5

    function animate() {
      position -= speed
      const firstChild = track?.firstElementChild as HTMLElement | null
      if (firstChild && Math.abs(position) >= firstChild.offsetWidth + 96) {
        position += firstChild.offsetWidth + 96
        track?.appendChild(firstChild)
      }
      if (track) {
        track.style.transform = `translateX(${position}px)`
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  const allItems = [...TECH_STACK, ...TECH_STACK]

  return (
    <div className="project-tech-marquee">
      <div className="project-tech-header">
        <span className="project-tech-label">
          Powered by industry leaders and state-of-the-art open source
        </span>
      </div>

      <div className="project-tech-carousel">
        <div className="project-tech-fade-left" />
        <div className="project-tech-fade-right" />

        <div className="project-tech-inner-track">
          <div ref={trackRef} className="project-tech-motion-track" style={{ willChange: 'transform' }}>
            {allItems.map(({ name, icon: Icon, color }, i) => (
              <div key={`${name}-${i}`} className="project-tech-item">
                <div className="project-tech-icon-shell">
                  <Icon size={28} color={color} strokeWidth={1.8} />
                </div>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
