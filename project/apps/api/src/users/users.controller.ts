import { Body, Controller, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import IUser from '@repo/common'

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}


    @Post()
    register(@Body() body:IUser) {
      return this.userService.createUser(body);
    }
}
