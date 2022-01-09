import { Injectable } from '@nestjs/common'
import { Types } from 'mongoose'
import { CreateUpdateUser } from './dto/create-update-user.input'
import { UserInput } from './dto/user.input'
import { UserOutput } from './dto/user.output'
import { User } from './schemas/user.schema'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUserById(id: Types.ObjectId): Promise<User> {
    return this.usersRepository.findOne({ id })
  }

  getUsers(filter: UserInput): Promise<UserOutput[]> {
    return this.usersRepository.find(filter)
  }

  createUser(user: CreateUpdateUser): Promise<UserOutput> {
    return this.usersRepository.create({ ...user, favoriteFoods: [] })
  }

  updateUser(id: Types.ObjectId, user: CreateUpdateUser): Promise<UserOutput> {
    return this.usersRepository.findOneAndUpdate(id, user)
  }

  removeUser(id: Types.ObjectId): Promise<UserOutput> {
    return this.usersRepository.remove(id)
  }
}
