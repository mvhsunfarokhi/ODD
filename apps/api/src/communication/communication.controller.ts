import { Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactMessage, NewsletterSubscriber, Order, OrderDocument } from './communication.schema';

@Controller()
export class CommunicationController {
  constructor(
    @InjectModel(NewsletterSubscriber.name) private readonly newsletterModel: Model<NewsletterSubscriber>,
    @InjectModel(ContactMessage.name) private readonly contactModel: Model<ContactMessage>,
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {}

  @Post('newsletter')
  async subscribe(@Body() body: { email?: string }) {
    const email = body.email?.trim().toLowerCase();
    if (!email) return { ok: false, message: 'ایمیل الزامی است.' };
    await this.newsletterModel.updateOne({ email }, { email }, { upsert: true });
    return { ok: true, message: 'ممنون؛ شما به فهرست ما اضافه شدید.' };
  }

  @Post('contact')
  async contact(@Body() body: { name?: string; email?: string; message?: string }) {
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) return { ok: false, message: 'همهٔ فیلدها را کامل کنید.' };
    await this.contactModel.create({ name: body.name, email: body.email, message: body.message });
    return { ok: true, message: 'ممنون؛ به‌زودی با شما تماس می‌گیریم.' };
  }

  @Post('orders')
  async createOrder(@Body() body: { items?: Array<{ handle: string; name: string; price: number; qty: number }>; total?: number }) {
    const items = (body.items || []).filter(item => item.qty > 0);
    if (!items.length) return { ok: false, message: 'سبد خرید خالی است.' };
    const order = await this.orderModel.create({ items, total: body.total || 0, status: 'pending' });
    return { ok: true, orderId: order._id.toString(), message: 'سفارش شما برای پیگیری آماده شد.' };
  }
}
