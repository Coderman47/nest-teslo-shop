import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsInt, IsNumber, 
         IsOptional, IsPositive, IsString, 
         MinLength } from "class-validator";


// DTO = Data Transfer Object

export class CreateProductDto {

    @ApiProperty({
        description: 'Product title (unique)',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    title: string;
    
    @ApiProperty({
        default: 0,
        description: 'Product price'
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;
    
    @ApiProperty({
        description: 'Lorem ipsum comodoro astrajerem...',
        default: null
    })
    @IsString()
    @IsOptional()
    description?: string;
    
    @ApiProperty({
        example: 'men_cybertruck_bulletproof_tee',
        default: null,
        uniqueItems: true
    })
    @IsString()
    @IsOptional()
    slug?: string;
    
    @ApiProperty({
        default: 0,
        description: 'Product stock',
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;
    
    @ApiProperty({
        example: ["M", "XL", "XXL"],
        description: 'Product sizes',
    })
    @IsString({each: true})
    @IsArray()
    sizes: string[];
    
    @ApiProperty({
        example: "men",
        description: 'Product gender',
    })
    @IsIn(['man', 'woman', 'kid', 'unisex'])
    gender: string;
    
    @ApiProperty({ 
        example: ["100% fresh threads"],
        description: 'Product tags',
        default: []
    })
    @IsString({each: true})
    @IsArray()
    @IsOptional()
    tags?: string[];
    
    @ApiProperty({ 
        examples: ["1740176-00-A_0_2000.jpg",
        "1740176-00-A_1.jpg"],
        description: 'Product image',
        default: []
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];
}
