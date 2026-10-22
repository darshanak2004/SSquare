import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Plus, Minus, ArrowRight } from "lucide-react";
import { useShop } from "../context/ShopContext";

const ASSET_PATH = "/assets/";

export default function CartDrawer() {
  const { cart, cartCount, cartTotal, cartOpen, setCartOpen, updateQty } =
    useShop();
  const navigate = useNavigate();

  if (!cartOpen) return null;

  return (
    <div className="overlay" onClick={() => setCartOpen(false)}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <div>
            <span className="section-kicker">YOUR LITTLE TREASURES</span>
            <h2>
              Your bag <span>({cartCount})</span>
            </h2>
          </div>
          <button
            className="close-btn"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <span>🛍️</span>
            <h3>Your bag is waiting for joy.</h3>
            <p>Find a little something to make someone smile.</p>
            <button
              className="primary-btn"
              onClick={() => {
                setCartOpen(false);
                navigate("/products");
              }}
            >
              Explore gifts <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div
                    className="cart-thumb"
                    onClick={() => {
                      setCartOpen(false);
                      navigate(`/product/${item.id}`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {item.img ? (
                      <img src={ASSET_PATH + item.img} alt={item.name} />
                    ) : (
                      <span>{item.emoji}</span>
                    )}
                  </div>
                  <div className="cart-item-info">
                    <b
                      onClick={() => {
                        setCartOpen(false);
                        navigate(`/product/${item.id}`);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {item.name}
                    </b>
                    <span>₹{item.price.toLocaleString("en-IN")}</span>
                    <div className="qty">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                  <b>₹{(item.price * item.qty).toLocaleString("en-IN")}</b>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <span>Subtotal</span>
                <b>₹{cartTotal.toLocaleString("en-IN")}</b>
              </div>
              <small>
                {cartCount >= 5
                  ? "🎉 You qualify for FREE Delivery!"
                  : "Free delivery when you buy 5 or more items."}
              </small>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
                <button
                  className="primary-btn checkout"
                  onClick={() => {
                    setCartOpen(false);
                    navigate("/cart");
                  }}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  View Bag & Checkout <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
