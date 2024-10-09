import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository'; // Assuming you have a UserRepository
import { User } from './entities/user.entity'; // Assuming you have a User entity
import { NotFoundRepositoryError, BadRequestRepositoryError } from 'src/shared/exceptions/repository.exceptions';
import { NewEntity } from 'src/shared/entities/default.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: NewEntity<User> ): Promise<User> {
    const user = await this.userRepository.insertOne(data);
    if (!user) {
      throw new BadRequestRepositoryError('Error creating user');
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.selectAll();
    if (!users || users.length === 0) {
      throw new NotFoundRepositoryError('No users found');
    }
    return users;
  }

  async userExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    return !!user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundRepositoryError('User not found');
    }
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.selectOne(id);
    if (!user) {
      throw new NotFoundRepositoryError('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updateResult = await this.userRepository.updateOne(id, updateUserDto);
    if (!updateResult) {
      throw new NotFoundRepositoryError('User not found');
    }
    return updateResult;
  }

  async remove(id: string): Promise<void> {
    const deleteResult = await this.userRepository.deleteOne(id);
    if (!deleteResult) {
      throw new NotFoundRepositoryError('User not found');
    }
    return undefined;
  }
}
