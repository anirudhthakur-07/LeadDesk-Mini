'use client';

import { useMemo } from 'react';
import { Users, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';

export default function AnalyticsGrid({ metrics, leads = [], loading = false }) {
  // Compute pipeline metrics and conversion rate
  const computedMetrics = useMemo(() => {
    const total = leads.length || metrics?.total || 0;
    const newLeads = leads.filter((l) => l.status === 'New').length || metrics?.newLeads || 0;
    const contacted = leads.filter((l) => l.status === 'Contacted').length || metrics?.contacted || 0;
    const closed = leads.filter((l) => l.status === 'Closed').length || metrics?.closed || 0;

    const conversionRate = total > 0 ? ((closed / total) * 100).toFixed(1) : '0.0';

    return {
      total,
      newLeads,
      contacted,
      closed,
      conversionRate,
    };
  }, [leads, metrics]);

  return (
    <section aria-label="Pipeline Metrics Overview" className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Total Leads */}
        <AnalyticsCard
          title="Total Leads"
          value={computedMetrics.total}
          subtitle="Database Total Record Count"
          badgeText="All Pipeline"
          badgeVariant="neutral"
          icon={Users}
          loading={loading}
          borderTrimColor="border-l-2 border-l-zinc-500"
        />

        {/* Card 2: New Inquiries */}
        <AnalyticsCard
          title="New Inquiries"
          value={computedMetrics.newLeads}
          subtitle="Requires Initial Outreach"
          badgeText="Action Needed"
          badgeVariant="info"
          icon={Sparkles}
          loading={loading}
          borderTrimColor="border-l-2 border-l-teal-500"
        />

        {/* Card 3: In Communication */}
        <AnalyticsCard
          title="In Communication"
          value={computedMetrics.contacted}
          subtitle="Outreach In Progress"
          badgeText="Active Negotiation"
          badgeVariant="warning"
          icon={MessageSquare}
          loading={loading}
          borderTrimColor="border-l-2 border-l-amber-500"
        />

        {/* Card 4: Closed Converted */}
        <AnalyticsCard
          title="Closed Converted"
          value={computedMetrics.closed}
          subtitle={`${computedMetrics.conversionRate}% Conversion Rate`}
          badgeText={`${computedMetrics.conversionRate}% Converted`}
          badgeVariant="success"
          icon={CheckCircle2}
          loading={loading}
          borderTrimColor="border-l-2 border-l-emerald-500"
        />
      </div>
    </section>
  );
}
