import { Module } from '@nestjs/common';
import { CreateContactController } from './controllers/create-contact.controller';
import { CreateContactHandler } from './commands/handlers/create-contact.handler';
import { AdaptersModule } from 'src/adapters/adapters.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ListContactsController } from './controllers/list-contacts.controller';
import { ListContactsHandler } from './queries/handlers/list-contacts.handler';
import { SendEmailByTopicController } from './controllers/send-email-by-topic.controller';
import { SendEmailByTopicHandler } from './commands/handlers/send-email-by-topic.handler';
import { BullModule } from '@nestjs/bullmq';
import { NotificationsConsumer } from './queue/notifications-consumer';
import { SendEmailsController } from './controllers/send-emails.controller';
import { SendEmailsHandler } from './commands/handlers/send-emails.handler';
import { SendEmailNowHandler } from './commands/handlers/send-email-now.handler';
import { SendEmailNowController } from './controllers/send-email-now.controller';

@Module({
  imports: [
    AdaptersModule,
    CqrsModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
        password: 'root',
      },
    }),
    BullModule.registerQueue({
      name: 'notifications',
    }),
  ],
  controllers: [
    CreateContactController,
    ListContactsController,
    SendEmailByTopicController,
    SendEmailsController,
    SendEmailNowController,
  ],
  providers: [
    CreateContactHandler,
    ListContactsHandler,
    SendEmailByTopicHandler,
    NotificationsConsumer,
    SendEmailsHandler,
    SendEmailNowHandler,
  ],
})
export class Contacts {}
