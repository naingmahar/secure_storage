import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './model/category.model';

@Module({
  imports:[TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}