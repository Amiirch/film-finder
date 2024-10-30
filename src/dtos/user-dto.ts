import { IsNotEmpty, IsEmail, Length, IsString } from 'class-validator';
class UserDto {
  @IsNotEmpty({ message: 'Please Enter Full Name' })
  @IsString({ message: 'Please Enter Valid Name' })
  fullName: string;
  @IsNotEmpty({ message: 'Please Enter Full Name' })
  username: string;
  @IsEmail()
  email: string;
  number: number;
  @Length(6, 50, {
    message: 'Password length Must be between 6 and 50 charcters',
  })
  password: string;
  address: string;
  role: string;
  createdAt: number;
}
class SignInDto {
  @IsNotEmpty({ message: 'Please Enter Full Name' })
  username: string;

  password: string;
}
export { UserDto, SignInDto };
