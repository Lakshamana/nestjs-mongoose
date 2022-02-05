import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { UserInput } from './dto/user.input'
import { UserOutput } from './dto/user.output'
import { UsersService } from './users.service'
import { UpdateUserInput } from './dto/update-user.input'
import { GetDocument } from '@/common/decorators/get-document.decorator'
import { IUser } from './interfaces/user.interface'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query() filter: UserInput): Promise<UserOutput[]> {
    return this.usersService.getUsers(filter)
  }

  @Get(':id')
  getUser(@GetDocument('users') user: IUser) {
    return this.usersService.getUserById(user._id)
  }

  @Post()
  async createUser(@Body() payload: CreateUserInput): Promise<UserOutput> {
    const user = await this.usersService.createUser(payload)
    return UserOutput.factory(UserOutput, user)
  }

  @Put(':id')
  async updateUser(
    @GetDocument('users') user: IUser,
    @Body() payload: UpdateUserInput,
  ): Promise<UserOutput> {
    const updatedUser = await this.usersService.updateUser(user._id, payload)
    return UserOutput.factory(UserOutput, updatedUser)
  }

  @Delete(':id')
  removeUser(@GetDocument('users') user: IUser): Promise<UserOutput> {
    return this.usersService.removeUser(user._id)
  }
}
