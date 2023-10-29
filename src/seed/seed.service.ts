import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductService } from 'src/product/product.service';
import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductService,

    @InjectRepository( User )
    private readonly userRepositoriy: Repository<User>
  ){}
  
  async runSeed(){

    await this.deleteTables();
    const adminUser = await this.insertUsers();

    await this.insertNewProducts( adminUser );

    return 'Seed executed';
  }

  private async deleteTables() {

    await this.productsService.deleteAllProducts();

    const queryBuilder = this.userRepositoriy.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute()
  }

  private async insertUsers() {
    
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach(user => {
      users.push(this.userRepositoriy.create( user ) );
    });

   const dbUsers = await this.userRepositoriy.save( seedUsers );

  return dbUsers[0];

   }

  async insertNewProducts( user: User ){

    await this.productsService.deleteAllProducts();

    const seedProducts = initialData.products;
    
    const insertPromises = [];

    seedProducts.forEach((product)=> {
      insertPromises.push(this.productsService.create( product, user ));
    });

    await Promise.all(insertPromises);

    return true;
  }
}