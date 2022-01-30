import { Transform } from 'class-transformer'
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
  @Transform(date => new Date(String(date.value)))
  @MaxDate(new Date())
  birthDate: Date

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  favoriteFoods: string[]
}
