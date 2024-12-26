import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
import { AdminLoginDto } from 'src/admin/dto/admin.dto';
import { AuthUser } from './auth.decoder';
import { IAuth } from './type/auth';
import { ApiTags } from '@nestjs/swagger';
  
  @Controller('auth')
  @ApiTags("Auth")
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: AdminLoginDto) {
      return this.authService.signIn(signInDto.email, signInDto.password);
    }
  
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req, @AuthUser() authUser: IAuth) {
      return req.user;
    }
  }