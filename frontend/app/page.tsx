'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Shield,
  ArrowRight,
  CheckCircle,
  Database,
  Brain,
  Radio,
  Fingerprint,
  BarChart3,
  Cpu,
  CloudRain,
  Thermometer,
  Wind,
  Zap,
  Clock,
  Users,
  Github,
} from 'lucide-react'

import { TechStackMarquee } from '@/components/landing/TechStackMarquee'

const PipelineVisual = dynamic(
  () => import('@/components/landing/PipelineVisual').then((m) => ({ default: m.PipelineVisual })),
  { ssr: false }
)

const HowItWorks = dynamic(
  () => import('@/components/landing/HowItWorks').then((m) => ({ default: m.HowItWorks })),
  { ssr: false }
)

const ARCH_CARDS = [
  {
    title: 'Supabase + PostgreSQL',
    desc: 'Edge-first backend with Row-Level Security, real-time subscriptions, and zero-downtime migrations.',
    icon: Database,
    tone: 'tone-indigo',
  },
  {
    title: 'XGBoost Pricing',
    desc: 'Gradient-boosted model trained on zone risk, AQI history, seasonal patterns, and earning frequency.',
    icon: Brain,
    tone: 'tone-cyan',
  },
  {
    title: 'Signal Fusion Engine',
    desc: '5-source parametric signal aggregation: IMD weather, CPCB AQI, bandh feeds, heat index, and compound scoring.',
    icon: Radio,
    tone: 'tone-blue',
  },
  {
    title: 'Fraud Detection',
    desc: 'Behavioral fingerprinting with GPS consistency, claim velocity, device trust, and earning pattern analysis.',
    icon: Fingerprint,
    tone: 'tone-amber',
  },
  {
    title: 'FastAPI Backend',
    desc: 'Async Python API with automatic OpenAPI docs, Pydantic validation, and sub-100ms response times.',
    icon: Cpu,
    tone: 'tone-emerald',
  },
  {
    title: 'Real-Time Dashboard',
    desc: 'Live claims monitoring, financial KPIs, fraud heatmaps, and trigger management for operations teams.',
    icon: BarChart3,
    tone: 'tone-rose',
  },
]

const VALUE_PROPS = [
  'Zero paperwork, ever',
  'Auto payouts in 2 hours',
  'Rs.80-318/week',
  'Mumbai / Delhi / Bengaluru',
]

const TRIGGERS = [
  { icon: CloudRain, label: 'Heavy Rain', payout: 'Rs.300', color: '#3b82f6' },
  { icon: Thermometer, label: 'Extreme Heat', payout: 'Rs.360', color: '#f97316' },
  { icon: Wind, label: 'Severe AQI', payout: 'Rs.240', color: '#8b5cf6' },
  { icon: Shield, label: 'Govt. Bandh', payout: 'Rs.480', color: '#ef4444' },
  { icon: Zap, label: 'Compound', payout: 'Rs.300', color: '#eab308' },
]

