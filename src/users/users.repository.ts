import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, Types } from 'mongoose'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilterQuery)
  }

  async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(usersFilterQuery)
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user)
    return newUser.save()
  }

  async findOneAndUpdate(
    id: Types.ObjectId,
    updateProperties: Partial<User>,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate({ id }, updateProperties, { new: true })
  }

  async remove(id: Types.ObjectId): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { id, deleted_at: false },
      { deleted_at: true },
      { new: true },
    )
  }
}
