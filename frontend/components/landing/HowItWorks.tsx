'use client'

import { motion } from 'framer-motion'
import {
  UserPlus,
  BarChart3,
  CloudRain,
  Banknote,
  Shield,
} from 'lucide-react'

const STEPS = [
  {
    num: '01',
    tag: 'Onboarding',
    title: 'Register in 60 seconds',
    summary: 'Name, phone, zone, and go.',
    desc: 'No KYC documents needed for the basic plan. Enter your delivery platform, zone, and weekly hours. Premium is calculated instantly using our XGBoost pricing model.',
    icon: UserPlus,
    cardColor: '#3b82f6',
    cardBg: '#dbeafe',
  },
  {
    num: '02',
    tag: 'Coverage',
    title: 'Pick your plan',
    summary: 'Rs.80-318 per week.',
    desc: 'Choose from Basic, Standard, or Premium tiers. Each covers different trigger combinations. Premiums adjust based on your zone risk, historical weather patterns, and AQI data.',
    icon: BarChart3,
    cardColor: '#8b5cf6',
    cardBg: '#ede9fe',
  },
  {
    num: '03',
    tag: 'Monitoring',
    title: 'We watch 24/7',
    summary: 'Five signals, always on.',
    desc: 'Our signal fusion engine monitors rain from IMD, temperature from CPCB, air quality indices, government bandh declarations, and compound disruption scores in real time.',
    icon: CloudRain,
    cardColor: '#059669',
    cardBg: '#d1fae5',
  },
  {
    num: '04',
    tag: 'Payout',
    title: 'Auto payout in 2 hours',
    summary: 'No claims form. No phone calls.',
    desc: 'When a trigger fires, your claim is created automatically. It passes through our 7-layer pipeline and lands in your UPI account within 2 hours. You get a WhatsApp notification the moment it hits.',
    icon: Banknote,
    cardColor: '#dc2626',
    cardBg: '#fee2e2',
  },
  {
    num: '05',
    tag: 'Protection',
    title: 'Transparent trail',
    summary: 'Every decision logged.',
    desc: 'View your claim history, signal data, fraud scores, and payout receipts anytime in your dashboard. Full audit trail for complete transparency and dispute resolution.',
    icon: Shield,
    cardColor: '#0891b2',
    cardBg: '#cffafe',
  },
]

export function HowItWorks() {
  return (
    <div className="project-how-it-works">
      <div className="project-how-container">
        <div className="project-how-header">
          <h2>
            How it works
            <span>Five steps to total income protection</span>
          </h2>
          <p>
            From registration to payout, the entire flow is automated.
            No middlemen, no delays, no surprise denials.
          </p>
        </div>

        <div className="project-how-cards">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="project-how-card"
                style={{
                  '--card-color': step.cardColor,
                  '--card-bg': step.cardBg,
                } as React.CSSProperties}
              >
                <div className="project-how-card-content">
                  <span className="project-how-num">{step.num}</span>
                  <span className="project-how-sublabel">{step.tag}</span>
                  <h3>{step.title}</h3>
                  <p className="project-how-summary">{step.summary}</p>
                  <p className="project-how-desc">{step.desc}</p>
                </div>

                <div className="project-how-visual">
                  <div className="project-how-viz-content">
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: `${step.cardColor}15`,
                        border: `2px solid ${step.cardColor}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                      }}
                    >
                      <Icon size={36} color={step.cardColor} strokeWidth={1.6} />
                    </div>
                    <p
                      style={{
                        textAlign: 'center',
                        fontSize: 14,
                        fontWeight: 600,
                        color: step.cardColor,
                        opacity: 0.8,
                        marginTop: 12,
                      }}
                    >
                      {step.summary}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
