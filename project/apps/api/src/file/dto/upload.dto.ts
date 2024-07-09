import { IsNotEmpty, IsBoolean, IsNumber, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDTO {
  @ApiProperty({ required: false })
  key: string;

  @ApiProperty()
  @IsNotEmpty()
  path: string;

  @ApiProperty({ required: false })
  type: string;

  @ApiProperty({ required: false })
  file: Express.Multer.File;
}