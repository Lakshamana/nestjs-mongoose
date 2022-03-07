import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxDate,
} from 'class-validator'

const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,24}$/

export class CreateUserInput {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @Matches(re, {
    message: `Password must contain:
      - At least one upper case English letter
      - At least one lower case English letter
      - At least one digit
      - At least one special character or space
      - Minimum 8 with maximum 24 characters length`,
  })
  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  @Type(() => Date)
  @MaxDate(new Date())
  birthDate: Date

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  favoriteFoods: string[]
}
