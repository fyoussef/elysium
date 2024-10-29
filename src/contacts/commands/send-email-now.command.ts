import { ICommand } from '@nestjs/cqrs';
import { SendEmailNowDto } from '../dtos/send-email-now.dto';

export class SendEmailNowCommand implements ICommand {
  constructor(readonly input: SendEmailNowDto) {}
}
