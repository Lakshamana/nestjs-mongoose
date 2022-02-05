import { ClassConstructor, Expose, plainToClass } from 'class-transformer'

export class UserOutput {
  @Expose()
  _id?: string

  @Expose()
  email: string

  @Expose()
  birthDate: Date

  @Expose()
  favoriteFoods: string[]

  public static factory<UserOutput, T>(
    ResponseDto: ClassConstructor<UserOutput>,
    plainTResponseData: T,
  ): UserOutput {
    return plainToClass<UserOutput, T>(ResponseDto, plainTResponseData, {
      excludeExtraneousValues: true,
    })
  }
}
