import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from './model/file.model';

@Module({
  imports:[TypeOrmModule.forFeature([Files])],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
