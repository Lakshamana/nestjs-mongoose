import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, Types } from 'mongoose'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async findOne(userFilterQuery: FilterQuery<User>, withPassword = false): Promise<User> {
    const findWithPassword = withPassword ? [] : ['-password']
    return this.userModel.findOne(userFilterQuery, ['-__v', ...findWithPassword]).lean()
  }

  async find(usersFilterQuery: FilterQuery<User>, withPassword = false): Promise<User[]> {
    const findWithPassword = withPassword ? [] : ['-password']
    return this.userModel.find(usersFilterQuery, ['-__v', ...findWithPassword]).lean()
  }

  async create(user: User): Promise<User> {
    return this.userModel.create(user)
  }

  async findOneAndUpdate(
    _id: Types.ObjectId,
    updateProperties: Partial<User>,
    withPassword = false,
  ): Promise<User> {
    const findWithPassword = withPassword ? [] : ['-password']
    return this.userModel.findOneAndUpdate({ _id }, updateProperties, {
      new: true,
      projection: ['-__v', ...findWithPassword],
    })
  }

  async remove(_id: Types.ObjectId): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { _id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true },
    )
  }
}
