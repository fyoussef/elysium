import { ICommand } from '@nestjs/cqrs';
import { SendEmailByTopicDto } from '../dtos/send-email-by-topic.dto';

export class SendEmailByTopicCommand implements ICommand {
  constructor(readonly input: SendEmailByTopicDto) {}
}
