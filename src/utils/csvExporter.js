/**
 * Sanitizes strings to prevent CSV Formula Injection (OWASP CSV Injection / CWE-1236)
 * If a cell string starts with =, +, -, @, \t, or \r, prefix with a single quote to force literal text rendering in Excel/Sheets.
 */
function sanitizeCSVField(val) {
  if (val === null || val === undefined) return '""';
  let str = String(val).trim();

  // Escape formula injection characters
  if (/^[=+@\-\t\r]/.test(str)) {
    str = `'${str}`;
  }

  // Escape internal double quotes for CSV standard RFC 4180
  const escapedStr = str.replace(/"/g, '""');
  return `"${escapedStr}"`;
}

export function exportLeadsToCSV(leads, filename = 'leaddesk_leads_export.csv') {
  if (!leads || leads.length === 0) return;

  // Explicit, safe public export headers (zero internal DB fields, zero JWTs)
  const headers = ['Full Name', 'Work Email', 'Budget Range', 'Pipeline Status', 'Date Submitted (UTC)', 'Project Message'];

  const rows = leads.map((lead) => [
    sanitizeCSVField(lead.fullName),
    sanitizeCSVField(lead.email),
    sanitizeCSVField(lead.budgetRange),
    sanitizeCSVField(lead.status),
    sanitizeCSVField(lead.createdAt ? new Date(lead.createdAt).toISOString() : ''),
    sanitizeCSVField(lead.message),
  ]);

  // Join headers and rows with standard CRLF
  const csvText = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  // Prepend UTF-8 BOM (\uFEFF) for seamless Microsoft Excel & Google Sheets character encoding compatibility
  const blob = new Blob(['\uFEFF' + csvText], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
