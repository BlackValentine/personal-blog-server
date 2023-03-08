import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriberController } from './subscriber.controller';
import { SubscriberEntity } from './subscriber.entity';
import { SubscriberService } from './subscriber.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriberEntity])],
  controllers: [SubscriberController],
  providers: [SubscriberService],
})
export class SubscriberModule {}
