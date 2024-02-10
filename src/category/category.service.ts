import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.categoryRepository.findOne({
      where: {
        title: createCategoryDto.title
      }
    });
  
    if (existingCategory) {
      throw new BadRequestException('This category already exists');
    }
  
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    })

    if(!category) throw new NotFoundException('Category not found');

    await this.categoryRepository.update(id, updateCategoryDto)

    return { message: 'Category successfully updated' };
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    })

    if(!category) throw new NotFoundException('Category not found');

    await this.categoryRepository.delete(id);

    return { message: 'Category successfully deleted' };
  }
}