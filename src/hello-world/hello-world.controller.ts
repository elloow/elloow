import { Controller, Get } from '@nestjs/common';

@Controller('hello-world')
export class HelloWorldController {
    @Get()
    index() {
        return { 'hello': 'world' }
    }
}
