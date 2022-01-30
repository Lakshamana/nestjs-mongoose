import {
  IsArray,
  IsDate,
  IsEmail,
  IsOptional,
  MinLength,
  ValidationArguments,
} from 'class-validator'

export class UpdateUserInput {
  @IsEmail()
  @IsOptional()
  email: string

  @IsDate()
  @IsOptional()
  birthDate: Date

  @IsArray({ each: true })
  @MinLength(1, {
    message: (args: ValidationArguments) => {
      for (const value in args.value) {
        if (!value.length) {
          return 'Every favorite food must be 1-char long'
        }
      }
    },
  })
  @IsOptional()
  favoriteFoods: string[]
}
