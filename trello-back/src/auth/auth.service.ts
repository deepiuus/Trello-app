import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupDto } from 'src/dto/signupDto';
import { MailerService } from 'src/mailer/mailer.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService,
                private readonly mailerService: MailerService) {}
    async signup(signupDto: SignupDto) {
        const { username, email, password } = signupDto;
        const user = await this.prismaService.user.findUnique({where : {email}});
        if (user) throw new ConflictException('User already exists');
        const hash = await bcrypt.hash(password, 10);
        await this.prismaService.user.create({data: {username, email, password: hash}});
        await this.mailerService.sendSignupConfirmation(email);
        return {message: 'User created successfully'};
    }
}
