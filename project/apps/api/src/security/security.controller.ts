import { Controller, Get, Post, Req, Request } from '@nestjs/common';
import { SecurityService } from './security.service';

@Controller('security')
export class SecurityController {

    constructor(private securityService: SecurityService) {}

    @Post('key')
    getProfile(@Req() req) {
      let userAgent = req.headers['user-agent']
      return this.securityService.createSecurityKey(userAgent);
    }

}
