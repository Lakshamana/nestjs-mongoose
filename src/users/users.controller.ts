import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { UserInput } from './dto/user.input'
import { UserOutput } from './dto/user.output'
import { UsersService } from './users.service'
import { UpdateUserInput } from './dto/update-user.input'
import { GetDocument } from '@root/common/decorators/get-document.decorator'
import { IUser } from './interfaces/user.interface'
import { ValidateEmptyPayloadsPipe } from '@root/commons/pipes/validate-empty-payloads.pipe'
import { JwtAuthGuard } from '@root/auth/jwt-auth.guard'
import { Request as ExpressRequest } from 'express'
import { SetPublic } from '@root/common/decorators/set-public.decorator'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query() filter: UserInput): Promise<UserOutput[]> {
    return this.usersService.findUsers(filter)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req: ExpressRequest) {
    console.log(req.user)
    return req.user
  }

  @Get(':id')
  getUser(@GetDocument('users') user: IUser) {
    return this.usersService.findUserById(user._id)
  }

  @SetPublic()
  @Post()
  async createUser(@Body() payload: CreateUserInput): Promise<UserOutput> {
    const user = await this.usersService.createUser(payload)
    return UserOutput.factory(UserOutput, user)
  }

  @Put(':id')
  async updateUser(
    @GetDocument('users') user: IUser,
    @Body(ValidateEmptyPayloadsPipe) payload: UpdateUserInput,
  ): Promise<UserOutput> {
    const updatedUser = await this.usersService.updateUser(user._id, payload)
    return UserOutput.factory(UserOutput, updatedUser)
  }

  @Delete(':id')
  removeUser(@GetDocument('users') user: IUser): Promise<UserOutput> {
    return this.usersService.removeUser(user._id)
  }
}
