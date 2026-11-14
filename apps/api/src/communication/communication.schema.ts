import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class NewsletterSubscriber {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;
}

export const NewsletterSchema = SchemaFactory.createForClass(NewsletterSubscriber);

@Schema({ timestamps: true })
export class ContactMessage {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true, trim: true })
  message!: string;
}

export const ContactSchema = SchemaFactory.createForClass(ContactMessage);

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, type: Array })
  items!: Array<{ handle: string; name: string; price: number; qty: number }>;

  @Prop({ required: true })
  total!: number;

  @Prop({ required: true, default: 'pending' })
  status!: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
