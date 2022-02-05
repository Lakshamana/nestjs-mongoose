import { User, UserSchema } from './schemas/user.schema'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
