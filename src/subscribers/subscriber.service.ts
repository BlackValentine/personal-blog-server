import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriberEntity } from './subscriber.entity';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(SubscriberEntity)
    private readonly subscriberRepositoty: Repository<SubscriberEntity>,
  ) {}

  async addNewSubscriber(email: string) {
    const isSubscriberExist = await this.subscriberRepositoty.findOne({
      where: { email: email },
    });
    if (isSubscriberExist) {
      throw new HttpException('Invalid Subscriber', HttpStatus.BAD_REQUEST);
    }
    return await this.subscriberRepositoty.save({
      email: email,
    });
  }

  async getAllSubscribers() {
    const allSubscribers = await this.subscriberRepositoty.find();
    return allSubscribers;
  }
}
