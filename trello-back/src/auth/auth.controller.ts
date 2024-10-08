import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from 'src/dto/signupDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }
}
