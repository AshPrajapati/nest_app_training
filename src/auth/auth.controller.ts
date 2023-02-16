import { Body, Controller, Post } from '@nestjs/common';
import { AuthDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() authData: AuthDTO) {
    return this.authService.signup(authData);
  }

  @Post('/signin')
  signin(@Body() authData: AuthDTO) {
    return this.authService.signin(authData);
  }
}
