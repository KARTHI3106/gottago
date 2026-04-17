export interface ReserveData {
  active_policies: number;
  total_reserve: number;
  solvency_ratio: number;
  weekly_premium_pool: number;
  pending_payout_liability: number;
  reserve_ratio: number;
  signal: 'green' | 'red' | 'amber';
  recommendation: string;
}

export interface ForecastDaily {
  date: string;
  count: number;
  payout: number;
  rain_trigger_prob: number;
  heat_trigger_prob: number;
  aqi_trigger_prob: number;
}

export interface ForecastData {
  total_claims: number;
  total_payout: number;
  daily: ForecastDaily[];
}

export interface ZoneRisk {
  zone_id: string;
  zone_name: string;
  city: string;
  lat: number;
  lon: number;
  flood_risk: number;
  aqi_risk: number;
  combined_risk: number;
}
