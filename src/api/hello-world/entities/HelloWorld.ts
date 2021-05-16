import { ApiProperty } from '@nestjs/swagger';

export class HelloWorld {
  @ApiProperty({
    description: 'The message of HelloWorld',
    example: 'string',
  })
  message: string;
}
