import { ApiProperty } from '@nestjs/swagger';

export class CreatCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  image: string;
}
