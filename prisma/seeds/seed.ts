import { PrismaClient } from '@prisma/client';
import { insertPowerlist } from './powers.seed';
const prismaClient = new PrismaClient();

async function main() {
  try {
    await prismaClient.$connect();
    await insertPowerlist(prismaClient);
  } catch (error) {
    console.log(error);
  }

  await prismaClient.$disconnect();
}

main();
