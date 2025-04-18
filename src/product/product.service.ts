// src/product/product.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepo.create(createProductDto);
    return this.productRepo.save(newProduct);
  }

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    return this.productRepo.findOneBy({ id });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productRepo.update(id, updateProductDto);
    return this.findOne(id); // return updated product
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
