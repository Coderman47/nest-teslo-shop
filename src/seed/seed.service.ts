import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductService,
  ){}
  
  async runSeed(){
    await this.insertNewProducts();

    return 'Seed executed';
  }

  async insertNewProducts(){

    await this.productsService.deleteAllProducts();

    const seedProducts = initialData.products;
    
    const insertPromises = [];

    seedProducts.forEach((product)=> {
      insertPromises.push(this.productsService.create( product ));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
