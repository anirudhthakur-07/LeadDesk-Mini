'use client';

import { useMemo } from 'react';
import { Users, AlertCircle, PhoneCall, CheckCircle, Percent, TrendingUp } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';

export default function AnalyticsGrid({ metrics, leads, loading = false }) {
  // Compute analytics live from master dataset as fallback/verification
  const computedMetrics = useMemo(() => {
    if (!Array.isArray(leads)) {
      return {
        total: metrics?.total || 0,
        newLeads: metrics?.newLeads || 0,
        contacted: metrics?.contacted || 0,
        closed: metrics?.closed || 0,
        conversionRate: '0.0%',
      };
    }

    const total = leads.length;
    const newLeads = leads.filter((l) => l.status === 'New').length;
    const contacted = leads.filter((l) => l.status === 'Contacted').length;
    const closed = leads.filter((l) => l.status === 'Closed').length;
    const conversionRate = total > 0 ? `${((closed / total) * 100).toFixed(1)}%` : '0.0%';

    return { total, newLeads, contacted, closed, conversionRate };
  }, [leads, metrics]);

  return (
    <section aria-label="CRM Analytics Overview" className="mb-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Card 1: Total Leads */}
        <AnalyticsCard
          title="Total Leads"
          value={computedMetrics.total}
          subtitle="All active agency inquiries"
          icon={Users}
          badgeText="Full Pipeline"
          badgeColor="bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
          iconColor="text-indigo-400"
          iconBg="bg-indigo-500/10 border-indigo-500/20"
          borderColor="border-indigo-500/20 hover:border-indigo-500/40"
          loading={loading}
        />

        {/* Card 2: New Leads */}
        <AnalyticsCard
          title="New Inquiries"
          value={computedMetrics.newLeads}
          subtitle="Awaiting initial review"
          icon={AlertCircle}
          badgeText="Requires Action"
          badgeColor="bg-blue-500/10 text-blue-400 border-blue-500/20"
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10 border-blue-500/20"
          borderColor="border-blue-500/20 hover:border-blue-500/40"
          loading={loading}
        />

        {/* Card 3: Contacted Leads */}
        <AnalyticsCard
          title="In Communication"
          value={computedMetrics.contacted}
          subtitle="Active proposal outreach"
          icon={PhoneCall}
          badgeText="Outreach Active"
          badgeColor="bg-amber-500/10 text-amber-400 border-amber-500/20"
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10 border-amber-500/20"
          borderColor="border-amber-500/20 hover:border-amber-500/40"
          loading={loading}
        />

        {/* Card 4: Closed Deals / Conversion Rate */}
        <AnalyticsCard
          title="Closed Converted"
          value={computedMetrics.closed}
          subtitle={`Conversion Rate: ${computedMetrics.conversionRate}`}
          icon={CheckCircle}
          badgeText={computedMetrics.conversionRate}
          badgeColor="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10 border-emerald-500/20"
          borderColor="border-emerald-500/20 hover:border-emerald-500/40"
          loading={loading}
        />

      </div>
    </section>
  );
}
