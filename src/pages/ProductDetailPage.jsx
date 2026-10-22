import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronRight,
  Heart,
  ShoppingCart,
  Truck,
  Gift,
  ShieldCheck,
  Star,
  Plus,
  Minus,
  Check,
  ArrowLeft,
} from "lucide-react";
import { getProductById, getAllProducts } from "../data/products.js";
import { useShop } from "../context/ShopContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

const ASSET_PATH = "/assets/";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, likes, toggleLike } = useShop();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id);
  const allProducts = getAllProducts();

  if (!product) {
    return (
      <div className="section-wrap" style={{ paddingTop: "60px", minHeight: "60vh", textAlign: "center" }}>
        <span style={{ fontSize: "64px" }}>🎁</span>
        <h2 style={{ fontSize: "28px", marginTop: "16px" }}>Product Not Found</h2>
        <p style={{ color: "var(--muted)", maxWidth: "400px", margin: "8px auto 24px" }}>
          The item you are looking for may have been moved or is no longer available.
        </p>
        <Link to="/products" className="primary-btn">
          <ArrowLeft size={16} /> Browse All Products
        </Link>
      </div>
    );
  }

  const isLiked = likes.includes(product.id);
  const discountPercent = product.old
    ? Math.round(((product.old - product.price) / product.old) * 100)
    : null;

  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.category === "Art & Craft" || p.category === "Gift Sets")
    )
    .slice(0, 4);

  return (
    <div className="section-wrap" style={{ paddingTop: "24px", minHeight: "80vh" }}>
      {/* Breadcrumbs */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/products">Products</Link>
        <ChevronRight size={14} />
        <Link to={`/category/${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
        <ChevronRight size={14} />
        <span>{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="pdp-layout" style={{ marginTop: "24px" }}>
        {/* Media / Visual Box */}
        <div className="pdp-visual-box">
          {product.tag && <span className="pdp-tag">{product.tag}</span>}
          {product.img ? (
            <img
              src={ASSET_PATH + product.img}
              alt={product.name}
              className="pdp-image"
            />
          ) : (
            <span className="pdp-emoji">{product.emoji}</span>
          )}
        </div>

        {/* Product Info Box */}
        <div className="pdp-info-box">
          <div className="pdp-kicker-row">
            <span className="section-kicker">A LITTLE SOMETHING SPECIAL</span>
            <span className="pdp-category-badge">{product.category}</span>
          </div>

          <h1 className="pdp-title">{product.name}</h1>

          <div className="pdp-rating-row">
            <div className="rating">
              <span>★★★★★</span>
              <small>4.9 (120+ happy smiles)</small>
            </div>
            <span className="pdp-stock-status">
              <Check size={14} color="#27ae60" /> In stock & ready to ship
            </span>
          </div>

          <div className="pdp-price-row">
            <b className="pdp-price">₹{product.price.toLocaleString("en-IN")}</b>
            {product.old && (
              <>
                <del className="pdp-old-price">₹{product.old.toLocaleString("en-IN")}</del>
                {discountPercent && (
                  <span className="pdp-discount-pill">Save {discountPercent}%</span>
                )}
              </>
            )}
          </div>

          <p className="pdp-description">{product.desc}</p>

          {/* Perks list */}
          <div className="pdp-perks">
            <div className="pdp-perk-item">
              <Truck size={17} color="var(--pink)" />
              <div>
                <b>Fast Delivery in 2–3 Days</b>
                <small>Tamil Nadu delivery ₹40 • Free for 5+ items</small>
              </div>
            </div>
            <div className="pdp-perk-item">
              <Gift size={17} color="var(--purple)" />
              <div>
                <b>Gift-Ready Packaging</b>
                <small>Packed with love, ribbons, and sweet care</small>
              </div>
            </div>
            <div className="pdp-perk-item">
              <ShieldCheck size={17} color="#27ae60" />
              <div>
                <b>Quality Guaranteed</b>
                <small>Secure checkout & verified smile guarantee</small>
              </div>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="pdp-actions-area">
            <div className="pdp-qty-stepper">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={15} />
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={15} />
              </button>
            </div>

            <button
              className="primary-btn pdp-add-cart-btn"
              onClick={() => addToCart(product, quantity)}
            >
              <ShoppingCart size={18} /> Add {quantity > 1 ? `${quantity} items ` : ""}to Bag
            </button>

            <button
              className={`favourite-btn pdp-like-btn ${isLiked ? "liked" : ""}`}
              onClick={() => toggleLike(product)}
              aria-label={isLiked ? "Saved" : "Save for later"}
            >
              <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
              <span>{isLiked ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div style={{ marginTop: "60px", borderTop: "1px solid var(--line)", paddingTop: "36px" }}>
          <div className="section-heading">
            <div>
              <span className="section-kicker">MORE DELIGHTFUL PICKS</span>
              <h2>You Might Love These Too</h2>
              <p>Thoughtfully matched to complement this item.</p>
            </div>
          </div>

          <div className="product-grid" style={{ marginTop: "20px" }}>
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
