export function exportLeadsToCSV(leads, filename = 'leads_export.csv') {
  if (!leads || leads.length === 0) return;

  const headers = ['Name', 'Email', 'Budget Range', 'Status', 'Date Submitted', 'Project Message'];

  const rows = leads.map((lead) => [
    `"${(lead.fullName || '').replace(/"/g, '""')}"`,
    `"${(lead.email || '').replace(/"/g, '""')}"`,
    `"${(lead.budgetRange || '').replace(/"/g, '""')}"`,
    `"${(lead.status || '').replace(/"/g, '""')}"`,
    `"${new Date(lead.createdAt).toISOString()}"`,
    `"${(lead.message || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
