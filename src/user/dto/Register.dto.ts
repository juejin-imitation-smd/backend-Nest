import { ApiProperty } from "@nestjs/swagger";

export class Register {
  @ApiProperty()
  user_name: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  repeat_password: string;
}
