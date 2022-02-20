import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { hashSync } from 'bcrypt'
import { Document } from 'mongoose'
import { Factory } from 'nestjs-seeder'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  @Factory(faker => faker.internet.email().toLowerCase())
  @Prop({ type: String, required: true })
  email: string

  @Factory(() => hashSync('pass', 2))
  @Prop({ type: String, required: true })
  password: string

  @Factory(faker => new Date(faker.date.past()))
  @Prop({ required: true })
  birthDate: Date

  @Factory(faker => [
    faker.random.arrayElement(['banana', 'apple', 'chop suey', 'vatapa']),
  ])
  @Prop({ required: false, default: [] })
  favoriteFoods: string[]

  @Prop({ name: 'deletedAt', required: false, default: null })
  deletedAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.index({ email: 1, deletedAt: 1 }, { unique: true })
