import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, Types } from 'mongoose'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilterQuery, ['-__v'])
  }

  async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(usersFilterQuery, ['-__v'])
  }

  async create(user: User): Promise<User> {
    return this.userModel.create(user)
  }

  async findOneAndUpdate(
    _id: Types.ObjectId,
    updateProperties: Partial<User>,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate({ _id }, updateProperties, { new: true })
  }

  async remove(_id: Types.ObjectId): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { _id, deleted_at: null },
      { deleted_at: new Date() },
      { new: true },
    )
  }
}
