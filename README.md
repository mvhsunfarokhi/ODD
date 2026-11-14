# ODD Coffee — Next + Nest + Mongo

نسخهٔ کامل ODD با همان UI فارسی و RTL، به‌صورت یک پروژهٔ full-stack ساخته شده است.

## ساختار

- `apps/web`: فرانت Next.js با App Router و تمام مسیرهای فروشگاه، وبلاگ، صفحه‌های اطلاعاتی و تعاملات سبد خرید.
- `apps/api`: بک‌اند NestJS با endpointهای محصولات، خبرنامه، تماس و سفارش.
- MongoDB: ذخیرهٔ محصولات، مشترک‌های خبرنامه، پیام‌های تماس و سفارش‌ها.
- `docker-compose.yml`: اجرای MongoDB، API و Next با یک دستور.

## اجرای Docker

```bash
docker compose up --build
```

- فرانت: http://localhost:3000
- API: http://localhost:4000/api
- Health: http://localhost:4000/health

در اولین اجرای API، اگر collection محصولات خالی باشد، محصولات ODD به‌صورت خودکار seed می‌شوند.

## اجرای محلی بدون Docker

ابتدا MongoDB را روی پورت ۲۷۰۱۷ اجرا کنید، سپس:

```bash
npm install
npm --prefix apps/api install
npm --prefix apps/web install
npm run dev
```

برای تست و build:

```bash
npm test
npm run build
```

قیمت‌ها بر پایهٔ قیمت پایهٔ AUD و نرخ نمایشی ثابت ۱۸۴٬۵۰۰ تومان برای هر دلار استرالیا در فرانت نمایش داده می‌شوند.
