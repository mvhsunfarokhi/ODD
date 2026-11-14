'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { articles, AUD_TO_TOMAN, images, infoPages, localProducts, money, pageLinks, siteDetails, toPersianDigits } from '../../lib/data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function postApi(endpoint, body, fallbackMessage) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    return await response.json();
  } catch {
    return { ok: true, message: fallbackMessage };
  }
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link href={`/products/${product.handle}`}>
        <div className="product-media"><img src={product.image} alt={product.name} loading="lazy" /></div>
        <span className="product-name">{product.name}</span>
        <span className="product-meta"><span>{product.category === 'experience' ? 'تجربه' : 'شروع از'}</span><span>{money(product.price)}</span></span>
      </Link>
    </article>
  );
}

function ProductRail({ title, href, items }) {
  return (
    <section className="section catalog-section">
      <div className="section-rule"><div className="section-head"><h2>{title}</h2><Link href={href}>مشاهدهٔ {title} <span className="arrow">←</span></Link></div></div>
      <div className="product-rail">{items.map((product) => <ProductCard key={product.handle} product={product} />)}</div>
    </section>
  );
}

function Feature({ title, body, href, label, image, className = '', reverse = false }) {
  return (
    <section className="section"><div className={`split-feature ${className} ${reverse ? 'reverse' : ''}`}>
      <div className="feature-image" style={{ backgroundImage: `url('${image}')` }} />
      <div className="feature-copy"><h2>{title}</h2><p>{body}</p><Link href={href} className="button button-light">{label} <span className="arrow">←</span></Link></div>
    </div></section>
  );
}

function Header({ cartCount, onCart, onMenu }) {
  return (
    <header className="site-header">
      <Link className="brand" href="/"><img className="brand-mark" src={images.brandMark} alt="" aria-hidden="true" /><span className="brand-name">ODD</span></Link>
      <div className="header-center">برای دوستداران قهوه</div>
      <div className="header-actions"><button className="header-action" onClick={onCart}>سبد خرید{cartCount ? <span className="cart-count">{cartCount}</span> : null}</button><button className="header-action" onClick={onMenu}>منو</button></div>
    </header>
  );
}

function Footer() {
  return <footer className="site-footer">
    <div><div className="footer-label">آدرس</div><Link className="footer-list" href="/pages/contact">{siteDetails.address}</Link></div>
    <div><div className="footer-label">دنبال کنید</div><div className="footer-list"><a href="https://instagram.com/odd.coffee/">اینستاگرام</a><a href="https://facebook.com/oddcoffee/">فیس‌بوک</a></div></div>
    <div><div className="footer-label">ارتباط</div><div className="footer-list"><a href={`mailto:${siteDetails.email}`}>{siteDetails.email}</a></div></div>
    <div><div className="footer-label">اطلاعات</div><div className="footer-list"><Link href="/blogs/blog">مجله</Link><Link href="/blogs/brew-guides">راهنمای دم‌آوری</Link><Link href="/pages/shipping-returns">ارسال و مرجوعی</Link><Link href="/pages/privacy-policy">حریم خصوصی</Link><Link href="/pages/terms-and-conditions">قوانین و شرایط</Link></div></div>
    <div className="footer-bottom"><span>© ۲۰۲۶ ODD. تمامی حقوق محفوظ است.</span><span>برشته‌کاری و سرو برای دوستداران قهوه.</span><span>طراحی توسط GO:OD</span></div>
  </footer>;
}

function NewsletterBlock() {
  const [note, setNote] = useState('');
  async function submit(event) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('email');
    const result = await postApi('newsletter', { email }, 'ممنون؛ درخواست شما ثبت شد.');
    setNote(result.message);
    event.currentTarget.reset();
  }
  return <section className="newsletter"><h2>با عضویت، ۱۰٪ تخفیف بگیرید.</h2><div><p>خبرهای خوب قهوه، عرضه‌های تازه و گاهی یک ایدهٔ عالی.</p><form className="newsletter-form" onSubmit={submit}><input name="email" type="email" placeholder="ایمیل شما" aria-label="ایمیل شما" required /><button type="submit">عضویت <span className="arrow">←</span></button></form><div className="form-note">{note}</div></div></section>;
}

