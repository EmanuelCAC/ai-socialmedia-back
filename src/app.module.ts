import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    AuthModule,
    AiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
