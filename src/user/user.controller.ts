import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './../jwt-auth-guard/jwt-auth.guard';

@Controller({ path: '/user' })
export class UserController {
  @Get('/')
  @UseGuards(JwtAuthGuard)
  getAllUser() {
    return [];
  }
}
