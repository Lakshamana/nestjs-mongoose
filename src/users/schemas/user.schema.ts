import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  email: string

  @Prop()
  birthDate: Date

  @Prop()
  favoriteFoods: string[]

  @Prop({
    required: false,
    default: null,
  })
  deleted_at?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.index({ email: 1, deleted_at: 1 }, { unique: true })
