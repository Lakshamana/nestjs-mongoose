import { User } from '@root/users/schemas/user.schema'
import { Types } from 'mongoose'

export type AuthenticatedUser = Omit<User, 'password'>
export type AuthenticatedUserWithID = AuthenticatedUser & { _id: Types.ObjectId }
