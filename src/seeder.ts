import { MongooseModule } from '@nestjs/mongoose'
import { seeder } from 'nestjs-seeder'
import { User, UserSchema } from './users/schemas/user.schema'
import { UserSeeder } from './users/seeds/user.seeder'

seeder({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/demo'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
}).run([UserSeeder])
