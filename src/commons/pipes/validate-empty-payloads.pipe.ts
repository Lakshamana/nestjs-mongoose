import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ValidateEmptyPayloadsPipe implements PipeTransform {
  transform(payload: Record<string, unknown>) {
    if (!Object.keys(payload).length) {
      throw new BadRequestException('Payload cannot be empty')
    }

    return payload
  }
}
