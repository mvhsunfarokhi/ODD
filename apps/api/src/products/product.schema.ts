import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true })
  handle!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true, enum: ['blend', 'single', 'pods', 'experience'] })
  category!: string;

  @Prop({ required: true })
  image!: string;

  @Prop({ required: true })
  description!: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
