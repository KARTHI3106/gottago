'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { adminQueries } from '@/lib/admin/api'
import { ClaimsForecast } from '@/components/claims-forecast'

export function PayoutChart() {
  const { data: forecast } = useSuspenseQuery(adminQueries.forecast())

  const chartData = forecast?.daily?.map((d) => ({
    date: d.date,
    rain_trigger_prob: d.rain_trigger_prob,
    heat_trigger_prob: d.heat_trigger_prob,
    aqi_trigger_prob: d.aqi_trigger_prob,
    estimated_claims: d.count,
    estimated_payout: d.payout,
  })) ?? []

  return (
    <div className="lg:col-span-2 bg-surface rounded-xl border border-surface-border p-6 sm:p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-lg font-bold text-text-primary">Weekly claims forecast</h3>
          <p className="text-sm text-text-secondary">Projected risk vs historical average</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
            <span className="text-xs text-text-secondary">Projected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-surface-border"></div>
            <span className="text-xs text-text-secondary">Baseline</span>
          </div>
        </div>
      </div>
      <div className="h-72 w-full">
        <ClaimsForecast data={chartData} isLoading={false} />
      </div>
    </div>
  )
}
