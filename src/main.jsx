import React, {useMemo,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Search,ShoppingCart,Heart,Menu,ArrowUpRight,ArrowRight,Star,Gift,Truck,ShieldCheck,Plus,Minus,X, Sparkles} from 'lucide-react';
import './style.css';
const A='/assets/';
const categories=[['🧸','Toys','Playful picks'],['🐰','Cute Lamps','Warm little lights'],['🪴','Home Decor','Cosy corners'],['🎁','Gifts','Made to delight'],['💝','Personalized','Made just for you'],['🐾','Pet Supplies','Pawsome essentials'],['🍼','Baby Products','Little daily joys'],['🌷','Flowers','Send some love'],['🍰','Cakes','Sweet surprises'],['🎉','Occasions','Every reason to smile']];
const products=[
{id:1,name:'Panda Glow Night Lamp',category:'Cute Lamps',price:699,old:999,tag:'BESTSELLER',emoji:'🐼',img:'panda-lamp.png',desc:'A warm, gentle glow and an irresistibly cute panda design.'},
{id:2,name:'Bunny Glow Lamp',category:'Cute Lamps',price:549,old:799,tag:'LOVED',emoji:'🐰',img:'bunny-lamp.jpeg',desc:'A soft warm night light for bedrooms, desks and thoughtful gifting.'},
{id:3,name:'Cozy Panda Lamp',category:'Cute Lamps',price:899,old:1199,tag:'NEW',emoji:'🐼',img:'rabbit-lamp.png',desc:'A cuddly character lamp that makes every corner feel cosier.'},
{id:4,name:'Little Moments Gift Box',category:'Gifts',price:1099,old:1499,tag:'GIFT PICK',emoji:'🎁',img:'hero-toys-banner.png',desc:'A colourful gift-ready surprise for birthdays and special days.'},
{id:5,name:'Teddy Bear Bestie',category:'Toys',price:499,old:699,tag:'POPULAR',emoji:'🧸',desc:'A soft, huggable friend for all ages.'},
{id:6,name:'Personalised Love Gift',category:'Personalized',price:799,old:999,tag:'MADE FOR YOU',emoji:'💝',desc:'A thoughtful little keepsake for someone special.'},
{id:7,name:'Pawfect Pet Gift Set',category:'Pet Supplies',price:599,old:799,tag:'SALE',emoji:'🐾',desc:'A playful bundle for the four-legged family member.'},
{id:8,name:'Tiny Joy Baby Set',category:'Baby Products',price:899,old:1199,tag:'GIFT PICK',emoji:'🍼',desc:'Sweet essentials for the newest little person.'}
];
function App(){const [cart,setCart]=useState([]),[likes,setLikes]=useState([]),[query,setQuery]=useState(''),[category,setCategory]=useState('All'),[sort,setSort]=useState('Featured'),[selected,setSelected]=useState(null),[cartOpen,setCartOpen]=useState(false),[menu,setMenu]=useState(false),[toast,setToast]=useState('');

const filtered = useMemo(() =>
  products
    .filter(p =>
      (p.name + ' ' + p.category)
        .toLowerCase()
        .includes(query.toLowerCase())
    )
    .sort((a, b) =>
      sort === 'Price: low to high'
        ? a.price - b.price
        : sort === 'Price: high to low'
          ? b.price - a.price
          : 0
    ),
  [query, sort]
);

const orderedCategoryNames = useMemo(() => {
  const names = categories.map(([, name]) => name);

  if (category === 'All') return names;

  const start = names.indexOf(category);

  if (start === -1) return names;

  return [...names.slice(start), ...names.slice(0, start)];
}, [category]);

const visibleCategoryNames = orderedCategoryNames.filter(name =>
  filtered.some(p => p.category === name)
);

const count=cart.reduce((n,p)=>n+p.qty,0),total=cart.reduce((n,p)=>n+p.price*p.qty,0);
function add(p){setCart(c=>{const found=c.find(x=>x.id===p.id);return found?c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...c,{...p,qty:1}]});setToast(`${p.name} added to your bag`);setTimeout(()=>setToast(''),2200)}
function qty(id,d){setCart(c=>c.map(p=>p.id===id?{...p,qty:p.qty+d}:p).filter(p=>p.qty>0))}
function toggleLike(p){setLikes(l=>l.includes(p.id)?l.filter(id=>id!==p.id):[...l,p.id])}
function ProductCard({p}){return <article className="product-card"><button className={`like ${likes.includes(p.id)?'liked':''}`} onClick={()=>toggleLike(p)} aria-label="Add to favourites"><Heart size={18} fill={likes.includes(p.id)?'currentColor':'none'}/></button><button className="product-visual" onClick={()=>setSelected(p)}><span className="tag">{p.tag}</span>{p.img?<img src={A+p.img} alt={p.name}/>:<span className="emoji-product">{p.emoji}</span>}<span className="quick-view">Quick view <ArrowUpRight size={15}/></span></button><div className="product-info"><span className="product-category">{p.category}</span><button className="product-name" onClick={()=>setSelected(p)}>{p.name}</button><div className="rating"><span>★★★★★</span><small>(4.9)</small></div><div className="product-bottom"><div><b>₹{p.price.toLocaleString('en-IN')}</b>{p.old&&<del>₹{p.old.toLocaleString('en-IN')}</del>}</div><button className="add-btn" onClick={()=>add(p)}><Plus size={16}/><span>Add</span></button></div></div></article>}
return <><div className="announcement"><span>✨ Buy 5 or more to get free delivery</span><i/> <span>Tamil Nadu delivery ₹40</span><i/><span>Fast delivery in 2–3 working days</span></div><header className="header"><a className="brand" href="#home"><span className="brand-mark"><img src={A+'logo-panda.jpeg'} alt=""/></span><span><b>S SQUARE</b><em>Elite</em><small>G I F T&nbsp; S H O P</small></span></a><nav className={menu?'nav open':'nav'}><a href="#categories" onClick={()=>setMenu(false)}>Categories</a><a href="#products" onClick={()=>setMenu(false)}>Products</a><a href="#giftsets" onClick={()=>setMenu(false)}>Gift Sets</a><a href="#footer" onClick={()=>setMenu(false)}>Contact</a></nav><div className="header-actions"><label className="search-pill"><Search size={17}/><input aria-label="Search products" placeholder="Search gifts..." value={query} onChange={e=>{setQuery(e.target.value);document.getElementById('products')?.scrollIntoView({behavior:'smooth'})}}/></label><button className="cart-button" onClick={()=>setCartOpen(true)}><ShoppingCart size={18}/><span>Bag</span><b>{count}</b></button><button className="mobile-menu" onClick={()=>setMenu(!menu)} aria-label="Menu">{menu?<X/>:<Menu/>}</button></div></header>
<main id="home"><section className="hero"><div className="hero-art" aria-hidden="true"></div><div className="hero-shade"></div><div className="hero-content"><span className="eyebrow"><Sparkles size={15}/> LITTLE MOMENTS, BIG SMILES</span><h1>Gifts that make<br/><span>hearts happy.</span></h1><p className="hero-lead">Toys · Gifts · Cute Lamps · More Happiness</p><div className="hero-buttons"><a className="primary-btn" href="#products">Shop the collection <ArrowUpRight size={18}/></a><a className="secondary-btn" href="#giftsets">Find a gift <Gift size={17}/></a></div><div className="trust-row"><div><b>10K+</b><span>Happy orders</span></div><div><b>4.9 <Star size={16} fill="currentColor"/></b><span>Customer rating</span></div><div><b>100%</b><span>Secure checkout</span></div></div></div><div className="hero-note"><span>🎁</span><div><b>A little joy, wrapped up</b><small>Gifts for every kind of smile</small></div></div><a href="#categories" className="scroll-cue">SCROLL TO EXPLORE <ArrowRight size={14}/></a></section>
<section className="category-section section-wrap" id="categories"><div className="section-heading"><div><span className="section-kicker">FIND YOUR HAPPY</span><h2>Shop by category</h2><p>A little something for every kind of smile.</p></div><a href="#products" className="text-link">Explore all <ArrowUpRight size={17}/></a></div><div className="category-grid">{categories.map(([icon,name,sub])=><button key={name} className={`category-card ${category===name?'active':''}`} onClick={()=>{setCategory(category===name?'All':name);document.getElementById('products').scrollIntoView({behavior:'smooth'})}}><span className="category-icon">{icon}</span><b>{name}</b><small>{sub}</small><span className="category-arrow"><ArrowUpRight size={15}/></span></button>)}</div></section>



