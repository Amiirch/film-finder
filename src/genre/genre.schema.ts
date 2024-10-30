import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GenreDocument = HydratedDocument<Genre>;

@Schema()
export class Genre {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  description: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
