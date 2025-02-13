/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private users: { username: string; password: string }[] = []; // Temporary user storage (use a database in production)

  async register(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const existingUser = this.users.find((user) => user.username === username);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    this.users.push(newUser);

    return newUser;
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = this.users.find((user) => user.username === username);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ username: user.username }, 'secretKey', {
      expiresIn: '1h',
    });

    return { token };
  }
}
