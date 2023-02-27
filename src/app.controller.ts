import { Controller, Post, Request } from '@nestjs/common';
import { Public } from './auth/auth.decorator';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return await this.authService.login(req.body);
  }
}
