import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userService: Repository<User>,
  ) {}

  async validateUser(user_name: string, pass: string) {
    const user = await this.userService.findOne({ where: { user_name } });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async createUser(user_name: string, password: string) {
    return await this.userService.save({
      user_name,
      password,
      createAt: new Date(),
    });
  }
}
