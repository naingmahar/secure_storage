import { Module } from '@nestjs/common';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';
import { KeyModel } from './model/key.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([KeyModel])],
  controllers: [SecurityController],
  providers: [SecurityService]
})
export class SecurityModule {}
