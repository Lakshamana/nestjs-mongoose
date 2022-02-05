import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Mongoose } from 'mongoose'
import { Factory } from 'nestjs-seeder'

export type UserDocument = User & Document

@Schema({
  timestamps: true,
})
export class User {
  @Factory(faker => faker.internet.email().toLowerCase())
  @Prop({ required: true })
  email: string

  @Factory(faker => new Date(faker.date.past()))
  @Prop({ required: true })
  birthDate: Date

  @Factory(faker => [
    faker.random.arrayElement(['banana', 'apple', 'chop suey', 'vatapa']),
  ])
  @Prop({ required: false, default: [] })
  favoriteFoods: string[]

  @Prop({ required: false, default: null })
  deleted_at?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.index({ email: 1, deleted_at: 1 }, { unique: true })
