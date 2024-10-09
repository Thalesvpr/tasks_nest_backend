import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AccessGuard)
@Controller('users')
@ApiTags('users')

export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getAllUsers(): Promise<User[]> {

    const result = await this.userService.findAll();
    return result;

  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {

    const result = await this.userService.findOne(id);
    return result
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @CurrentUser() currentUser: User): Promise<User> {

    const newUser = new User(createUserDto);

    const result = await this.userService.create(newUser);
    return result

  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @CurrentUser() currentUser: User): Promise<User> {
    const result = await this.userService.update(id, updateUserDto);
    return result
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @CurrentUser() currentUser: User): Promise<void> {

    await this.userService.remove(id);


  }
}
