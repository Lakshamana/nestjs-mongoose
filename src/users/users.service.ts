import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Types } from 'mongoose'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { UserInput } from './dto/user.input'
import { UserOutput } from './dto/user.output'
import { User } from './schemas/user.schema'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findUserById(_id: Types.ObjectId): Promise<User> {
    const user = await this.usersRepository.findOne({ _id })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async findUserByEmail(email: string, withPassword = false): Promise<User> {
    const user = await this.usersRepository.findOne({ email }, withPassword)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  findUsers(filter: UserInput): Promise<UserOutput[]> {
    return this.usersRepository.find(filter)
  }

  async createUser(user: CreateUserInput): Promise<UserOutput> {
    const favoriteFoods = user.favoriteFoods || ([] as string[])

    const userExists = await this.usersRepository.findOne({ email: user.email })
    if (userExists) {
      throw new BadRequestException('Email already exists')
    }

    return this.usersRepository.create({ ...user, favoriteFoods })
  }

  updateUser(id: Types.ObjectId, user: UpdateUserInput): Promise<UserOutput> {
    return this.usersRepository.findOneAndUpdate(id, user)
  }

  removeUser(id: Types.ObjectId): Promise<UserOutput> {
    return this.usersRepository.remove(id)
  }
}
