import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ContactMessage, ContactSchema, NewsletterSchema, NewsletterSubscriber, Order, OrderSchema } from './communication/communication.schema';
import { CommunicationController } from './communication/communication.controller';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/odd'),
    MongooseModule.forFeature([
      { name: NewsletterSubscriber.name, schema: NewsletterSchema },
      { name: ContactMessage.name, schema: ContactSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
    ProductsModule,
  ],
  controllers: [CommunicationController],
})
export class AppModule {}