function ContactForm() {
  const [note, setNote] = useState('');
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const result = await postApi('contact', values, 'ممنون؛ پیام شما ثبت شد.');
    setNote(result.message);
    form.reset();
  }
  return <form className="contact-form" onSubmit={submit}><label className="field">نام<input required name="name" /></label><label className="field">ایمیل<input required type="email" name="email" /></label><label className="field">پیام<textarea required name="message" /></label><button className="button button-solid" type="submit">ارسال پیام <span className="arrow">←</span></button><div className="form-note">{note}</div></form>;
}

function HomePage({ products }) {
  const blends = ['coffee-coffee', 'good-day-coffee', 'rogue-coffee'].map((handle) => products.find((item) => item.handle === handle)).filter(Boolean);
  const singles = ['redbrick-kamvara-estate-aa-wash-so', 'redbrick-elver-maluguis-guevara-wash-so', 'redbrick-lomaverde-washed-colombia-so'].map((handle) => products.find((item) => item.handle === handle)).filter(Boolean);
  return <>
    <div className="home-intro"><div className="promo-strip"><span>ارسال رایگان برای سفارش‌های بالای {money(70)}</span><nav className="quick-links">{pageLinks.slice(0, 4).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav></div><div className="hero"><div className="hero-copy"><p className="eyebrow">عرضهٔ فصلی جدید</p><h1 className="display">ماجراجویی در راه است.</h1><p>قهوه‌ای فصلی و محدود، برای روزهایی که زود شروع می‌شوند و به جاهای جالب می‌رسند.</p><Link href="/products/redbrick-adventure-coffee-225g" className="button button-light">مشاهدهٔ این قهوه <span className="arrow">←</span></Link></div></div></div>
    <ProductRail title="ترکیب‌ها" href="/collections/blend" items={blends} />
    <Feature title="بهترین استفاده را بکنید." body="تهِ کیسهٔ قهوه نمانید. اشتراک قهوهٔ ما، تحویل منظم و بی‌دردسر به خانه یا دفتر شماست؛ همان قهوه‌ای که در فنجان‌های ODD سرو می‌کنیم." href="/collections/subscriptions" label="مشاهدهٔ همه" image={images.coffeeShop} className="feature-cream" />
    <ProductRail title="تک‌خاستگاه‌ها" href="/collections/single" items={singles} />
    <Feature title="کپسول برای هر سلیقه." body="یک ترکیب پیچیده‌تر، روشن‌تر و میوه‌ای‌تر، و انتخابی غنی‌تر برای کسانی که قهوهٔ پرقدرت دوست دارند." href="/collections/pods" label="خرید کپسول" image={images.pods} className="feature-dark" reverse />
    <Feature title="دو ساعت آموزش برای سال‌ها قهوهٔ بهتر." body="یاد بگیرید دستگاهتان را به کار بگیرید؛ دو ساعت آموزش، یک بعدازظهر صمیمی و سال‌ها فنجان خوش‌طعم." href="/products/home-barista-course" label="بیشتر بدانید" image={images.espresso} className="feature-cream" />
    <Feature title="کافه دارید؟ یا فقط قهوهٔ زیادی لازم دارید؟" body="ما همراه شما هستیم. برای سرو قهوهٔ خوش‌طعم، قهوه و راهکار مناسب کسب‌وکارتان را با هم پیدا می‌کنیم." href="/pages/wholesale#contact" label="درخواست همکاری" image={images.wholesale} className="feature-dark" reverse />
    <NewsletterBlock />
  </>;
}

function CollectionPage({ handle, products }) {
  const removed = ['merch', 'equipment', 'espresso', 'filter', 'redbrick', 'sale', 'teas-syrups-and-elixirs'];
  if (removed.includes(handle)) handle = 'all';
  const aliases = { blend: 'blend', single: 'single', pods: 'pods', subscriptions: 'blend', 'office-coffee': 'blend', classic: 'blend', sweet: 'single', complex: 'single', rich: 'blend', bundles: 'blend', 'vacation-coffee': 'single' };
  const filtered = aliases[handle] ? products.filter((product) => product.category === aliases[handle]) : products;
  const title = handle === 'all' ? 'فروشگاه' : handle === 'pods' ? 'کافی‌کافی' : ({ blend: 'ترکیب‌ها', single: 'تک‌خاستگاه‌ها', subscriptions: 'اشتراک قهوه', 'office-coffee': 'قهوهٔ اداری', classic: 'کلاسیک', sweet: 'شیرین', complex: 'پیچیده', rich: 'غنی', bundles: 'بسته‌ها', 'vacation-coffee': 'قهوهٔ سفر' }[handle] || 'فروشگاه');
  const description = handle === 'blend' ? 'آشنا، صمیمی و پرشخصیت؛ ترکیب روزمرهٔ ODD خود را پیدا کنید.' : handle === 'single' ? 'قهوه‌های فصلی از تولیدکنندگانی که از معرفی‌شان هیجان‌زده‌ایم.' : 'چیزهای خوب برای قهوهٔ بهتر؛ در خانه، محل کار و هر جایی بین این دو.';
  return <><section className="collection-head"><p className="eyebrow">قهوهٔ ODD</p><h1>{title}</h1><p>{description}</p></section><div className="collection-layout"><nav className="filter-nav">{[['فروشگاه', '/collections/all'], ['ترکیب‌ها', '/collections/blend'], ['تک‌خاستگاه‌ها', '/collections/single'], ['کپسول‌ها', '/collections/pods']].map(([label, href]) => <Link key={href} href={href} className={href.endsWith(handle) ? 'active' : ''}>{label}</Link>)}</nav><div className="catalog-grid">{(filtered.length ? filtered : products).map((product) => <ProductCard key={product.handle} product={product} />)}</div></div></>;
}

function ProductPage({ handle, products, addToCart }) {
  const product = products.find((item) => item.handle === handle) || localProducts.find((item) => item.handle === handle) || products[0];
  const related = products.filter((item) => item.category === product.category && item.handle !== product.handle).slice(0, 3);
  const [qty, setQty] = useState(1);
  return <><div className="product-layout"><div className="product-gallery"><img src={product.image} alt={product.name} /><img src={product.image} alt={`جزئیات ${product.name}`} /><img src={product.image} alt={`بسته‌بندی ${product.name}`} /><img src={product.image} alt={`نمای نزدیک ${product.name}`} /></div><div className="product-info"><p className="eyebrow">{product.category === 'single' ? 'قهوهٔ تک‌خاستگاه فصلی' : product.category === 'experience' ? 'یادگیری با ODD' : 'قهوهٔ ODD'}</p><h1>{product.name}</h1><div className="product-price">{money(product.price)}</div><div className="copy"><p>{product.description}</p><p>تازه و آماده برای ارسال است. اندازهٔ دلخواهتان را انتخاب کنید تا آن را برایتان بفرستیم.</p></div><div className="purchase-row"><div className="quantity"><button onClick={() => setQty((value) => Math.max(1, value - 1))}>−</button><span>{toPersianDigits(qty)}</span><button onClick={() => setQty((value) => value + 1)}>+</button></div><button className="button button-solid" onClick={() => addToCart(product, qty)}>افزودن به سبد <span className="arrow">←</span></button></div><div className="accordion"><details open><summary>ارسال و تحویل</summary><p>برای سفارش‌های بالای {money(70)} ارسال رایگان است. سفارش‌ها در روزهای کاری ارسال می‌شوند.</p></details><details><summary>برشته‌کاری و دم‌آوری</summary><p>قهوه را مرتب برشته می‌کنیم و پیشنهاد می‌کنیم آن را با روشی که دوست دارید دم کنید.</p></details><details><summary>کمک لازم دارید؟</summary><p><Link href="/pages/contact">با ما در تماس باشید</Link> تا برای انتخاب بهتر راهنمایی‌تان کنیم.</p></details></div></div></div><ProductRail title="پیشنهادهای دیگر" href="/collections/all" items={related} /></>;
}

function InfoPage({ path }) {
  if (path === '/pages/contact') return <><section className="page-hero"><div className="page-hero-copy"><p className="eyebrow">قهوهٔ ODD</p><h1>سلام کنید.</h1><p>سؤال، ایدهٔ قهوه، درخواست همکاری یا فقط می‌خواهید از دم‌آوری محبوبتان بگویید؟</p></div><div className="page-hero-media" style={{ backgroundImage: `url('${images.coffeeShop}')` }} /></section><div className="content-wrap"><div className="contact-grid"><ContactForm /><div className="contact-card"><h2>{siteDetails.address}</h2><p>برای قهوه، دانه و یک گپ دوستانه به کافهٔ ODD سر بزنید.</p><p><strong>ساعت کاری</strong><br />دوشنبه تا جمعه · ۷ تا ۱۵<br />شنبه و یکشنبه · ۸ تا ۱۴</p><p><a href={`mailto:${siteDetails.email}`}>{siteDetails.email}</a></p></div></div></div></>;
  const data = infoPages[path] || { title: 'ODD', intro: 'چیزهای بیشتری از ODD برای شما.', image: images.hero, heading: 'ساخته‌شده برای دوستداران قهوه.', body: 'ما قهوهٔ تخصصی برشته می‌کنیم و تجربه‌هایی کاربردی و صمیمی پیرامون آن می‌سازیم.' };
  const storyPages = ['/pages/about', '/pages/wholesale', '/pages/office-coffee'];
  const storyImage = storyPages.includes(path) ? images.adventure : images.singleEthiopia;
  return <><section className="page-hero"><div className="page-hero-copy"><p className="eyebrow">قهوهٔ ODD</p><h1>{data.title}</h1><p>{data.intro}</p></div><div className="page-hero-media" style={{ backgroundImage: `url('${data.image}')` }} /></section><div className="content-wrap"><div className="intro-grid"><h2>{data.heading}</h2><div className="copy"><p>{data.body}</p><p>ما باور داریم قهوهٔ خوب یک رسم روزانه است، نه یک نمایش. در این فنجان جا برای دقت، بازیگوشی و کمی بی‌نظمی هست.</p></div></div><div className="story-grid"><img src={storyImage} alt="بستهٔ قهوهٔ ماجراجویی ODD" loading="lazy" /><div><h2>کنجکاو بمانید.</h2><div className="copy"><p>منوی ما با فصل‌ها تغییر می‌کند. بپرسید این روزها چه چیزی خوش‌طعم است، چیز تازه‌ای امتحان کنید و دستور را برای خودتان بسازید.</p></div><Link href="/collections/all" className="button">مشاهدهٔ قهوه‌ها <span className="arrow">←</span></Link></div></div><div className="quote">«بهترین قهوه، همان فنجانی است که شما را برای یکی دیگر مشتاق می‌کند.»</div></div></>;
}

function BlogPage({ guides = false }) {
  const list = articles.filter((article) => guides ? article.category === 'brew-guides' : article.category === 'blog');
  return <><section className="collection-head"><p className="eyebrow">مجلهٔ ODD</p><h1>{guides ? 'راهنمای دم‌آوری' : 'مجله'}</h1><p>{guides ? 'دستورهای کاربردی و یادآوری‌های ساده برای اینکه قهوهٔ خوب بخشی از زندگی شما باشد.' : 'داستان‌هایی دربارهٔ قهوه، آدم‌ها، مکان‌ها و چیزهایی که در مسیر یاد می‌گیریم.'}</p></section><div className="content-wrap"><div className="article-list">{list.map((article) => <Link className="article-card" href={`${guides ? '/blogs/brew-guides/' : '/blogs/blog/'}${article.slug}`} key={article.slug}><img src={article.image} alt={article.title} loading="lazy" /><span className="article-tag">{guides ? 'راهنمای دم‌آوری' : 'مجله'}</span><h2>{article.title}</h2><p>{article.excerpt}</p></Link>)}</div></div></>;
}

function ArticlePage({ slug, guides }) {
  const known = articles.find((article) => article.slug === slug);
  const article = known || { title: 'یادداشت ODD', excerpt: 'داستانی از ODD برای نوشندگان کنجکاو.', image: guides ? images.brew : images.hero, category: guides ? 'brew-guides' : 'blog' };
  return <article className="article-page"><p className="eyebrow">{article.category === 'brew-guides' ? 'راهنمای دم‌آوری' : 'مجله'}</p><h1>{article.title}</h1><p className="article-meta">قهوهٔ ODD · مطالعهٔ ۱۲ دقیقه‌ای</p><img className="article-cover" src={article.image} alt={article.title} /><div className="article-body"><p>{article.excerpt}</p><p>هیچ روش واحدی برای درست‌کردن قهوه وجود ندارد. مهم این است که به آب، آسیاب، دما، زمان و مهم‌تر از همه طعم فنجان خودتان توجه کنید.</p><h2>با چیزهایی که دارید شروع کنید.</h2><p>از قهوهٔ تازه، دم‌افزار تمیز و آبی استفاده کنید که طعمش را دوست دارید. هر بار فقط یک چیز را تغییر دهید تا اثر هر انتخاب را بفهمید.</p></div></article>;
}

function CartOverlay({ cart, open, onClose, onRemove, onCheckout }) {
  if (!open) return null;
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return <div className="overlay open" onClick={(event) => event.target === event.currentTarget && onClose()}><aside className="cart-panel"><div className="panel-top"><span className="brand-name">سبد خرید شما</span><button className="close-button" onClick={onClose} aria-label="بستن سبد خرید">×</button></div>{cart.length ? <><div className="cart-items">{cart.map((item, index) => <div className="cart-item" key={item.handle}><img src={item.image} alt={item.name} /><div><h3>{item.name}</h3><p>{toPersianDigits(item.qty)} × {money(item.price)}</p></div><button className="remove" onClick={() => onRemove(index)}>حذف</button></div>)}</div><div className="cart-total"><span>جمع کل</span><strong>{money(total)}</strong></div><button className="button button-solid" style={{ width: '100%' }} onClick={onCheckout}>ثبت سفارش</button></> : <div className="empty">سبد خرید شما منتظر یک انتخاب خوش‌طعم است.<br /><br /><Link href="/collections/blend" className="button">مشاهدهٔ قهوه‌ها</Link></div>}</aside></div>;
}

export default function SitePage() {
  const pathname = usePathname() || '/';
  const [products, setProducts] = useState(localProducts);
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState('');
  useEffect(() => { try { setCart(JSON.parse(window.localStorage.getItem('odd-cart') || '[]')); } catch {} }, []);
  useEffect(() => { fetch(`${API_URL}/products`).then((response) => response.ok ? response.json() : Promise.reject()).then((data) => Array.isArray(data) && data.length && setProducts(data)).catch(() => {}); }, []);
  function persist(nextCart) { setCart(nextCart); window.localStorage.setItem('odd-cart', JSON.stringify(nextCart)); }
  function addToCart(product, qty = 1) { const existing = cart.find((item) => item.handle === product.handle); const next = existing ? cart.map((item) => item.handle === product.handle ? { ...item, qty: item.qty + qty } : item) : [...cart, { handle: product.handle, name: product.name, price: product.price, image: product.image, qty }]; persist(next); setCartOpen(true); setToast(`${product.name} به سبد خرید اضافه شد`); window.setTimeout(() => setToast(''), 2300); }
  function removeFromCart(index) { persist(cart.filter((_, itemIndex) => itemIndex !== index)); }
  async function checkout() { const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0); const result = await postApi('orders', { items: cart, total }, 'سفارش شما برای پیگیری آماده شد.'); setToast(result.message); persist([]); setCartOpen(false); window.setTimeout(() => setToast(''), 2300); }
  const body = useMemo(() => {
    if (pathname === '/') return <HomePage products={products} />;
    if (pathname.startsWith('/collections/')) return <CollectionPage handle={pathname.split('/').pop()} products={products} />;
    if (pathname.startsWith('/products/')) return <ProductPage handle={pathname.split('/').pop()} products={products} addToCart={addToCart} />;
    if (pathname === '/blogs/blog') return <BlogPage />;
    if (pathname === '/blogs/brew-guides') return <BlogPage guides />;
    if (pathname.startsWith('/blogs/blog/')) return <ArticlePage slug={pathname.split('/').pop()} />;
    if (pathname.startsWith('/blogs/brew-guides/')) return <ArticlePage slug={pathname.split('/').pop()} guides />;
    if (pathname.startsWith('/pages/')) return <InfoPage path={pathname} />;
    return <InfoPage path="/pages/about" />;
  }, [pathname, products, cart]);
  return <><a className="skip-link" href="#main">رفتن به محتوای اصلی</a><Header cartCount={cart.reduce((sum, item) => sum + item.qty, 0)} onCart={() => setCartOpen(true)} onMenu={() => setMenuOpen(true)} /><main id="main" className="page-shell">{body}</main><Footer />{menuOpen ? <div className="overlay open" onClick={(event) => event.target === event.currentTarget && setMenuOpen(false)}><aside className="menu-panel"><div className="panel-top"><span className="brand-name">منو</span><button className="close-button" onClick={() => setMenuOpen(false)} aria-label="بستن منو">×</button></div><nav className="menu-links">{pageLinks.map(([label, href]) => <Link href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}</nav></aside></div> : null}<CartOverlay cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onCheckout={checkout} />{toast ? <div className="toast show">{toast}</div> : null}</>;
}
