import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export default class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  getAllUsers() {
    return this.prismaService.user.findMany({
      select: {
        email: true,
        id: true,
      },
    });
  }
  async getUserById(id: string) {
    const foundUser = await this.prismaService.user.findFirst({
      where: { id },
      select: { email: true, id: true },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found!');
    }
    return foundUser;
  }
}
