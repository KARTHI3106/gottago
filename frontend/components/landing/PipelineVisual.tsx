'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  FileInput,
  ShieldCheck,
  Radio,
  Fingerprint,
  GitFork,
  FlaskConical,
  ClipboardCheck,
} from 'lucide-react'

const PIPELINE_STAGES = [
  {
    step: '01',
    title: 'Claim Intake',
    summary: 'Multi-channel ingestion',
    description:
      'Workers file claims via app, WhatsApp, or USSD. Each submission is validated, deduplicated, and assigned a unique claim ID within seconds.',
    icon: FileInput,
    color: '#3b82f6',
  },
  {
    step: '02',
    title: 'Policy Eligibility',
    summary: 'Smart coverage verification',
    description:
      'Real-time check against active policies, coverage limits, cooldown windows, and zone restrictions. Invalid claims are rejected with clear reason codes.',
    icon: ShieldCheck,
    color: '#8b5cf6',
  },
  {
    step: '03',
    title: 'Signal Fusion',
    summary: '5-source weather intelligence',
    description:
      'Rain, heat, AQI, bandh, and compound disruption signals are fused from IMD, CPCB, news feeds, and satellite data into a single disruption confidence score.',
    icon: Radio,
    color: '#06b6d4',
  },
  {
    step: '04',
    title: 'Fraud + Trust',
    summary: 'Behavioral fingerprinting',
    description:
      'XGBoost model analyzes claim patterns, GPS consistency, earning history, and device fingerprints. Suspicious claims are flagged for manual review.',
    icon: Fingerprint,
    color: '#f59e0b',
  },
  {
    step: '05',
    title: 'Decision Router',
    summary: 'Autonomous adjudication',
    description:
      'Rules engine combines signal confidence, fraud score, and policy terms to auto-approve, escalate, or deny. 94% of claims are decided in under 60 seconds.',
    icon: GitFork,
    color: '#22c55e',
  },
  {
    step: '06',
    title: 'Sandbox Settlement',
    summary: 'Simulated payout validation',
    description:
      'Before real money moves, each payout is dry-run through the reserve pool simulator to verify liquidity, confirm amount calculations, and stress-test edge cases.',
    icon: FlaskConical,
    color: '#ec4899',
  },
  {
    step: '07',
    title: 'Release + Audit Trail',
    summary: 'Immutable payout record',
    description:
      'UPI payout is triggered. Every decision, signal, and timestamp is logged to an append-only audit table for regulatory compliance and dispute resolution.',
    icon: ClipboardCheck,
    color: '#14b8a6',
  },
]

function StageCard({
  stage,
  index,
}: {
  stage: (typeof PIPELINE_STAGES)[0]
  index: number
}) {
  const Icon = stage.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="gh-pipeline-stage-card"
    >
      <div className="gh-pipeline-stage-inner">
        <div className="gh-pipeline-stage-copy">
          <div className="gh-pipeline-step-badge" style={{ color: stage.color }}>
            {stage.step}
          </div>
          <h3 className="gh-pipeline-stage-title">{stage.title}</h3>
          <p className="gh-pipeline-stage-summary" style={{ color: stage.color }}>
            {stage.summary}
          </p>
          <p className="gh-pipeline-stage-desc">{stage.description}</p>
        </div>

        <div className="gh-pipeline-stage-visual" style={{ background: `${stage.color}08` }}>
          <div
            className="gh-pipeline-stage-icon-ring"
            style={{
              borderColor: `${stage.color}30`,
              boxShadow: `0 0 60px ${stage.color}20`,
            }}
          >
            <Icon size={36} color={stage.color} strokeWidth={1.6} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function PipelineVisual() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="gh-pipeline-section">
      <div className="gh-pipeline-shell">
        <div className="gh-pipeline-header">
          <span className="gh-pipeline-kicker">The GottaGO Claim Pipeline</span>
          <h2>
            7-Layer Claim
            <br />
            Defense System
          </h2>
          <p>
            Every claim passes through seven autonomous stages, from intake to payout release.
            No human bottlenecks. No delays. No corners cut.
          </p>
        </div>

        <div className="gh-pipeline-stages">
          {PIPELINE_STAGES.map((stage, i) => (
            <StageCard key={stage.step} stage={stage} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
