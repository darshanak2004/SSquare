import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import CategoryCard from "../components/CategoryCard.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { categories } from "../data/categories.js";
import { getAllProducts } from "../data/products.js";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const allProducts = getAllProducts();

  // If no categoryName param, render the all categories overview
  if (!categoryName) {
    return (
      <div className="section-wrap" style={{ paddingTop: "24px", minHeight: "75vh" }}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span>Categories</span>
        </nav>

        <div className="section-heading editorial-header" style={{ marginTop: "16px", marginBottom: "28px" }}>
          <div>
            <span className="section-kicker">EXPLORE ALL COLLECTIONS</span>
            <h1 className="editorial-title" style={{ fontSize: "clamp(36px, 5vw, 48px)" }}>
              <span className="editorial-script">browse by</span>{" "}
              <span className="editorial-bold">CATEGORY</span>
            </h1>
            <p>Hand-picked gifts and accessories designed to bring endless smiles.</p>
          </div>
        </div>

        <div className="category-grid">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id || cat.name}
              title={cat.name}
              subtitle={cat.subtitle}
              image={cat.image}
              emoji={cat.emoji}
              variant="editorial"
              align="left"
              onClick={() => {
                navigate(`/category/${encodeURIComponent(cat.name)}`);
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Find category metadata
  const currentCategory = categories.find(
    (c) => c.name.toLowerCase() === decodeURIComponent(categoryName).toLowerCase()
  );

  const matchedName = currentCategory ? currentCategory.name : decodeURIComponent(categoryName);

  // Filter products for this category
  const categoryProducts = allProducts.filter(
    (p) => p.category.toLowerCase() === matchedName.toLowerCase()
  );

  const otherCategories = categories.filter(
    (c) => c.name.toLowerCase() !== matchedName.toLowerCase()
  );

  return (
    <div className="section-wrap" style={{ paddingTop: "24px", minHeight: "75vh" }}>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/categories">Categories</Link>
        <ChevronRight size={14} />
        <span>{matchedName}</span>
      </nav>

      {/* Category Hero Header */}
      <div className="category-detail-banner" style={{ marginTop: "20px" }}>
        <div className="category-detail-content">
          <span className="section-kicker">
            {currentCategory?.emoji} COLLECTION
          </span>
          <h1>{matchedName}</h1>
          <p>
            {currentCategory?.subtitle || "Thoughtfully curated gifts and treasures."}{" "}
            Discover {categoryProducts.length}{" "}
            {categoryProducts.length === 1 ? "delightful item" : "delightful items"} ready to ship.
          </p>
          <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
            <Link to="/categories" className="secondary-btn" style={{ fontSize: "12px", padding: "10px 16px" }}>
              <ArrowLeft size={14} /> All Categories
            </Link>
            <Link to="/products" className="primary-btn" style={{ fontSize: "12px", padding: "10px 16px" }}>
              View All Store Gifts <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {currentCategory?.image && (
          <div className="category-detail-image">
            <img src={currentCategory.image} alt={matchedName} />
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div style={{ marginTop: "36px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "18px", color: "var(--ink)", fontFamily: "Nunito, sans-serif" }}>
          Products in {matchedName}
        </h2>

        {categoryProducts.length > 0 ? (
          <div className="product-grid">
            {categoryProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty-catalog-state">
            <span>🎁</span>
            <h3>No products currently in {matchedName}</h3>
            <p>New arrivals are on their way! Feel free to explore other categories below.</p>
            <Link to="/products" className="primary-btn" style={{ marginTop: "12px" }}>
              Explore All Products
            </Link>
          </div>
        )}
      </div>

      {/* Other Categories to explore */}
      <div style={{ marginTop: "50px", borderTop: "1px solid var(--line)", paddingTop: "32px" }}>
        <div className="section-heading">
          <div>
            <span className="section-kicker">MORE TO LOVE</span>
            <h2>Explore Other Categories</h2>
          </div>
          <Link to="/categories" className="primary-btn" style={{ padding: "8px 16px", fontSize: "12px" }}>
            See All <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="category-grid" style={{ marginTop: "18px" }}>
          {otherCategories.slice(0, 4).map((cat) => (
            <CategoryCard
              key={cat.id || cat.name}
              title={cat.name}
              subtitle={cat.subtitle}
              image={cat.image}
              emoji={cat.emoji}
              variant="editorial"
              align="left"
              onClick={() => {
                navigate(`/category/${encodeURIComponent(cat.name)}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
