import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatCategoryDto } from './dto/category.dto';
import { Category } from './model/category.model';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
      ) {}
    
      findAll(): Promise<Category[]> {
        return this.categoriesRepository.find();
      }
    
      findById(id: number): Promise<Category | null> {
        return this.categoriesRepository.findOneBy({ id });
      }
    
      createCategory(category:CreatCategoryDto){
        this.categoriesRepository.save(category);
      }
    
    
      async findOne(name: string): Promise<Category | undefined> {
        let data = await this.categoriesRepository.find({
          where:{name}
        }) 
        
        console.log("Data",data)
        return data[0] || undefined
        //  ({publicKey});
      }
}
