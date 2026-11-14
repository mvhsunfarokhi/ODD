export const images = {
  hero: '/assets/odd-adventure-tabletop.png',
  coffee: '/assets/odd-coffee-coffee.png',
  goodDay: '/assets/odd-good-day-coffee.png',
  rogue: '/assets/odd-rogue-coffee.png',
  dark: '/assets/odd-dark-coffee.png',
  decaf: '/assets/odd-decaf-coffee.png',
  singleKenya: '/assets/odd-kamvara-estate.png',
  singlePeru: '/assets/odd-elver-maluquis-guevara.png',
  singleColombia: '/assets/odd-lomaverde-colombia.png',
  singleEthiopia: '/assets/odd-ethiopia-ayla-bombe.png',
  singleBrazil: '/assets/odd-gandula-brazil.png',
  adventure: '/assets/odd-adventure-coffee.png',
  pods: '/assets/odd-coffee-collection-hand.png',
  adventureTabletop: '/assets/odd-adventure-tabletop.png',
  coffeeShop: '/assets/odd-adventure-tabletop.png',
  espresso: '/assets/odd-adventure-coffee.png',
  wholesale: '/assets/odd-coffee-collection-hand.png',
  brew: '/assets/odd-coffee-collection-hand.png',
  brandMark: '/assets/odd-logo-cup-moka.png',
};

export const localProducts = [
  { handle: 'coffee-coffee', name: 'قهوه کافی‌کافی', price: 18, category: 'blend', image: images.coffee, description: 'یک ترکیب آشنا و دلنشین با نت‌های شکلات، کارامل و پایانی شیرین.' },
  { handle: 'good-day-coffee', name: 'قهوه روز خوب', price: 18, category: 'blend', image: images.goodDay, description: 'روشن، شیرین و روان؛ ترکیبی برای اینکه هر صبح، روز خوب شما باشد.' },
  { handle: 'rogue-coffee', name: 'قهوه روگ', price: 18, category: 'blend', image: images.rogue, description: 'کمی میوه‌ای‌تر، کمی پیچیده‌تر و همیشه آمادهٔ یک ماجراجویی.' },
  { handle: 'dark-coffee', name: 'قهوه دارک', price: 18, category: 'blend', image: images.dark, description: 'بدنه‌ای پر، شکلات تلخ و پایانی غنی برای دوستداران اسپرسوی پرقدرت.' },
  { handle: 'decaf-coffee', name: 'قهوه بدون کافئین', price: 18, category: 'blend', image: images.decaf, description: 'تمام گرما و حال‌وهوای قهوهٔ خوب، بدون کافئین.' },
  { handle: 'redbrick-kamvara-estate-aa-wash-so', name: 'کاموارا استیت AA، کنیا', price: 24, category: 'single', image: images.singleKenya, description: 'قهوه‌ای تک‌خاستگاه، شفاف و پرطراوت با میوه‌ای روشن و پایانی تمیز.' },
  { handle: 'redbrick-elver-maluguis-guevara-wash-so', name: 'الور مالوگیس گوارا، پرو', price: 24, category: 'single', image: images.singlePeru, description: 'شیرین و متعادل با نت‌های میوهٔ هسته‌دار، کاکائو و شکر قهوه‌ای.' },
  { handle: 'redbrick-lomaverde-washed-colombia-so', name: 'لوماورده، کلمبیا', price: 24, category: 'single', image: images.singleColombia, description: 'نرم و صیقلی با شیرینی تافی و رایحه‌ای لطیف از مرکبات.' },
  { handle: 'redbrick-ayla-bombe-wash-ethiopia-so', name: 'آیلا بومبه، اتیوپی', price: 26, category: 'single', image: images.singleEthiopia, description: 'گل‌فام و معطر، سرشار از شخصیت میوه‌های هسته‌دار.' },
  { handle: 'gandula-brazil', name: 'گاندولا، برزیل', price: 22, category: 'single', image: images.singleBrazil, description: 'آجیلی و آرامش‌بخش با شیرینی پرالین و بدنه‌ای گرد.' },
  { handle: 'redbrick-adventure-coffee-225g', name: 'قهوه ماجراجویی', price: 22, category: 'single', image: images.adventure, description: 'قهوه‌ای فصلی برای نوشندگان کنجکاو و آخرهفته‌های پرماجرا.' },
  { handle: 'coffee-coffee-pods', name: 'کپسول کافی‌کافی', price: 16, category: 'pods', image: images.pods, description: 'ترکیب آشنای ODD، بسته‌بندی‌شده برای یک فنجان راحت و خوش‌طعم.' },
  { handle: 'redbrick-adventure-steep-box', name: 'بسته دم‌آوری ماجراجویی', price: 19, category: 'pods', image: images.adventureTabletop, description: 'کیسه‌های دم‌آوری برای قهوهٔ خوب، هر جا که روز شما را می‌برد.' },
  { handle: 'home-barista-course', name: 'دورهٔ باریستای خانگی', price: 165, category: 'experience', image: images.espresso, description: 'دو ساعت آموزش، یک بعدازظهر صمیمی در دفتر ODD و سال‌ها قهوهٔ بهتر.' },
];

