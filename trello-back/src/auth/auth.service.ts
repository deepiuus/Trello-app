import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import { SigninDto } from 'src/dto/signinDto';
import { SignupDto } from 'src/dto/signupDto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailerService } from 'src/mailer/mailer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResetPasswordDemandDto } from 'src/dto/resetPasswordDemandDto';
import { ResetPasswordConfirmationDto } from 'src/dto/resetPasswordConfirmationDto';
import { DeleteAccountDto } from 'src/dto/deleteAccountDto';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService,
        private readonly mailerService: MailerService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService) {}
        async signup(signupDto: SignupDto) {
            const { username, email, password } = signupDto;
        const user = await this.prismaService.user.findUnique({where : {email}});
        if (user) throw new ConflictException('User already exists');
        const hash = await bcrypt.hash(password, 10);
        await this.prismaService.user.create({data: {username, email, password: hash}});
        await this.mailerService.sendSignupConfirmation(email);
        return {message: 'User created successfully'};
    }
    async signin(signinDto: SigninDto) {
        const { email, password } = signinDto;
        const user = await this.prismaService.user.findUnique({ where: { email } });
        if (!user) throw new NotFoundException('User not found');
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new UnauthorizedException('Password does not match');
        const payload = {
            sub: user.id,
            email: user.email,
        };
        const token = this.jwtService.sign(payload, { expiresIn: '2h', secret: this.configService.get('SECRET_KEY') });
        return { access_token: token };
    }
    async resetPasswordDemand(resetPasswordDemandDto: ResetPasswordDemandDto) {
        const { email } = resetPasswordDemandDto;
        const user = await this.prismaService.user.findUnique({where: {email}});
        if (!user) throw new NotFoundException('User not found');
        const code = speakeasy.totp({
            secret: this.configService.get('OTP_CODE'),
            digits: 5,
            step: 60 * 5,
            encoding: 'base32'
        });
        const url = 'http://localhost:3000/reset-password-confirmation'
        await this.mailerService.sendResetPassword(email, url, code);
        return {data: 'Reset password email sent'};
    }
    async resetPasswordConfirmation(resetPasswordConfirmationDto: ResetPasswordConfirmationDto) {
        const { email, code, password } = resetPasswordConfirmationDto;
        const user = await this.prismaService.user.findUnique({where: {email}});
        if (!user) throw new NotFoundException('User not found');
        const match = speakeasy.totp.verify({
            secret: this.configService.get('OTP_CODE'),
            token: code,
            digits: 5,
            step: 60 * 5,
            encoding: 'base32'
        });
        if (!match) throw new UnauthorizedException('Invalid/Expired token');
        const hash = await bcrypt.hash(password, 10);
        await this.prismaService.user.update({where: {email}, data: {password: hash}});
        return {data: 'Password reset successfully'};
    }
    async deleteAccount(userId: number, deleteAccountDto: DeleteAccountDto) {
        const { password } = deleteAccountDto;
        const user = await this.prismaService.user.findUnique({where: { id : userId }});
        if (!user) throw new NotFoundException('User not found');
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new UnauthorizedException('Password does not match');
        await this.prismaService.user.delete({where: { id : userId }});
        return {data: 'User deleted successfully'};
    }
}
