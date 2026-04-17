'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Users, FileText, AlertTriangle, Wallet } from 'lucide-react'
import { adminQueries } from '@/lib/admin/api'

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export function FinancialKPIs() {
  const { data: reserves } = useSuspenseQuery(adminQueries.reserves())
  const { data: forecast } = useSuspenseQuery(adminQueries.forecast())

  return (
    <>
      <motion.div variants={item} className="bg-surface p-6 rounded-xl border border-surface-border transition-all hover:bg-surface-card">
        <div className="flex items-center justify-between mb-4">
          <Users className="h-5 w-5 text-brand-primary" />
          <span className="text-xs font-mono text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded">+12.5%</span>
        </div>
        <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">Total workers</p>
        <h3 className="text-3xl font-bold font-mono text-text-primary">
          {reserves?.active_policies ? (reserves.active_policies * 4.2).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '-'}
        </h3>
      </motion.div>
      
      <motion.div variants={item} className="bg-surface p-6 rounded-xl border border-surface-border transition-all hover:bg-surface-card">
        <div className="flex items-center justify-between mb-4">
          <FileText className="h-5 w-5 text-brand-primary" />
          <span className="text-xs font-mono text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded">Active</span>
        </div>
        <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">Active policies</p>
        <h3 className="text-3xl font-bold font-mono text-text-primary">
          {reserves?.active_policies?.toLocaleString('en-IN') ?? '-'}
        </h3>
      </motion.div>

      <motion.div variants={item} className="bg-surface p-6 rounded-xl border border-surface-border transition-all hover:bg-surface-card">
        <div className="flex items-center justify-between mb-4">
          <AlertTriangle className="h-5 w-5 text-status-danger" />
          <span className="text-[10px] font-mono text-status-danger bg-status-danger/10 border border-status-danger/30 px-2 py-0.5 rounded uppercase tracking-wider">Critical</span>
        </div>
        <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">Pending claims</p>
        <h3 className="text-3xl font-bold font-mono text-text-primary">
          {forecast?.total_claims?.toLocaleString('en-IN') ?? '-'}
        </h3>
      </motion.div>

      <motion.div variants={item} className="bg-surface p-6 rounded-xl border border-surface-border transition-all hover:bg-surface-card">
        <div className="flex items-center justify-between mb-4">
          <Wallet className="h-5 w-5 text-text-primary" />
          <span className="text-[10px] font-mono text-text-muted bg-surface-border/50 px-2 py-0.5 rounded uppercase tracking-wider">YTD</span>
        </div>
        <p className="text-[10px] text-text-muted uppercase tracking-widest mb-1">Total payouts</p>
        <h3 className="text-3xl font-bold font-mono text-text-primary">
          {forecast?.total_payout ? `₹${(forecast.total_payout / 1000).toFixed(1)}k` : '-'}
        </h3>
      </motion.div>
    </>
  )
}
