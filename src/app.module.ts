import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blogs/blog.module';

@Module({
  imports: [ConfigModule.forRoot(), BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
