import { ApiProperty } from '@nestjs/swagger';

export class SendEmailNowDto {
  @ApiProperty({
    required: true,
    type: 'string',
    example: 'jhon.doe@gmail.com',
  })
  to: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'New Notification',
  })
  subject: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  })
  text: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example:
      '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>',
  })
  html?: string;
}