import { Types } from 'mongoose'

export class UserInput {
  id: Types.ObjectId
  email: string
  birthDate: Date
  favoriteFoods: string[]
}
