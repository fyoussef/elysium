import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { SendEmailByTopicCommand } from '../commands/send-email-by-topic.command';
import { SendEmailByTopicDto } from '../dtos/send-email-by-topic.dto';

@Controller('send/topic')
@ApiTags('Contacts')
export class SendEmailByTopicController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async execute(@Body() input: SendEmailByTopicDto) {
    const command = new SendEmailByTopicCommand(input);
    await this.commandBus.execute(command);
  }
}
