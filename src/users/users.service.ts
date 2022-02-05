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

  async getUserById(_id: Types.ObjectId): Promise<User> {
    const user = await this.usersRepository.findOne({ _id })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  getUsers(filter: UserInput): Promise<UserOutput[]> {
    return this.usersRepository.find(filter)
  }

  async createUser(user: CreateUserInput): Promise<UserOutput> {
    const favoriteFoods = user.favoriteFoods || [] as string[]

    const userExists = await this.usersRepository.findOne({ email: user.email })
    if (userExists) {
      throw new BadRequestException('Email already exists')
    }

    return this.usersRepository.create({ ...user, favoriteFoods })
  }

  async updateUser(id: Types.ObjectId, user: UpdateUserInput): Promise<UserOutput> {
    if (!Object.keys(user).length) {
      throw new BadRequestException('Update payload cannot be empty')
    }

    const updatedUser = await this.usersRepository.findOneAndUpdate(id, user)
    return updatedUser
  }

  removeUser(id: Types.ObjectId): Promise<UserOutput> {
    return this.usersRepository.remove(id)
  }
}
