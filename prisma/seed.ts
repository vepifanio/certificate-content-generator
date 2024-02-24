import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const password = process.env.SEED_PASSWORD;
  const hashedPassword = await bcrypt.hash(password, 8);

  const admin = await prisma.user.create({
    data: {
      email: process.env.SEED_EMAIL,
      password: hashedPassword,
    },
  });

  console.log(admin);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
