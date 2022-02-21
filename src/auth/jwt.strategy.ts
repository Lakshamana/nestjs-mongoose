import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { UsersService } from '@root/users/users.service'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthenticatedUserWithID } from './authenticated-user.type'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    })
  }

  async validate({ user }: { user: AuthenticatedUserWithID; iat: string }) {
    return this.usersService.findUserById(user._id)
  }
}
