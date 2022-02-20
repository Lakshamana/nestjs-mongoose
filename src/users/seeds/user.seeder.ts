import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { hashSync } from 'bcrypt'
import { Model } from 'mongoose'
import { DataFactory, Seeder } from 'nestjs-seeder'
import { User, UserDocument } from '../schemas/user.schema'

@Injectable()
export class UserSeeder implements Seeder {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async seed(): Promise<UserDocument[]> {
    const users = DataFactory.createForClass(User).generate(10, {
      password: hashSync('pass', 2),
    })
    return this.userModel.insertMany(users)
  }

  async drop(): Promise<any> {
    return this.userModel.deleteMany({})
  }
}
