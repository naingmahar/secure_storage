import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreatCategoryDto } from './dto/category.dto';

@Controller('category')
@ApiTags("category")
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post()
    @ApiOperation({ summary: 'Create Categorues' })
    add(@Body() createCategoryDto:CreatCategoryDto) {
      return this.categoryService.createCategory(createCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    getAll() {
      return this.categoryService.findAll();
    }
}