export const pageLinks = [
  ['دربارهٔ ما', '/pages/about'], ['فروش عمده', '/pages/wholesale'], ['قهوهٔ اداری', '/pages/office-coffee'], ['تماس با ما', '/pages/contact'],
  ['فروشگاه', '/collections/all'], ['ترکیب‌ها', '/collections/blend'], ['تک‌خاستگاه‌ها', '/collections/single'], ['اشتراک قهوه', '/collections/subscriptions'],
  ['مجله', '/blogs/blog'], ['راهنمای دم‌آوری', '/blogs/brew-guides'], ['ارسال و مرجوعی', '/pages/shipping-returns'], ['حریم خصوصی', '/pages/privacy-policy'], ['قوانین و شرایط', '/pages/terms-and-conditions'],
];

export const articles = [
  { slug: 'our-story', category: 'blog', title: 'داستان ما', excerpt: 'قهوه برای نوشندگان، برشته‌شده برای آدم‌های کنجکاو؛ نگاهی کوتاه به آغاز ODD.', image: images.hero },
  { slug: 'washed-vs-natural-coffee-what-is-the-difference', category: 'blog', title: 'قهوه شسته یا طبیعی؛ تفاوت چیست؟', excerpt: 'دو روش فرآوری قهوه و تأثیر آن‌ها بر فنجانی که می‌نوشیم.', image: images.singleKenya },
  { slug: 'coffee-coffee-so-good-you-say-it-twice', category: 'blog', title: 'کافی‌کافی؛ آن‌قدر خوب که دوبار می‌گویید', excerpt: 'با ترکیبی آشنا شوید که از روز اول قلب ODD بوده است.', image: images.coffee },
  { slug: 'looking-to-make-your-redbrick-coffee-at-home-even-better', category: 'blog', title: 'قهوهٔ ODD را در خانه بهتر دم کنید', excerpt: 'چند تغییر کوچک که تفاوت بزرگی در فنجان روزانه‌تان می‌سازند.', image: images.espresso },
  { slug: 'limited-release-coffee', category: 'blog', title: 'قهوهٔ عرضهٔ محدود', excerpt: 'قهوه‌های فصلی، محموله‌های کوچک و لذت دنبال‌کردن برداشت‌ها.', image: images.adventure },
  { slug: 'brewing-aeropress', category: 'brew-guides', title: 'دم‌آوری با ایروپرس', excerpt: 'دستوری سریع و منعطف برای فنجانی شیرین و متعادل.', image: images.brew },
  { slug: 'brewing-pourover', category: 'brew-guides', title: 'دم‌آوری پوراور', excerpt: 'راهنمایی آرام و شفاف برای گرفتن بهترین نتیجه از قهوهٔ فیلتری.', image: images.singleColombia },
  { slug: 'brewing-stovetop', category: 'brew-guides', title: 'دم‌آوری با موکاپات', excerpt: 'غلیظ، پرقدرت و مناسب صبح‌های آرام.', image: images.dark },
  { slug: 'brewing-french-press', category: 'brew-guides', title: 'دم‌آوری با فرنچ‌پرس', excerpt: 'روشی ساده با غوطه‌وری کامل و بدنه‌ای پر.', image: images.goodDay },
];

