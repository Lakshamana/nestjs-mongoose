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

export class CreateUserInput {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @Matches(/^[-~]{8,24}$/, {
    message: 'Password must contain 8-24 characters of letters, numbers and symbols',
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
