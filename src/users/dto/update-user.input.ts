import { PartialType, PickType } from '@nestjs/mapped-types'
import { CreateUserInput } from './create-user.input'

export class UpdateUserInput extends PartialType(
  PickType(CreateUserInput, ['birthDate', 'email', 'favoriteFoods']),
) {}
