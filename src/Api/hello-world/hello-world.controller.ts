import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HelloWorld } from './Entities/HelloWorld';

@ApiTags('v1')
@Controller('api/hello-world')
export class HelloWorldController {
  @Get()
  @ApiOperation({ summary: 'Basic hello world endpoint' })
  @ApiResponse({
    status: 200,
    description: 'hello-world object',
    type: HelloWorld,
  })
  index() {
    const hello = new HelloWorld();
    hello.message = 'hello-world!';
    return hello;
  }
}
