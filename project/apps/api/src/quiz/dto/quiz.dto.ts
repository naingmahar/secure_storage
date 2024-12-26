import { ApiProperty } from '@nestjs/swagger';
import { Admin } from 'src/admin/model/admin.model';

export class CreateQuizDto {

  @ApiProperty()
  ans: string;

  @ApiProperty({nullable:true})
  q1?: string;

  @ApiProperty({nullable:true})
  q2?: string;

  @ApiProperty({nullable:true})
  q3?: string;

  @ApiProperty({nullable:true})
  q4?: string;

  @ApiProperty({nullable:true})
  q5?: string;

  @ApiProperty({nullable:true})
  q6?: string;

  @ApiProperty({nullable:true})
  image?: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  admin: string;

  @ApiProperty()
  category: string;
}

export class FindQuizDto{
  @ApiProperty()
  category: string;
}

export class QuizDto {

  @ApiProperty()
  ans: string;

  @ApiProperty({nullable:true})
  q1?: string;

  @ApiProperty({nullable:true})
  q2?: string;

  @ApiProperty({nullable:true})
  q3?: string;

  @ApiProperty({nullable:true})
  q4?: string;

  @ApiProperty({nullable:true})
  q5?: string;

  @ApiProperty({nullable:true})
  q6?: string;

  @ApiProperty({nullable:true})
  image?: string;

  @ApiProperty()
  admin: Admin;

  @ApiProperty()
  category: string;

  @ApiProperty({nullable:true})
  isTesting:boolean;
}