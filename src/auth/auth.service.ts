import { Injectable } from '@nestjs/common';
import { hash as passHash, compare as passCompare } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  async signup(signupDto: SignupDto) {
    signupDto.password = await passHash(signupDto.password, saltOrRounds);
    const createdUser = await this.prisma.user.create({
      data: { ...signupDto },
    });
    return {
      id: createdUser.id,
    };
  }

  async validateUser(loginDto: LoginDto) {
    try {
      const login = loginDto.login;
      const foundUser = await this.prisma.user.findUnique({ where: { login } });
      if (
        foundUser &&
        (await passCompare(loginDto.password, foundUser.password))
      ) {
        const { login, id } = foundUser;
        const payload = { login, id };
        return { accessToken: this.jwtService.sign(payload) };
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  }

  async login(user: any) {
    const payload = { login: user.login, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
