
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities";
import { ApiProperty } from "@nestjs/swagger";


@Entity({
    name: 'users'
})
export class User {
    
    @ApiProperty({
        example: '11006417-d57d-4b09-9d12-fe8301a1df4c',
        description: 'User UUID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ApiProperty({
        example: 'example47@gmail.com',
        description: 'User email',
        uniqueItems: true,
        nullable: false
    })
    @Column('text',{
        unique: true
    })
    email: string;
    
    @ApiProperty({
        example: 'yourPassword47_',
        description: 'Password to the user for login',
        nullable: false
    })
    @Column('text',{
        select: false,
    })
    password: string;
    
    @ApiProperty({
        example: 'Jhon Doe',
        description: 'User fullname',
        nullable: false
    })    
    @Column('text')
    fullName: string;
    
    @ApiProperty({
        examples: ['true', 'false'],
        description: 'To know if user is active or inactive',
        default: true,
    })    
    @Column('bool',{
        default: true
    })
    isActive: boolean;
    
    @ApiProperty({
        examples: ['admin', 'user', 'superUser'],
        description: 'User rol',
        default: ['user'],
        isArray: true
    })   
    @Column('text',{
        array: true,
        default: ['user']
    })
    roles: string[];
    
    @ApiProperty({})
    @OneToMany(
        () => Product,
        ( product ) => product.user,
    )
    product: Product;

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert();
    }

}
