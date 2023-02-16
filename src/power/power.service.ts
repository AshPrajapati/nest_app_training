import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class PowerService {
  constructor(private readonly prismaService: PrismaService) {}
  getAllPowers() {
    return this.prismaService.power.findMany();
  }
}
