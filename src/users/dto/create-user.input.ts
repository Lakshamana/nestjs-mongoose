import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxDate,
} from 'class-validator'

export class CreateUserInput {
  @IsEmail()
  @IsNotEmpty()
  email: string

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
