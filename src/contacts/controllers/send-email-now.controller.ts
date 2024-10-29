import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { SendEmailNowCommand } from '../commands/send-email-now.command';
import { SendEmailNowDto } from '../dtos/send-email-now.dto';

@Controller('send/now')
@ApiTags('Contacts')
export class SendEmailNowController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async execute(@Body() input: SendEmailNowDto) {
    const command = new SendEmailNowCommand(input);
    await this.commandBus.execute(command);
  }
}
