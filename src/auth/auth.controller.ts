import { Controller, Post, Body, UseGuards, Req, HttpStatus, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/login-payload.dto';
import { RegisterPayloadDto } from './dto/register-payload.dto';
import { LocalGuard } from './guard/local.guard';
import { NewEntity } from 'src/shared/entities/default.entity';
import { User } from 'src/user/entities/user.entity';
import { SystemExceptionFilter } from 'src/shared/filters/exception.filter';
import { CurrentUser } from 'src/shared/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @UseGuards(LocalGuard)
  login(@CurrentUser() user: User) {
    const result = this.authService.generateJwt(user);
    return result
  }

  @Post('register')
  register(@Body() registerPayloadDto: RegisterPayloadDto, @Req() req: Request) {
    const newUser = new User(registerPayloadDto)
    const result = this.authService.register(newUser);
    return result
  }
}
