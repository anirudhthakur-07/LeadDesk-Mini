'use client';

import AnalyticsGrid from './dashboard/AnalyticsGrid';

export default function MetricsBar({ metrics, leads, loading }) {
  return <AnalyticsGrid metrics={metrics} leads={leads} loading={loading} />;
}
