import { connectDB } from '@/lib/db';
import Lead from '@/models/Lead';

export const leadRepository = {
  createLead: async (leadData) => {
    await connectDB();
    return Lead.create(leadData);
  },

  findLeads: async (query = {}) => {
    await connectDB();
    return Lead.find({ ...query, isDeleted: false }).sort({ createdAt: -1 });
  },

  findAllActiveLeads: async () => {
    await connectDB();
    return Lead.find({ isDeleted: false });
  },

  updateLeadStatus: async (id, status) => {
    await connectDB();
    return Lead.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { status },
      { new: true, runValidators: true }
    );
  },

  deleteLead: async (id) => {
    await connectDB();
    // Soft delete implementation: sets isDeleted = true to preserve data history
    return Lead.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  },
};
