import { IsDate, IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserInput {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsDate()
  @IsNotEmpty()
  birthDate: Date
}
