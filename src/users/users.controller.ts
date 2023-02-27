import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  Res,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { Users } from './users.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    console.log('Controller initialized');
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // @Get('/testing')
  // testing(@Users() user: any) {
  //   console.log('User in Controller ===> ', user.headers);
  // }

  // @Get('/login')
  // login(@Req() req: Request, @Res() res: Response): any {
  //   console.log(req.headers);

  //   // console.log(res.headers.set({ Authorization: 'application/json' }));
  //   // return res.json({ message: 'success' });
  // }

  // @HttpCode(204)
  @Post('/login')
  login(@Body() user: User): Promise<{ user: User }> {
    return this.usersService.login(user);
  }

  // @Get(':id')
  // login(@Param('id') id): Promise<User> {
  //   return this.usersService.login(id);
  // }

  @Post()
  create(@Body() CreateUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(CreateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<User> {
    return this.usersService.delete(id);
  }

  @Put(':id')
  update(@Body() updateUserDto: CreateUserDto, @Param('id') id): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }
}