export const infoPages = {
  '/pages/about': { title: 'برای دوستداران قهوه.', intro: 'ODD یک برشته‌کاری مستقل قهوهٔ تخصصی است. با کنجکاوی برشته می‌کنیم، سخاوتمندانه سرو می‌کنیم و برای کسانی قهوه می‌سازیم که آن را می‌نوشند.', image: images.hero, heading: 'قهوه باید روز را بهتر کند.', body: 'ODD را شروع کردیم چون می‌خواستیم قهوه‌ای را که دوست داشتیم، راحت‌تر پیدا کنید. امروز ترکیب‌ها و تک‌خاستگاه‌های متغیری را برشته می‌کنیم و از تولیدکنندگان و آدم‌های پشت این فنجان یاد می‌گیریم.' },
  '/pages/wholesale': { title: 'قهوه برای کسب‌وکار شما.', intro: 'چه کافه‌ای شلوغ داشته باشید، چه رستورانی محلی یا دفتری پر از آدم‌های قهوه‌دوست، می‌توانیم کمک کنیم.', image: images.wholesale, heading: 'راهی مشارکتی برای قهوه‌ای بهتر.', body: 'با کسب‌وکارهای مختلف همکاری می‌کنیم تا قهوه، آموزش و پشتیبانی مناسب را پیدا کنند. از پروژه‌تان بگویید تا با هم یک برنامهٔ خوش‌طعم بسازیم.' },
  '/pages/office-coffee': { title: 'قهوهٔ بهتر در محل کار.', intro: 'قهوه یکی از ساده‌ترین راه‌ها برای تبدیل دفتر به جایی است که آدم‌ها دوست دارند در آن باشند. ما سرو قهوهٔ خوب را آسان می‌کنیم.', image: images.coffeeShop, heading: 'قهوه‌ای برای حرکت تیم.', body: 'از ارسال‌های منظم تا راهنمایی انتخاب تجهیزات و راه‌اندازی، سرویس قهوهٔ اداری ما برای ساختن فنجانی ساده، مطمئن و واقعاً لذت‌بخش طراحی شده است.' },
  '/pages/shipping-returns': { title: 'ارسال و مرجوعی.', intro: 'هر سفارش را با دقت بسته‌بندی می‌کنیم و می‌فرستیم.', image: images.adventure, heading: 'خلاصهٔ ماجرا.', body: 'سفارش‌ها در روزهای کاری ارسال می‌شوند. اگر سفارش آسیب‌دیده یا نادرست رسید، با ما تماس بگیرید تا درستش کنیم.' },
  '/pages/privacy-policy': { title: 'حریم خصوصی.', intro: 'به اطلاعات شما احترام می‌گذاریم و فقط برای ارائهٔ خدمت از آن استفاده می‌کنیم.', image: images.dark, heading: 'نکات اصلی.', body: 'اطلاعات لازم برای پردازش سفارش و پاسخ‌گویی را جمع‌آوری می‌کنیم. اطلاعات شخصی را نمی‌فروشیم.' },
  '/pages/terms-and-conditions': { title: 'قوانین و شرایط.', intro: 'قوانین سادهٔ استفاده از فروشگاه ODD.', image: images.goodDay, heading: 'یک توافق روشن و منصفانه.', body: 'با استفاده از این سایت موافقت می‌کنید اطلاعات درست بدهید و از سایت به شکل قانونی استفاده کنید.' },
};

export const siteDetails = { address: 'تهران، خیابان ولیعصر، کوچهٔ قهوه، پلاک ۲۴، کافهٔ ODD', email: 'hello@oddcoffee.example' };

export const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
export const AUD_TO_TOMAN = 184500;
export function toPersianDigits(value) { return String(value).replace(/\d/g, (digit) => persianDigits[digit]); }
export function money(value) { return `${toPersianDigits(Math.round(Number(value) * AUD_TO_TOMAN).toLocaleString('en-US'))} تومان`; }
