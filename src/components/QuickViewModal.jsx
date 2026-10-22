import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, X, ExternalLink } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { getAllProducts } from "../data/products";

const ASSET_PATH = "/assets/";

export default function QuickViewModal() {
  const { selectedProduct, setSelectedProduct, addToCart, likes, toggleLike } =
    useShop();

  if (!selectedProduct) return null;

  const products = getAllProducts();
  const isLiked = likes.includes(selectedProduct.id);

  const related = products
    .filter(
      (p) =>
        p.id !== selectedProduct.id &&
        (p.category === selectedProduct.category || p.category === "Art & Craft" || p.category === "Gifts")
    )
    .slice(0, 3);

  return (
    <div
      className="overlay modal-overlay"
      onClick={() => setSelectedProduct(null)}
    >
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-btn modal-close"
          onClick={() => setSelectedProduct(null)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="modal-image">
          {selectedProduct.img ? (
            <img
              src={ASSET_PATH + selectedProduct.img}
              alt={selectedProduct.name}
            />
          ) : (
            <span>{selectedProduct.emoji}</span>
          )}
        </div>

        <div className="modal-info">
          <span className="section-kicker">A LITTLE SOMETHING SPECIAL</span>
          <h2>{selectedProduct.name}</h2>

          <div className="rating">
            <span>★★★★★</span>
            <small>4.9 customer rating</small>
          </div>

          <p>{selectedProduct.desc}</p>

          <div className="modal-price">
            <b>₹{selectedProduct.price.toLocaleString("en-IN")}</b>
            {selectedProduct.old && (
              <del>₹{selectedProduct.old.toLocaleString("en-IN")}</del>
            )}
          </div>

          <div className="modal-actions">
            <button
              className="primary-btn"
              onClick={() => {
                addToCart(selectedProduct);
                setSelectedProduct(null);
              }}
            >
              <ShoppingCart size={17} /> Add to bag
            </button>
            <button
              className={`favourite-btn ${isLiked ? "liked" : ""}`}
              onClick={() => toggleLike(selectedProduct)}
            >
              <Heart fill={isLiked ? "currentColor" : "none"} size={17} />
              {isLiked ? "Saved" : "Save for later"}
            </button>
          </div>

          <div style={{ marginTop: "14px" }}>
            <Link
              to={`/product/${selectedProduct.id}`}
              className="view-full-details-link"
              onClick={() => setSelectedProduct(null)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--pink)",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              View full product details <ExternalLink size={14} />
            </Link>
          </div>

          {related.length > 0 && (
            <div className="related">
              <b>You might love these too</b>
              <div>
                {related.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    title={p.name}
                  >
                    <span>{p.emoji}</span>
                    <small>{p.name}</small>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
