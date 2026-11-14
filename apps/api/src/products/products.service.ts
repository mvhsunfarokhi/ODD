import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

const products = [
  ['coffee-coffee', 'قهوه کافی‌کافی', 18, 'blend', '/assets/odd-coffee-coffee.png', 'یک ترکیب آشنا و دلنشین با نت‌های شکلات، کارامل و پایانی شیرین.'],
  ['good-day-coffee', 'قهوه روز خوب', 18, 'blend', '/assets/odd-good-day-coffee.png', 'روشن، شیرین و روان؛ ترکیبی برای اینکه هر صبح، روز خوب شما باشد.'],
  ['rogue-coffee', 'قهوه روگ', 18, 'blend', '/assets/odd-rogue-coffee.png', 'کمی میوه‌ای‌تر، کمی پیچیده‌تر و همیشه آمادهٔ یک ماجراجویی.'],
  ['dark-coffee', 'قهوه دارک', 18, 'blend', '/assets/odd-dark-coffee.png', 'بدنه‌ای پر، شکلات تلخ و پایانی غنی برای دوستداران اسپرسوی پرقدرت.'],
  ['decaf-coffee', 'قهوه بدون کافئین', 18, 'blend', '/assets/odd-decaf-coffee.png', 'تمام گرما و حال‌وهوای قهوهٔ خوب، بدون کافئین.'],
  ['redbrick-kamvara-estate-aa-wash-so', 'کاموارا استیت AA، کنیا', 24, 'single', '/assets/odd-kamvara-estate.png', 'قهوه‌ای تک‌خاستگاه، شفاف و پرطراوت با میوه‌ای روشن و پایانی تمیز.'],
  ['redbrick-elver-maluguis-guevara-wash-so', 'الور مالوگیس گوارا، پرو', 24, 'single', '/assets/odd-elver-maluquis-guevara.png', 'شیرین و متعادل با نت‌های میوهٔ هسته‌دار، کاکائو و شکر قهوه‌ای.'],
  ['redbrick-lomaverde-washed-colombia-so', 'لوماورده، کلمبیا', 24, 'single', '/assets/odd-lomaverde-colombia.png', 'نرم و صیقلی با شیرینی تافی و رایحه‌ای لطیف از مرکبات.'],
  ['redbrick-ayla-bombe-wash-ethiopia-so', 'آیلا بومبه، اتیوپی', 26, 'single', '/assets/odd-ethiopia-ayla-bombe.png', 'گل‌فام و معطر، سرشار از شخصیت میوه‌های هسته‌دار.'],
  ['gandula-brazil', 'گاندولا، برزیل', 22, 'single', '/assets/odd-gandula-brazil.png', 'آجیلی و آرامش‌بخش با شیرینی پرالین و بدنه‌ای گرد.'],
  ['redbrick-adventure-coffee-225g', 'قهوه ماجراجویی', 22, 'single', '/assets/odd-adventure-coffee.png', 'قهوه‌ای فصلی برای نوشندگان کنجکاو و آخرهفته‌های پرماجرا.'],
  ['coffee-coffee-pods', 'کپسول کافی‌کافی', 16, 'pods', '/assets/odd-coffee-collection-hand.png', 'ترکیب آشنای ODD، بسته‌بندی‌شده برای یک فنجان راحت و خوش‌طعم.'],
  ['redbrick-adventure-steep-box', 'بسته دم‌آوری ماجراجویی', 19, 'pods', '/assets/odd-adventure-tabletop.png', 'کیسه‌های دم‌آوری برای قهوهٔ خوب، هر جا که روز شما را می‌برد.'],
  ['home-barista-course', 'دورهٔ باریستای خانگی', 165, 'experience', '/assets/odd-adventure-coffee.png', 'دو ساعت آموزش، یک بعدازظهر صمیمی در دفتر ODD و سال‌ها قهوهٔ بهتر.'],
].map(([handle, name, price, category, image, description]) => ({ handle, name, price, category, image, description }));

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

  async onModuleInit() {
    if (await this.productModel.countDocuments() === 0) await this.productModel.insertMany(products);
  }

  findAll(category?: string) {
    return this.productModel.find(category ? { category } : {}).sort({ createdAt: 1 }).lean();
  }

  async findOne(handle: string) {
    const product = await this.productModel.findOne({ handle }).lean();
    if (!product) throw new NotFoundException('محصول پیدا نشد');
    return product;
  }
}
