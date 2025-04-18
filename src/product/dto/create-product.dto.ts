// src/product/dto/create-product.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  price: string;

  image?: string;
}
