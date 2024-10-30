import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';
export class MovieDto {
  @IsNotEmpty({ message: 'Please Enter Full Name' })
  @IsString({ message: 'Please Enter Valid Name' })
  fullName: string;
  @IsNotEmpty({ message: 'Please Enter Description' })
  @IsString({ message: 'Please Enter Valid description' })
  description: string;
  @IsNotEmpty({ message: 'Please Enter Director' })
  @IsString({ message: 'Please Enter Valid Name' })
  director: string;
  @IsNotEmpty({ message: 'Please Enter Budget' })
  @IsString({ message: 'Please Enter Valid Budget' })
  budget: string;
  @IsNotEmpty({ message: 'Please Enter rating' })
  @IsNumber()
  rating: number;
  @IsNotEmpty({ message: 'Please Enter country' })
  country: string;
  @IsNotEmpty({ message: 'Please Enter releasedAt' })
  @IsNumber()
  releasedAt: number;
  @IsNotEmpty({ message: 'Please Enter genres' })
  genres: Types.ObjectId[];
}
