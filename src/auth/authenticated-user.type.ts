import { User } from '@root/users/schemas/user.schema'

export type AuthenticatedUser = Omit<User, 'password'>
