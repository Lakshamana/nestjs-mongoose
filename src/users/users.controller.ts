import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { Types } from 'mongoose'
import { ParseMongoIdPipe } from '@/common/pipes'
import { CreateUserInput } from './dto/create-user.input'
import { UserInput } from './dto/user.input'
import { UserOutput } from './dto/user.output'
import { UsersService } from './users.service'
import { UpdateUserInput } from './dto/update-user.input'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query() filter: UserInput): Promise<UserOutput[]> {
    return this.usersService.getUsers(filter)
  }

  @Get(':id')
  getUser(@Param('id') id: Types.ObjectId) {
    return this.usersService.getUserById(id)
  }

  @Post()
  createUser(@Body() payload: CreateUserInput): Promise<UserOutput> {
    return this.usersService.createUser(payload)
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() payload: UpdateUserInput,
  ): Promise<UserOutput> {
    return this.usersService.updateUser(new Types.ObjectId(id), payload)
  }

  @Delete(':id')
  removeUser(@Param('id') id: string): Promise<UserOutput> {
    return this.usersService.removeUser(new Types.ObjectId(id))
  }
}
