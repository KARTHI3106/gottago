'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { adminQueries } from '@/lib/admin/api'
import { ReservePanel } from '@/components/reserve-panel'

export function LiquidityReserves() {
  const { data: reserves } = useSuspenseQuery(adminQueries.reserves())

  return (
    <div className="bg-surface rounded-xl border border-surface-border p-6 sm:p-8 flex flex-col items-center">
      <div className="w-full flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-text-primary">Liquidity reserve</h3>
          <p className="text-sm text-text-secondary">Solvency status across pools</p>
        </div>
      </div>
      <div className="flex-1 w-full flex items-center justify-center">
        <ReservePanel data={reserves} isLoading={false} />
      </div>
    </div>
  )
}
