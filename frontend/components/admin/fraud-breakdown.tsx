'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { Map } from 'lucide-react'
import { adminQueries } from '@/lib/admin/api'
import dynamic from 'next/dynamic'

const FraudHeatmap = dynamic(
  () => import('@/components/fraud-heatmap').then((mod) => mod.FraudHeatmap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] sm:h-[400px] bg-surface-card rounded-xl flex items-center justify-center">
        <p className="text-sm text-text-muted">Loading map...</p>
      </div>
    ),
  }
)

export function FraudBreakdown() {
  const { data: zones } = useSuspenseQuery(adminQueries.zones())

  return (
    <div className="bg-surface rounded-xl border border-surface-border p-6">
      <div className="flex items-center gap-2 mb-2">
        <Map className="h-4 w-4 text-text-muted" />
        <h3 className="text-lg font-bold text-text-primary">Fraud risk heatmap</h3>
      </div>
      <p className="text-xs text-text-secondary mb-6">Real-time anomaly detection by region</p>
      <div className="h-64">
        <FraudHeatmap zones={zones} />
      </div>
    </div>
  )
}
