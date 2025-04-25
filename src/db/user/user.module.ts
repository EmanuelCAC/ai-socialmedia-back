import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Connection } from 'mongoose';
import { UserSchema } from 'src/auth/schemas/user.shema';
import { dbModule } from '../db.module';

@Module({
  imports: [
    dbModule, 
  ],
  providers: [
    {
      provide: 'USER_MODEL',
      useFactory: (connection: Connection) => connection.model('User', UserSchema),
      inject: ['DATABASE_CONNECTION'],
    },
    UserRepository,
    {
      provide: 'USER_REPOSITORY',
      useExisting: UserRepository,
    },
  ],
  exports: ['USER_REPOSITORY', UserRepository], 
})
export class UserModule {}
