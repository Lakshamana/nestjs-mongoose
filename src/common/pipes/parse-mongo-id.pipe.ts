import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { Types } from 'mongoose'

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  /**
   * Validates and transforms a value to a MongoDB ObjectID
   *
   * @remarks
   * Throws a ArgumentException if the validation fails
   *
   * @param value - The value to validate and transform
   * @returns The MongoDB ObjectID
   */
  transform(value: string): Types.ObjectId {
    try {
      return new Types.ObjectId(value)
    } catch (e) {
      throw new BadRequestException('Validation Failure, expected MongoDB-valid ObjectId')
    }
  }
}
