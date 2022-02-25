import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { SetPublic } from '@root/common/decorators/set-public.decorator'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @SetPublic()
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
}
