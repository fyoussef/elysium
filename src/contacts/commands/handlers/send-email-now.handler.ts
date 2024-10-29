import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { SendEmailNowCommand } from '../send-email-now.command';

@CommandHandler(SendEmailNowCommand)
export class SendEmailNowHandler
  implements ICommandHandler<SendEmailNowCommand>
{
  constructor(
    @InjectQueue('notifications') private notificationsQueue: Queue,
  ) {}

  async execute(command: SendEmailNowCommand): Promise<void> {
    const data = {
      to: command.input.to,
      subject: command.input.subject,
      text: command.input.text,
      html: command.input.html,
    };
    await this.notificationsQueue.add('notifications', data, {
      delay: 3000,
    });
  }
}
