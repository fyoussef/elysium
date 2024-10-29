import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaAdapter } from 'src/adapters/prisma-adapter';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { SendEmailsCommand } from '../send-emails.command';

@CommandHandler(SendEmailsCommand)
export class SendEmailsHandler implements ICommandHandler<SendEmailsCommand> {
  constructor(
    private readonly prismaAdapter: PrismaAdapter,
    @InjectQueue('notifications') private notificationsQueue: Queue,
  ) {}

  async execute(command: SendEmailsCommand): Promise<void> {
    const contacts = await this.prismaAdapter.contactTopics.findMany({
      select: {
        contact: {
          select: {
            email: true,
          },
        },
      },
    });
    const emails = contacts.map(({ contact }) => contact.email);
    for (const email of emails) {
      const data = {
        to: email,
        subject: command.input.subject,
        text: command.input.text,
        html: command.input.html,
      };
      await this.notificationsQueue.add('notifications', data, {
        delay: 3000,
      });
    }
  }
}
