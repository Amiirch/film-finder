import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true, dropDups: true })
  username: string;

  @Prop({ required: true, unique: true, dropDups: true })
  email: string;

  @Prop()
  number: number;

  @Prop({ required: true })
  password: string;

  @Prop()
  address: string;

  @Prop({ required: true })
  role: string;

  @Prop()
  createdAt: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
