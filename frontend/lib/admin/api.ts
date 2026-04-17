import { ReserveData, ForecastData, ZoneRisk } from './types'

export const fetchReserves = async (): Promise<ReserveData> => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { 
    active_policies: 14250, 
    total_reserve: 8500000, 
    solvency_ratio: 2.4,
    weekly_premium_pool: 65000,
    pending_payout_liability: 3200000,
    reserve_ratio: 1.8,
    signal: 'green',
    recommendation: 'Maintain current liquidity protocol'
  }
}

export const fetchForecast = async (): Promise<ForecastData> => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    total_claims: 842,
    total_payout: 4200000,
    daily: [
      { date: 'Mon', count: 45, payout: 500000, rain_trigger_prob: 0.3, heat_trigger_prob: 0.2, aqi_trigger_prob: 0.1 },
      { date: 'Tue', count: 60, payout: 750000, rain_trigger_prob: 0.4, heat_trigger_prob: 0.3, aqi_trigger_prob: 0.1 },
      { date: 'Wed', count: 35, payout: 350000, rain_trigger_prob: 0.2, heat_trigger_prob: 0.5, aqi_trigger_prob: 0.2 },
      { date: 'Thu', count: 90, payout: 1100000, rain_trigger_prob: 0.8, heat_trigger_prob: 0.2, aqi_trigger_prob: 0.1 },
      { date: 'Fri', count: 75, payout: 850000, rain_trigger_prob: 0.6, heat_trigger_prob: 0.1, aqi_trigger_prob: 0.3 },
      { date: 'Sat', count: 40, payout: 400000, rain_trigger_prob: 0.1, heat_trigger_prob: 0.4, aqi_trigger_prob: 0.5 },
      { date: 'Sun', count: 25, payout: 250000, rain_trigger_prob: 0.1, heat_trigger_prob: 0.3, aqi_trigger_prob: 0.6 },
    ],
  }
}

export const fetchZones = async (): Promise<ZoneRisk[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return [
    { zone_id: 'mumbai_01', zone_name: 'Andheri East', city: 'Mumbai', lat: 19.1136, lon: 72.8697, flood_risk: 0.85, aqi_risk: 0.3, combined_risk: 0.65 },
    { zone_id: 'mumbai_02', zone_name: 'Bandra Kurla Complex', city: 'Mumbai', lat: 19.0616, lon: 72.8498, flood_risk: 0.75, aqi_risk: 0.4, combined_risk: 0.55 },
    { zone_id: 'delhi_01', zone_name: 'Connaught Place', city: 'Delhi', lat: 28.6315, lon: 77.2167, flood_risk: 0.20, aqi_risk: 0.95, combined_risk: 0.80 },
    { zone_id: 'delhi_02', zone_name: 'Okhla Industrial', city: 'Delhi', lat: 28.5355, lon: 77.2842, flood_risk: 0.30, aqi_risk: 0.85, combined_risk: 0.70 },
  ]
}

export const adminQueries = {
  reserves: () => ({ queryKey: ['admin', 'reserves'] as const, queryFn: fetchReserves }),
  forecast: () => ({ queryKey: ['admin', 'forecast'] as const, queryFn: fetchForecast }),
  zones: () => ({ queryKey: ['admin', 'zones'] as const, queryFn: fetchZones }),
}
