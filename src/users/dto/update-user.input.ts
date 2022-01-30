import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class UpdateUserInput {
  @IsEmail()
  @IsOptional()
  email: string

  @IsDate()
  @IsOptional()
  birthDate: Date

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsOptional()
  favoriteFoods: string[]
}
