import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './contexts/user/infrastructure/user.module';
import { ConfigModule } from '@nestjs/config';
import { configLoader } from './config-loader';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configLoader],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
