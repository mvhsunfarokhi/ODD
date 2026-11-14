import { CommunicationController } from '../src/communication/communication.controller';

describe('CommunicationController', () => {
  it('stores newsletter subscriptions and contact messages', async () => {
    const newsletter = { updateOne: jest.fn().mockResolvedValue({}) };
    const contact = { create: jest.fn().mockResolvedValue({}) };
    const orders = { create: jest.fn() };
    const controller = new CommunicationController(newsletter as any, contact as any, orders as any);

    expect(await controller.subscribe({ email: ' QA@EXAMPLE.COM ' })).toEqual({ ok: true, message: 'ممنون؛ شما به فهرست ما اضافه شدید.' });
    expect(newsletter.updateOne).toHaveBeenCalledWith({ email: 'qa@example.com' }, { email: 'qa@example.com' }, { upsert: true });
    expect(await controller.contact({ name: 'تست', email: 'qa@example.com', message: 'پیام' })).toEqual({ ok: true, message: 'ممنون؛ به‌زودی با شما تماس می‌گیریم.' });
    expect(contact.create).toHaveBeenCalled();
  });

  it('creates an order from a non-empty cart', async () => {
    const order = { create: jest.fn().mockResolvedValue({ _id: { toString: () => 'order-1' } }) };
    const controller = new CommunicationController({ updateOne: jest.fn() } as any, { create: jest.fn() } as any, order as any);
    const result = await controller.createOrder({ items: [{ handle: 'coffee-coffee', name: 'قهوه کافی‌کافی', price: 18, qty: 2 }], total: 36 });
    expect(result.ok).toBe(true);
    expect(result.orderId).toBe('order-1');
    expect(order.create).toHaveBeenCalledWith(expect.objectContaining({ total: 36, status: 'pending' }));
  });
});