<section className="products-section section-wrap" id="products">
  <div className="section-heading">
    <div>
      <span className="section-kicker">THE CROWD FAVOURITES</span>
      <h2>
        {category === 'All'
          ? 'Little things. Big joy.'
          : category}
      </h2>
      <p>
        Thoughtfully picked, joyfully gifted. Keep scrolling to discover more.
      </p>
    </div>

    <div className="product-controls">
      <div className="search-inline">
        <Search size={17} />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Find your favourite..."
        />
      </div>

      <select
        value={sort}
        onChange={e => setSort(e.target.value)}
        aria-label="Sort products"
      >
        <option>Featured</option>
        <option>Price: low to high</option>
        <option>Price: high to low</option>
      </select>
    </div>
  </div>

  {category !== 'All' && (
    <button
      className="clear-filter"
      onClick={() => setCategory('All')}
    >
      Show all categories <X size={14} />
    </button>
  )}

  {visibleCategoryNames.map((categoryName, index) => {
    const categoryProducts = filtered.filter(
      p => p.category === categoryName
    );

    return (
      <div
        className="category-product-block"
        key={categoryName}
        id={`category-${categoryName.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="category-products-heading">
          <div>
            <span className="section-kicker">
              {categories.find(([, name]) => name === categoryName)?.[0]}
              {' '}EXPLORE THE COLLECTION
            </span>

            <h2>{categoryName}</h2>

            <p>
              {categoryProducts.length}{' '}
              {categoryProducts.length === 1
                ? 'lovely find'
                : 'lovely finds'}{' '}
              to discover
            </p>
          </div>
        </div>

        <div className="product-grid">
          {categoryProducts.map(p => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>

        {index < visibleCategoryNames.length - 1 && (
          <div className="next-category">
            <span>KEEP THE JOY GOING</span>
            <b>More lovely finds are just below.</b>
            <span className="scroll-discover">
              ↓ Scroll to discover more
            </span>
          </div>
        )}
      </div>
    );
  })}

  {filtered.length === 0 && (
    <p className="empty">
      No treasures found. Try another search.
    </p>
  )}
</section>


<section className="gift-banner section-wrap" id="giftsets"><div className="gift-banner-copy"><span className="section-kicker">MADE TO MAKE SOMEONE SMILE</span><h2>Good things come<br/>in <em>gift boxes.</em></h2><p>Little surprises, big feelings. Find a thoughtful gift for their next special moment.</p><a className="primary-btn" href="#products" onClick={()=>setCategory('Gifts')}>Explore gift sets <ArrowUpRight size={17}/></a></div><div className="gift-banner-art"><img src={A+'hero-toys-banner.png'} alt="Colourful gifts and cute toys"/></div><span className="banner-sparkle s1">✳</span><span className="banner-sparkle s2">✦</span></section>
<section className="promise-strip section-wrap"><div><Truck/><b>Careful delivery</b><span>2–3 working days</span></div><div><Gift/><b>Gift-ready joy</b><span>Made for moments</span></div><div><ShieldCheck/><b>Shop with ease</b><span>Secure checkout</span></div><div><Heart/><b>Picked with love</b><span>For every kind of smile</span></div></section></main>
<footer id="footer"><a className="brand footer-brand" href="#home"><span className="brand-mark"><img src={A+'logo-panda.jpeg'} alt=""/></span><span><b>S SQUARE</b><em>Elite</em><small>G I F T&nbsp; S H O P</small></span></a><p>Little moments, big smiles. Thoughtful gifts for all the people you love.</p><span>© 2026 S Square Elite Gift Shop</span></footer>
<div className="mobile-bottom"><a href="#categories"><Gift size={18}/><span>Categories</span></a><a href="#products"><Search size={18}/><span>Explore</span></a><button onClick={()=>setCartOpen(true)}><ShoppingCart size={19}/><span>Bag ({count})</span></button><button onClick={()=>document.getElementById('favourites')?.scrollIntoView()}><Heart size={18}/><span>Liked ({likes.length})</span></button></div>
{toast&&<div className="toast"><span>✓</span>{toast}</div>}
{cartOpen&&<div className="overlay" onClick={()=>setCartOpen(false)}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><span className="section-kicker">YOUR LITTLE TREASURES</span><h2>Your bag <span>({count})</span></h2></div><button className="close-btn" onClick={()=>setCartOpen(false)}><X/></button></div>{cart.length===0?<div className="empty-cart"><span>🛍️</span><h3>Your bag is waiting for joy.</h3><p>Find a little something to make someone smile.</p><button className="primary-btn" onClick={()=>setCartOpen(false)}>Explore gifts <ArrowRight size={16}/></button></div>:<><div className="cart-items">{cart.map(p=><div className="cart-item" key={p.id}><div className="cart-thumb">{p.img?<img src={A+p.img}/>:p.emoji}</div><div className="cart-item-info"><b>{p.name}</b><span>₹{p.price.toLocaleString('en-IN')}</span><div className="qty"><button onClick={()=>qty(p.id,-1)}><Minus size={13}/></button><span>{p.qty}</span><button onClick={()=>qty(p.id,1)}><Plus size={13}/></button></div></div><b>₹{(p.price*p.qty).toLocaleString('en-IN')}</b></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><b>₹{total.toLocaleString('en-IN')}</b></div><small>Delivery charges calculated at checkout. Free delivery when you buy 5 or more.</small><button className="primary-btn checkout" onClick={()=>setToast('Checkout will be connected with the backend soon.')}>Continue to checkout <ArrowRight size={17}/></button></div></>}</aside></div>}
{selected&&<div className="overlay modal-overlay" onClick={()=>setSelected(null)}><div className="product-modal" onClick={e=>e.stopPropagation()}><button className="close-btn modal-close" onClick={()=>setSelected(null)}><X/></button><div className="modal-image">{selected.img?<img src={A+selected.img} alt={selected.name}/>:<span>{selected.emoji}</span>}</div><div className="modal-info"><span className="section-kicker">A LITTLE SOMETHING SPECIAL</span><h2>{selected.name}</h2><div className="rating"><span>★★★★★</span><small>4.9 customer rating</small></div><p>{selected.desc}</p><div className="modal-price"><b>₹{selected.price.toLocaleString('en-IN')}</b>{selected.old&&<del>₹{selected.old.toLocaleString('en-IN')}</del>}</div><div className="modal-actions"><button className="primary-btn" onClick={()=>{add(selected);setSelected(null)}}><ShoppingCart size={17}/> Add to bag</button><button className={`favourite-btn ${likes.includes(selected.id)?'liked':''}`} onClick={()=>toggleLike(selected)}><Heart fill={likes.includes(selected.id)?'currentColor':'none'}/>{likes.includes(selected.id)?'Saved':'Save for later'}</button></div><div className="related"><b>You might love these too</b><div>{products.filter(p=>p.id!==selected.id&&(p.category===selected.category||p.category==='Gifts')).slice(0,3).map(p=><button key={p.id} onClick={()=>setSelected(p)}><span>{p.emoji}</span><small>{p.name}</small></button>)}</div></div></div></div></div>}
</>}

createRoot(document.getElementById('root')).render(<App/>);
