import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'example47@gmail.com',
    description: 'User email',
    uniqueItems: true,
    nullable: false
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'yourPassword47_',
    description: 'Password to the user for login',
    nullable: false,
    minLength: 6,
    maxLength: 50,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({
    example: 'Jhon Doe',
    description: 'User fullname',
    nullable: false,
    minLength: 2
  })
  @IsString()
  @MinLength(2)
  fullName: string;
}
