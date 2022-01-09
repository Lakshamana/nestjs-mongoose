import { IsDate, IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUpdateUser {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsDate()
  @IsNotEmpty()
  birthDate: Date
}
