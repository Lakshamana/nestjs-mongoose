import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common'
import { InjectConnection } from '@nestjs/mongoose'
import { Connection, Types } from 'mongoose'

class ValidateDocumentExistence implements PipeTransform {
  transformSchemaName = {
    users: 'User',
  }

  constructor(@InjectConnection() private readonly connection: Connection) {}

  async transform({ schema, id }: { schema: string; id: string }) {
    const document = await this.connection
      .collection(schema)
      .findOne({ _id: new Types.ObjectId(id) })

    if (!document) {
      throw new NotFoundException(`${this.transformSchemaName[schema]} not found`)
    }

    return document
  }
}

const GetDocumentBySchemaAndId = createParamDecorator(
  (schema: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const { id } = request.params

    return { schema, id }
  },
)

export const GetDocument = (schema: string) =>
  GetDocumentBySchemaAndId(schema, ValidateDocumentExistence)
