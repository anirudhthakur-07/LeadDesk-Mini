import bcrypt from 'bcryptjs';
import { connectDB } from './db';
import Admin from '@/models/Admin';

export async function seedInitialAdmin() {
  await connectDB();

  const DEFAULT_EMAIL = 'admin@leaddesk.com';
  const DEFAULT_PASS = 'AdminPassword123!';

  const existingAdmin = await Admin.findOne({ email: DEFAULT_EMAIL });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(DEFAULT_PASS, 10);
    await Admin.create({
      email: DEFAULT_EMAIL,
      password: hashedPassword,
    });
    console.log(`Initial admin account created: ${DEFAULT_EMAIL}`);
  }
}
