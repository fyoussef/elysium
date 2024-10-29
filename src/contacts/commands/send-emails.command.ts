import { ICommand } from '@nestjs/cqrs';
import { SendEmailsDto } from '../dtos/send-emails.dto';

export class SendEmailsCommand implements ICommand {
  constructor(readonly input: SendEmailsDto) {}
}
