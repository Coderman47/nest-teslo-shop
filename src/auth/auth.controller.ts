import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginUserDto, CreateUserDto } from './dto';
import { User } from './entities/user.entity';
import { RawHeaders, GetUser, Auth, RoleProtected } from './decorators';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(
  @GetUser() user: User,
  ) {

    return this.authService.checkAuthStatus( user );
  }

  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute(

    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email')  userEmail: string,
    
    @RawHeaders() rawHeaders: string[],
  ){

    // console.log(request)

    return {
      ok: true,
      message: 'Hello private world',
      user,
      userEmail,
      rawHeaders
    }
  }
  
  
  // @SetMetadata('roles', ['admin', 'super-user'] )
  @Get('private2')
  @RoleProtected( ValidRoles.superUser, ValidRoles.admin, )
  @UseGuards( AuthGuard(), UserRoleGuard )
  privateRoute2(
    @GetUser() user: User,
  ){

    return {
      ok: true,
      user 
    }
  }

  @Get('private3')
  @Auth( ValidRoles.admin )
  privateRoute3(
    @GetUser() user: User,
  ){

    return {
      ok: true,
      user 
    }
  }
}
