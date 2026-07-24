import { connectDB } from '@/lib/db';
import Admin from '@/models/Admin';

export const adminRepository = {
  findByEmail: async (email) => {
    await connectDB();
    return Admin.findOne({ email: email.toLowerCase() });
  },

  countAdmins: async () => {
    await connectDB();
    return Admin.countDocuments();
  },

  createAdmin: async (adminData) => {
    await connectDB();
    return Admin.create(adminData);
  },
};
