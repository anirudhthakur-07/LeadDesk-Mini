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

  updateLeadReply: async (id, adminReply) => {
    await connectDB();
    return Lead.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { adminReply, repliedAt: new Date() },
      { new: true, runValidators: true }
    );
  },

  findLeadsByEmail: async (email) => {
    await connectDB();
    return Lead.find(
      { email: email.toLowerCase(), isDeleted: false },
      { fullName: 1, email: 1, message: 1, budgetRange: 1, status: 1, adminReply: 1, repliedAt: 1, createdAt: 1 }
    ).sort({ createdAt: -1 });
  },
};
