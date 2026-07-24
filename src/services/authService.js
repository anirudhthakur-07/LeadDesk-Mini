import bcrypt from 'bcryptjs';
import { adminRepository } from '@/repositories/adminRepository';
import { signToken, setTokenCookie } from '@/lib/auth';
import { logger } from '@/utils/logger';

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '12', 10);
const DEFAULT_EMAIL = 'admin@leaddesk.com';
const DEFAULT_PASS = 'AdminPassword123!';

export const authService = {
  seedAdminIfNeeded: async () => {
    const existing = await adminRepository.findByEmail(DEFAULT_EMAIL);
    if (!existing) {
      const hashedPassword = await bcrypt.hash(DEFAULT_PASS, BCRYPT_ROUNDS);
      await adminRepository.createAdmin({
        email: DEFAULT_EMAIL,
        password: hashedPassword,
      });
      logger.info('Default admin account seeded successfully', { email: DEFAULT_EMAIL });
    }
  },

  authenticateAdmin: async (email, password) => {
    await authService.seedAdminIfNeeded();

    const admin = await adminRepository.findByEmail(email);
    if (!admin) {
      logger.warn('Failed admin login attempt - Email not found', { email });
      return { success: false, error: 'Invalid admin credentials', status: 401 };
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      logger.warn('Failed admin login attempt - Invalid password', { email });
      return { success: false, error: 'Invalid admin credentials', status: 401 };
    }

    const tokenPayload = {
      id: admin._id.toString(),
      email: admin.email,
    };

    const token = signToken(tokenPayload);
    setTokenCookie(token);

    logger.info('Admin login successful', { email: admin.email });
    return {
      success: true,
      admin: { email: admin.email },
    };
  },
};
