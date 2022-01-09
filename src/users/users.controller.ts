import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { Types } from 'mongoose'
import { ParseMongoIdPipe } from '@/common/pipes'
import { CreateUpdateUser } from './dto/create-update-user.input'
import { UserInput } from './dto/user.input'
import { UserOutput } from './dto/user.output'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query() filter: UserInput): Promise<UserOutput[]> {
    return this.usersService.getUsers(filter)
  }

  @Get(':id')
  getUser(@Param('id', ParseMongoIdPipe) id: string) {
    return this.usersService.getUserById(new Types.ObjectId(id))
  }

  @Post()
  createUser(@Body() payload: CreateUpdateUser): Promise<UserOutput> {
    return this.usersService.createUser(payload)
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() payload: CreateUpdateUser,
  ): Promise<UserOutput> {
    return this.usersService.updateUser(new Types.ObjectId(id), payload)
  }

  @Delete(':id')
  removeUser(@Param('id') id: string): Promise<UserOutput> {
    return this.usersService.removeUser(new Types.ObjectId(id))
  }
}
