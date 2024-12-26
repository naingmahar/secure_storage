import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { IAdmin } from './interface/admin';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/admin.dto';

@Controller('admin')
@ApiTags("Admin")
export class AdminController {
    constructor(private userService: AdminService) {}


    @Post()
    @ApiOperation({ summary: 'Create Admin' })
    register(@Body() createAdminDto:CreateAdminDto) {
      return this.userService.createUser(createAdminDto);
    }
}
