import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from './jwt-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Авторизация по логину и паролю',
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({
    summary: 'Авторизация по логину и паролю',
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('validate')
  async validateUser(@Body() dto: LoginDto, @Request() req) {
    return this.authService.validateUser(dto.username, dto.password);
  }
}
