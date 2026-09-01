import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    const user = this.authService.login(body.username, body.password);
    if (!user) return { success: false, message: 'Invalid username or password' };
    return { success: true, user };
  }

  @Get('users')
  findAll() {
    return this.authService.findAll();
  }

  @Post('users')
  create(@Body() body: any) {
    return this.authService.create(body);
  }

  @Put('users/:id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.authService.update(+id, body);
  }

  @Delete('users/:id')
  remove(@Param('id') id: string) {
    this.authService.remove(+id);
    return { deleted: true };
  }
}