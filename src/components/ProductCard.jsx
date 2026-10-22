import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Plus, ArrowUpRight } from "lucide-react";
import { useShop } from "../context/ShopContext";

const ASSET_PATH = "/assets/";

export default function ProductCard({ product }) {
  const { likes, toggleLike, addToCart, setSelectedProduct } = useShop();
  const navigate = useNavigate();

  const isLiked = likes.includes(product.id);

  return (
    <article className="product-card">
      <button
        className={`like ${isLiked ? "liked" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleLike(product);
        }}
        aria-label={isLiked ? "Remove from favourites" : "Add to favourites"}
      >
        <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
      </button>

      <div
        className="product-visual"
        onClick={() => navigate(`/product/${product.id}`)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            navigate(`/product/${product.id}`);
          }
        }}
        style={{ cursor: "pointer" }}
      >
        {product.tag && <span className="tag">{product.tag}</span>}
        {product.img ? (
          <img src={ASSET_PATH + product.img} alt={product.name} loading="lazy" />
        ) : (
          <span className="emoji-product">{product.emoji}</span>
        )}
        <button
          type="button"
          className="quick-view"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(product);
          }}
          aria-label="Quick view"
        >
          Quick view <ArrowUpRight size={15} />
        </button>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <div className="rating">
          <span>★★★★★</span>
          <small>(4.9)</small>
        </div>
        <div className="product-bottom">
          <div>
            <b>₹{product.price.toLocaleString("en-IN")}</b>
            {product.old && <del>₹{product.old.toLocaleString("en-IN")}</del>}
          </div>
          <button
            className="add-btn"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            aria-label={`Add ${product.name} to bag`}
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
