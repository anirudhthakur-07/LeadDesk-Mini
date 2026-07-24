import { validateCreateLeadPayload, validateUpdateLeadStatusPayload } from '../leadValidator';

describe('leadValidator Unit Tests', () => {
  test('validates correct lead submission payload', () => {
    const payload = {
      fullName: 'Sarah Jenkins',
      email: 'sarah@company.com',
      budgetRange: '$5,000 - $10,000',
      message: 'Looking for full-stack Next.js web application development.',
    };

    const result = validateCreateLeadPayload(payload);
    expect(result.isValid).toBe(true);
    expect(result.data.email).toBe('sarah@company.com');
  });

  test('rejects invalid email address', () => {
    const payload = {
      fullName: 'Sarah Jenkins',
      email: 'invalid-email-address',
      budgetRange: '$5,000 - $10,000',
      message: 'Looking for full-stack Next.js web application development.',
    };

    const result = validateCreateLeadPayload(payload);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('valid email');
  });

  test('rejects invalid budget range enum', () => {
    const payload = {
      fullName: 'Sarah Jenkins',
      email: 'sarah@company.com',
      budgetRange: '$500', // Not in allowed enum
      message: 'Looking for full-stack Next.js web application development.',
    };

    const result = validateCreateLeadPayload(payload);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('budget range');
  });

  test('validates correct status update payload', () => {
    const validObjectId = '507f1f77bcf86cd799439011';
    const result = validateUpdateLeadStatusPayload(validObjectId, { status: 'Contacted' });
    expect(result.isValid).toBe(true);
    expect(result.status).toBe('Contacted');
  });
});
