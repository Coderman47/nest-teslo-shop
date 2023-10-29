import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { ProductImage } from "./index";
import { User } from "../../auth/entities/user.entity";


@Entity({
    name: 'products'
})
export class Product {

    @ApiProperty({ 
        example: "26b53ef6-b3b5-42e6-abc4-47adc4d93884",
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    
    @ApiProperty({ 
        example: "T-Shirt Teslo",
        description: 'Product Title',
        uniqueItems: true
    }) 
    @Column('text', {
        unique: true,
    })
    title: string;
    
    @ApiProperty({ 
        example: 0,
        description: 'Product price',
        
    })
    @Column('float',{
        default: 0
    })
    price: number;
    
    @ApiProperty({ 
        example: "Anim reprehenderit nulla in anim mollit minim irure commodoro",
        description: 'Product description',
        default: null
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;
    
    @ApiProperty({ 
        example: "T_Shirt_Teslo",
        description: 'Product SLUG - for SEO',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    slug: string;
    
    @ApiProperty({ 
        example: 10,
        description: 'Product stock',
        default: 0
    })
    @Column('int',{
        default: 0
    })
    stock: number;
    
    @ApiProperty({ 
        example: ["M", "XL", "XXL"],
        description: 'Product sizes',
    })
    @Column('text', {
        array: true
    })
    sizes:string[];
    
    @ApiProperty({ 
        example: "women",
        description: 'Product gender',
    })
    @Column('text')
    gender: string;
    
    @ApiProperty({ 
        example: ["sweatshirt"],
        description: 'Product tags',
        default: []
    })
    @Column('text',{
        array: true,
        default: []
    })
    tags: string[];

    @ApiProperty({ 
        example: ["1740176-00-A_0_2000.jpg",
        "1740176-00-A_1.jpg"],
        description: 'Product image',
        default: []
    })
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        {cascade: true, eager: true},
        
        
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        ( user ) => user.product,
        { eager: true }
        
    )
    user: User;

    @BeforeInsert()
    @BeforeUpdate()
    checkSlugInsertOrUpdate(){
        if(!this.slug){
            this.slug = this.title
        }
        this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }
}
