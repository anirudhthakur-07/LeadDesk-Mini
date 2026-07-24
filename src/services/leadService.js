import { leadRepository } from '@/repositories/leadRepository';
import { emailService } from '@/services/emailService';
import { logger } from '@/utils/logger';

export const leadService = {
  submitLead: async (leadData) => {
    const newLead = await leadRepository.createLead(leadData);
    logger.info('New lead created successfully', { leadId: newLead._id, email: newLead.email });
    
    // Dispatch real-time agency alert notification
    await emailService.sendLeadAlert(newLead);

    return newLead;
  },

  getLeadsAndMetrics: async (search = '', status = 'All') => {
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      query.$or = [{ fullName: regex }, { email: regex }];
    }

    const filteredLeads = await leadRepository.findLeads(query);
    const activeLeads = await leadRepository.findAllActiveLeads();

    const metrics = {
      total: activeLeads.length,
      newLeads: activeLeads.filter((l) => l.status === 'New').length,
      contacted: activeLeads.filter((l) => l.status === 'Contacted').length,
      closed: activeLeads.filter((l) => l.status === 'Closed').length,
    };

    return { leads: filteredLeads, metrics };
  },

  updateLeadStatus: async (id, status) => {
    const updated = await leadRepository.updateLeadStatus(id, status);
    if (!updated) {
      return { success: false, error: 'Lead record not found or already deleted', status: 404 };
    }
    logger.info('Lead status updated', { leadId: id, newStatus: status });
    return { success: true, lead: updated };
  },

  deleteLead: async (id) => {
    const deleted = await leadRepository.deleteLead(id);
    if (!deleted) {
      return { success: false, error: 'Lead record not found', status: 404 };
    }
    logger.info('Lead record soft-deleted', { leadId: id });
    return { success: true };
  },
};
