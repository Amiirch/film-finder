import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true })
  budget: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  country: string;

  @Prop()
  releasedAt: number;

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Genre' }])
  genres!: Types.ObjectId[];
}
export const MovieSchema = SchemaFactory.createForClass(Movie);
