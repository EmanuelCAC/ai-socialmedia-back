import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AiModule } from './ai/ai.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    AuthModule,
    AiModule,
    MongooseModule.forRoot(process.env.MONGO_URI || "")
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
