import { UsersService } from '@root/users/users.service'
import { Injectable } from '@nestjs/common'
import { compareSync } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { AuthenticatedUser } from './authenticated-user.type'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<AuthenticatedUser> {
    // will throw NotFoundException if user doesn't exist
    // return with password
    const user = await this.usersService.findUserByEmail(email, true)

    if (user && compareSync(password, user.password)) {
      const { password, ...userVisibleData } = user
      return userVisibleData
    }

    return null
  }

  login(user: any) {
    return {
      accessToken: this.jwtService.sign({
        email: user.email,
        sub: user.id,
      }),
    }
  }
}
