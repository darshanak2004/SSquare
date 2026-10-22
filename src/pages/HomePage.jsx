import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Star,
  Gift,
  Truck,
  ShieldCheck,
  Heart,
  Search,
  X,
} from "lucide-react";
import CategoryCard from "../components/CategoryCard.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { categories } from "../data/categories.js";
import { getAllProducts } from "../data/products.js";

const ASSET_PATH = "/assets/";

export default function HomePage() {
  const navigate = useNavigate();
  const products = getAllProducts();

  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Featured");

  const filtered = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = category === "All" || p.category === category;
        const matchesQuery = (p.name + " " + p.category)
          .toLowerCase()
          .includes(query.toLowerCase());
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sort === "Price: low to high") return a.price - b.price;
        if (sort === "Price: high to low") return b.price - a.price;
        return 0;
      });
  }, [products, category, query, sort]);

  const orderedCategoryNames = useMemo(() => {
    const names = categories.map((c) => c.name);
    if (category === "All") return names;
    const start = names.indexOf(category);
    if (start === -1) return names;
    return [...names.slice(start), ...names.slice(0, start)];
  }, [category]);

  const visibleCategoryNames = orderedCategoryNames.filter((name) =>
    filtered.some((p) => p.category === name)
  );

  return (
    <main id="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-art" aria-hidden="true"></div>
        <div className="hero-shade"></div>
        <div className="hero-content">
          <span className="eyebrow">
            <Sparkles size={15} /> LITTLE MOMENTS, BIG SMILES
          </span>
          <h1>
            Gifts that make
            <br />
            <span>hearts happy.</span>
          </h1>
          <p className="hero-lead">
            Toys · Gifts · Cute Lamps · More Happiness
          </p>
          <div className="hero-buttons">
            <Link className="primary-btn" to="/products">
              Shop the collection <ArrowUpRight size={18} />
            </Link>
            <Link className="secondary-btn" to="/products?category=Gift Sets">
              Find a gift <Gift size={17} />
            </Link>
          </div>
          <div className="trust-row">
            <div>
              <b>10K+</b>
              <span>Happy orders</span>
            </div>
            <div>
              <b>
                4.9 <Star size={16} fill="currentColor" />
              </b>
              <span>Customer rating</span>
            </div>
            <div>
              <b>100%</b>
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
        <div className="hero-note">
          <span>🎁</span>
          <div>
            <b>A little joy, wrapped up</b>
            <small>Gifts for every kind of smile</small>
          </div>
        </div>
        <a href="#categories" className="scroll-cue">
          SCROLL TO EXPLORE <ArrowRight size={14} />
        </a>
      </section>

      {/* Shop by Category Section */}
      <section className="category-section section-wrap" id="categories">
        <div className="section-heading editorial-header">
          <div>
            <span className="section-kicker">FIND YOUR HAPPY</span>
            <h2 className="editorial-title">
              <span className="editorial-script">shop by</span>{" "}
              <span className="editorial-bold">CATEGORY</span>
            </h2>
            <p>A little something for every kind of smile.</p>
          </div>
          <Link to="/categories" className="primary-btn" style={{ padding: "10px 18px", fontSize: "12px" }}>
            View all categories <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id || cat.name}
              title={cat.name}
              subtitle={cat.subtitle}
              image={cat.image}
              emoji={cat.emoji}
              isActive={category === cat.name}
              variant="editorial"
              align="left"
              onClick={() => {
                navigate(`/category/${encodeURIComponent(cat.name)}`);
              }}
            />
          ))}
        </div>
      </section>

      {/* Crowd Favourites Product Showcase */}
      <section className="products-section section-wrap" id="products">
        <div className="section-heading">
          <div>
            <span className="section-kicker">THE CROWD FAVOURITES</span>
            <h2>{category === "All" ? "Little things. Big joy." : category}</h2>
            <p>
              Thoughtfully picked, joyfully gifted. Keep scrolling to discover
              more.
            </p>
          </div>

          <div className="product-controls">
            <div className="search-inline">
              <Search size={17} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find your favourite..."
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
            >
              <option>Featured</option>
              <option>Price: low to high</option>
              <option>Price: high to low</option>
            </select>
          </div>
        </div>

        {category !== "All" && (
          <button className="clear-filter" onClick={() => setCategory("All")}>
            Show all categories <X size={14} />
          </button>
        )}

        {visibleCategoryNames.map((categoryName, index) => {
          const categoryProducts = filtered.filter(
            (p) => p.category === categoryName
          );

          return (
            <div
              className="category-product-block"
              key={categoryName}
              id={`category-${categoryName.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="category-products-heading">
                <div>
                  <span className="section-kicker">
                    {categories.find((c) => c.name === categoryName)?.emoji}{" "}
                    EXPLORE THE COLLECTION
                  </span>

                  <h2>{categoryName}</h2>

                  <p>
                    {categoryProducts.length}{" "}
                    {categoryProducts.length === 1
                      ? "lovely find"
                      : "lovely finds"}{" "}
                    to discover
                  </p>
                </div>
                <Link
                  to={`/category/${encodeURIComponent(categoryName)}`}
                  className="editorial-pill-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "var(--pink)",
                  }}
                >
                  View category page <ArrowUpRight size={14} />
                </Link>
              </div>

              <div className="product-grid">
                {categoryProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
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
          <p className="empty">No treasures found. Try another search.</p>
        )}
      </section>

      {/* Gift Banner */}
      <section className="gift-banner section-wrap" id="giftsets">
        <div className="gift-banner-copy">
          <span className="section-kicker">MADE TO MAKE SOMEONE SMILE</span>
          <h2>
            Good things come
            <br />
            in <em>gift boxes.</em>
          </h2>
          <p>
            Little surprises, big feelings. Find a thoughtful gift for their
            next special moment.
          </p>
          <Link className="primary-btn" to="/products?category=Gift Sets">
            Explore gift sets <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="gift-banner-art">
          <img
            src={ASSET_PATH + "hero-toys-banner.png"}
            alt="Colourful gifts and cute toys"
          />
        </div>
        <span className="banner-sparkle s1">✳</span>
        <span className="banner-sparkle s2">✦</span>
      </section>

      {/* Promise Strip */}
      <section className="promise-strip section-wrap">
        <div>
          <Truck />
          <b>Careful delivery</b>
          <span>2–3 working days</span>
        </div>
        <div>
          <Gift />
          <b>Gift-ready joy</b>
          <span>Made for moments</span>
        </div>
        <div>
          <ShieldCheck />
          <b>Shop with ease</b>
          <span>Secure checkout</span>
        </div>
        <div>
          <Heart />
          <b>Picked with love</b>
          <span>For every kind of smile</span>
        </div>
      </section>
    </main>
  );
}
