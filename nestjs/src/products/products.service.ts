import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ClientGrpc } from '@nestjs/microservices';
import { ProductClientGrpc } from './product.grpc';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductsService implements OnModuleInit {
  private productGrpcService: ProductClientGrpc;

  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @Inject('PRODUCT_PACKAGE')
    private productGrpcPackage: ClientGrpc,
  ) {}

  onModuleInit() {
    this.productGrpcService =
      this.productGrpcPackage.getService('ProductService');
  }

  async create(createProductDto: CreateProductDto) {
    const product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.price = createProductDto.price;

    await lastValueFrom(
      this.productGrpcService.createProduct({
        name: product.name,
        description: product.description,
        price: product.price,
      }),
    );

    return this.productRepo.save(product);
  }

  findAll() {
    return lastValueFrom(this.productGrpcService.findProducts({}));
  }
}

export class ProductGrpcUnknownError extends Error {}

export class ProductAlreadyExistsError extends Error {}
