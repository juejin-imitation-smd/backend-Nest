import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Login } from 'src/user/dto/Login.dto';
import { Register } from 'src/user/dto/Register.dto';
import { UserService } from 'src/user/service/user/user.service';

@Controller('api')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('login')
  async login(@Req() req, @Body() login: Login) {
    // 验证登录信息
    const user = await this.userService.validateUser(
      login.user_name,
      login.password,
    );
    if (!user) {
      throw new HttpException('密码或账号不正确', HttpStatus.UNAUTHORIZED);
    }
    // 将用户信息存入 session
    req.session.user = user;
    console.log(req.session);
    return {
      code: HttpStatus.OK,
      msg: '登录成功',
      data: user,
    };
  }
  @Put('register')
  async register(@Body() register: Register) {
    // 创建用户
    if (register.password !== register.repeat_password) {
      return {
        code: HttpStatus.BAD_REQUEST,
        msg: '两次密码不一致',
        data: null,
      };
    }
    const user = await this.userService.createUser(
      register.user_name,
      register.password,
    );
    if (user.user_name) {
      return {
        code: HttpStatus.OK,
        msg: '注册成功',
        data: null,
      };
    }
  }
}
