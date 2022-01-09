import { IsDate, IsEmail, IsOptional } from 'class-validator'

export class UpdateUserInput {
  @IsEmail()
  @IsOptional()
  email: string

  @IsDate()
  @IsOptional()
  birthDate: Date
}
