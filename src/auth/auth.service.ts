import { Injectable } from '@nestjs/common';
import { NewEntity } from 'src/shared/entities/default.entity';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/entities/user.entity';
import { ConflictAuthError, BadRequestAuthError, NotFoundAuthError } from 'src/shared/exceptions/auth.exceptions';
import { AESEncryptionService } from 'src/shared/config/encryption/aes.encryption.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptionService: AESEncryptionService,
    private readonly jwtService: JwtService
  ) {}

  async register(data: NewEntity<User>): Promise<User> {
    const existingUser = await this.userService.userExist(data.email);
    if (existingUser) {
      throw new ConflictAuthError();
    }
    const newUser = new User(data);
    const createdUser = await this.userService.create(newUser);
    if (!createdUser) {
      throw new BadRequestAuthError();
    }

    return createdUser;
  }

  async generateJwt(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Verifica se o usuário existe e se a senha está correta.
   */
  async verifyUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null; 
    }

    const passwordValid = await this.verifyPassword(password, user.password);
    console.log(passwordValid)
    if (!passwordValid) {
      return null;  
    }

    return user;
  }

  /**
   * Compara a senha fornecida com a senha armazenada no banco de dados.
   */
  private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return this.encryptionService.compare(password, hashedPassword);
  }


  
}
