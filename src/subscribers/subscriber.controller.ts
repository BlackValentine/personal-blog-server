import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubscriberDto } from './subscriber.dto';
import { SubscriberService } from './subscriber.service';

@Controller('subscriber')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Post()
  registerSubscriber(@Body() { email }: SubscriberDto) {
    return this.subscriberService.addNewSubscriber(email);
  }

  @Get()
  getAllSubscribers() {
    return this.subscriberService.getAllSubscribers();
  }
}