export default function HomePage() {
  return (
    <div className="project-site">
      {/* ── Navbar ────────────────────────────────────────────── */}
      <nav className="project-navbar">
        <div className="project-navbar-inner">
          <Link href="/" className="project-brand-wrap">
            <div className="project-logo-chip">
              <Shield size={16} />
            </div>
            <span className="project-brand">GottaGO</span>
          </Link>

          <div className="project-actions">
            <Link href="/admin" className="project-link-ghost">Admin</Link>
            <Link href="/register" className="project-link-primary">Register</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="project-hero project-hero-template">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="project-announcement"
        >
          <span className="project-announcement-dot" />
          Now live in Mumbai, Delhi, and Bengaluru
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Income protection for gig workers
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="project-subtext"
        >
          When rain, extreme heat, or a bandh destroys your earning day, GottaGO pays you
          automatically. Zero paperwork. Zero calls. Payout in 2 hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="project-cta-row"
        >
          <Link href="/register" className="project-hero-primary">
            Get Covered Now
            <ArrowRight size={16} />
          </Link>
          <Link href="/dashboard?worker_id=demo" className="project-hero-secondary">
            View Demo Dashboard
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="project-value-row"
        >
          {VALUE_PROPS.map((value) => (
            <span key={value} className="project-value-item">
              <CheckCircle size={14} color="#22c55e" />
              {value}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── Tech Stack Marquee ───────────────────────────────── */}
      <TechStackMarquee />

      {/* ── 5 Triggers Strip ─────────────────────────────────── */}
      <section style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        background: '#ffffff',
        padding: '64px 0',
        borderBottom: '1px solid #e2e8f0',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <p style={{
            textAlign: 'center',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: '#94a3b8',
            marginBottom: 32,
          }}>
            5 Parametric Triggers - We watch. You work.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 16,
          }}>
            {TRIGGERS.map(({ icon: Icon, label, payout, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  textAlign: 'center',
                  padding: '28px 16px',
                  borderRadius: 16,
                  border: '1px solid #e2e8f0',
                  background: '#fafafa',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'default',
                }}
                whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: `${color}12`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                }}>
                  <Icon size={22} color={color} />
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>{label}</p>
                <p style={{ fontSize: 15, fontWeight: 700, color }}>{payout}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture Cards ───────────────────────────────── */}
      <section className="project-architecture">
        <div className="project-architecture-shell">
          <div className="project-section-head">
            <div>
              <h2>Built for reliability at scale</h2>
              <p className="project-section-lead">
                Six production-grade systems working together to deliver instant, trustworthy income
                protection for gig workers across India.
              </p>
            </div>
          </div>

          <div className="project-arch-grid">
            {ARCH_CARDS.map(({ title, desc, icon: Icon, tone }, i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="project-arch-card"
              >
                <div className={`project-arch-visual ${tone}`}>
                  <div className="project-arch-icon-wrap">
                    <Icon size={48} />
                  </div>
                  <div className="project-arch-badge">
                    <p>{title}</p>
                  </div>
                </div>
                <div className="project-arch-copy">
                  <p>{desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pipeline Visual ──────────────────────────────────── */}
      <PipelineVisual />

      {/* ── Impact Stats ─────────────────────────────────────── */}
      <section className="project-pipeline-section">
        <div className="project-pipeline-grid">
          <div className="project-pipeline-left">
            <span className="project-pipeline-kicker">Real Impact</span>
            <h2>Numbers that matter</h2>
            <p>
              Our parametric model eliminates the friction of traditional insurance.
              No adjusters, no forms, no delays.
            </p>
          </div>

          <div className="project-pipeline-cards">
            {[
              { num: '<2hr', title: 'Payout Speed', desc: 'From trigger fire to UPI credit. Fully automated.' },
              { num: '94%', title: 'Auto-Approved', desc: 'Claims processed without any human intervention.' },
              { num: '5', title: 'Signal Sources', desc: 'IMD, CPCB, news feeds, satellite, and compound scoring.' },
            ].map((stat, i) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="project-pipeline-stat-card"
              >
                <div className="project-pipeline-number">{stat.num}</div>
                <p className="project-pipeline-stat-title">{stat.title}</p>
                <p className="project-pipeline-stat-desc">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <HowItWorks />

      {/* ── Dual Portal CTA ──────────────────────────────────── */}
      <section className="project-dual">
        <div className="project-dual-shell">
          <h2>Two portals. One mission.</h2>

          <div className="project-dual-grid">
            <Link href="/register" className="project-dual-card left">
              <div>
                <p className="tag">Worker Portal</p>
                <h3>Get covered in 60 seconds</h3>
              </div>
              <span className="cta-label">
                Register Now <ArrowRight size={14} />
              </span>
            </Link>

            <Link href="/admin" className="project-dual-card right">
              <div>
                <p className="tag">Admin Dashboard</p>
                <h3>Monitor and manage</h3>
              </div>
              <span className="cta-label">
                Open Dashboard <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="project-footer-template">
        <div className="project-footer-shell">
          <div className="project-footer-grid">
            <div className="project-footer-brand-block">
              <Link href="/" className="project-footer-brand">
                <Shield size={18} color="#6366f1" />
                GottaGO
              </Link>
              <p style={{ fontSize: 14, color: '#64748b', marginTop: 16, lineHeight: 1.6 }}>
                Parametric income protection for India&apos;s delivery workforce.
              </p>
            </div>

            <div className="project-footer-columns">
              <div>
                <p>Product</p>
                <Link href="/register">Get Covered</Link>
                <Link href="/dashboard?worker_id=demo">Demo Dashboard</Link>
                <Link href="/admin">Admin Portal</Link>
              </div>
              <div>
                <p>Coverage</p>
                <a href="#">Heavy Rain</a>
                <a href="#">Extreme Heat</a>
                <a href="#">Severe AQI</a>
                <a href="#">Govt. Bandh</a>
              </div>
              <div>
                <p>Cities</p>
                <a href="#">Mumbai</a>
                <a href="#">Delhi NCR</a>
                <a href="#">Bengaluru</a>
              </div>
              <div>
                <p>Company</p>
                <a href="#">About</a>
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
              </div>
            </div>
          </div>

          <div className="project-footer-bottom">
            <p>&copy; {new Date().getFullYear()} GottaGO. Parametric income protection.</p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0f172a' }}
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
