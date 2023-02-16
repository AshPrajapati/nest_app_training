import { PrismaClient } from '@prisma/client';
export async function insertPowerlist(prisma: PrismaClient) {
  await prisma.power.createMany({
    data: [{ name: 'Fire' }, { name: 'water' }, { name: 'Thunder' }],
  });
}
