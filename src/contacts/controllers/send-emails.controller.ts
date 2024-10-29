import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { SendEmailsCommand } from '../commands/send-emails.command';
import { SendEmailsDto } from '../dtos/send-emails.dto';

@Controller('send/all')
@ApiTags('Contacts')
export class SendEmailsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async execute(@Body() input: SendEmailsDto) {
    const command = new SendEmailsCommand(input);
    await this.commandBus.execute(command);
  }
}
