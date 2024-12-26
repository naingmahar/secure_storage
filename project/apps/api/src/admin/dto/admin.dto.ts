import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;
}

export class AdminLoginDto {

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;
}