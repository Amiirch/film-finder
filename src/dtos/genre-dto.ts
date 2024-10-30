import { IsNotEmpty, IsString } from 'class-validator';

export class GenreDto {
  @IsNotEmpty({ message: 'Please Enter Full Name' })
  @IsString({ message: 'Please Enter Valid Name' })
  fullName: string;
  @IsNotEmpty({ message: 'Please Enter description' })
  @IsString({ message: 'Please Enter Valid Name' })
  description: string;
}
