import { ApiProperty } from '@nestjs/swagger';

export class Login {
  @ApiProperty()
  user_name: string;
  @ApiProperty()
  password: string;
}
