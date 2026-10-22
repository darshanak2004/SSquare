import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { useShop } from "../context/ShopContext.jsx";

const ASSET_PATH = "/assets/";

export default function CartPage() {
  const { cart, cartCount, cartTotal, updateQty, removeFromCart, clearCart, showToast } =
    useShop();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Delivery is free if 5 or more items
  const isFreeDelivery = cartCount >= 5;
  const shippingFee = cartCount > 0 ? (isFreeDelivery ? 0 : 40) : 0;
  const finalTotal = Math.max(0, cartTotal + shippingFee - discount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    if (promoCode.trim().toUpperCase() === "SQUARE10") {
      const disc = Math.round(cartTotal * 0.1);
      setDiscount(disc);
      setPromoApplied(true);
      showToast("Coupon applied! 10% discount added.");
    } else if (promoCode.trim().toUpperCase() === "JOY50") {
      setDiscount(50);
      setPromoApplied(true);
      showToast("Coupon applied! ₹50 off.");
    } else {
      showToast("Invalid promo code. Try 'SQUARE10' or 'JOY50'.");
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      showToast("Please fill in your delivery details to proceed.");
      return;
    }
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="section-wrap" style={{ paddingTop: "60px", minHeight: "65vh", textAlign: "center" }}>
        <div style={{ fontSize: "64px" }}>🎉</div>
        <h1 style={{ fontSize: "32px", marginTop: "16px", color: "var(--ink)", fontFamily: "Nunito, sans-serif" }}>
          Thank you for your order, {customerName}!
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: "480px", margin: "10px auto 24px", lineHeight: "1.6" }}>
          Your little treasures have been reserved. We will contact you at{" "}
          <b>{customerPhone}</b> for delivery confirmation to <b>{customerAddress}</b>.
        </p>
        <Link to="/products" className="primary-btn" onClick={() => setOrderPlaced(false)}>
          Continue Shopping <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="section-wrap" style={{ paddingTop: "50px", minHeight: "65vh" }}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span>Bag & Checkout</span>
        </nav>

        <div className="empty-cart-page" style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: "60px", marginBottom: "16px" }}>🛍️</div>
          <h2 style={{ fontSize: "28px", fontFamily: "Nunito, sans-serif" }}>
            Your bag is waiting for joy
          </h2>
          <p style={{ color: "var(--muted)", maxWidth: "420px", margin: "10px auto 24px" }}>
            Looks like you haven't added any gifts yet. Explore our lovely collection and find
            something special.
          </p>
          <Link to="/products" className="primary-btn">
            Explore All Gifts <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-wrap" style={{ paddingTop: "24px", minHeight: "80vh" }}>
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/products">Products</Link>
        <ChevronRight size={14} />
        <span>Shopping Bag ({cartCount})</span>
      </nav>

      <div className="section-heading" style={{ marginTop: "16px", marginBottom: "24px" }}>
        <div>
          <span className="section-kicker">READY TO SHIP</span>
          <h1>Your Shopping Bag</h1>
        </div>
        <button
          onClick={clearCart}
          className="clear-filter"
          style={{ padding: "8px 14px", fontSize: "12px", border: "1px solid var(--line)" }}
        >
          <Trash2 size={13} /> Clear Bag
        </button>
      </div>

      {/* Free delivery notice bar */}
      <div
        className="cart-delivery-banner"
        style={{
          background: isFreeDelivery ? "#e8f8f0" : "#fff3f7",
          border: `1px solid ${isFreeDelivery ? "#b2ecc9" : "#ffccd9"}`,
          borderRadius: "16px",
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "24px",
          fontSize: "13px",
          fontWeight: 700,
          color: isFreeDelivery ? "#1e7e45" : "var(--pink)",
        }}
      >
        <Truck size={18} />
        <span>
          {isFreeDelivery
            ? "🎉 Congratulations! You unlocked FREE Delivery across Tamil Nadu."
            : `Add ${5 - cartCount} more ${5 - cartCount === 1 ? "item" : "items"} to get FREE Delivery! (Standard: ₹40)`}
        </span>
      </div>

      <div className="cart-page-grid">
        {/* Left Column: Cart Items List */}
        <div className="cart-items-column">
          <div className="cart-items-list-card">
            {cart.map((item) => (
              <div className="cart-page-item" key={item.id}>
                <Link to={`/product/${item.id}`} className="cart-page-thumb">
                  {item.img ? (
                    <img src={ASSET_PATH + item.img} alt={item.name} />
                  ) : (
                    <span>{item.emoji}</span>
                  )}
                </Link>

                <div className="cart-page-details">
                  <span className="cart-page-cat">{item.category}</span>
                  <Link to={`/product/${item.id}`} className="cart-page-title">
                    {item.name}
                  </Link>
                  <div className="cart-page-unit-price">
                    ₹{item.price.toLocaleString("en-IN")} each
                  </div>
                </div>

                <div className="cart-page-qty-stepper">
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

                <div className="cart-page-item-total">
                  <b>₹{(item.price * item.qty).toLocaleString("en-IN")}</b>
                </div>

                <button
                  className="cart-page-remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "16px" }}>
            <Link
              to="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--pink)",
              }}
            >
              <ArrowLeft size={15} /> Continue shopping for more gifts
            </Link>
          </div>
        </div>

        {/* Right Column: Checkout & Summary */}
        <div className="cart-summary-column">
          <div className="cart-summary-card">
            <h3 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--ink)", fontFamily: "Nunito, sans-serif" }}>
              Order Summary
            </h3>

            <div className="summary-line">
              <span>Items Total ({cartCount})</span>
              <b>₹{cartTotal.toLocaleString("en-IN")}</b>
            </div>

            <div className="summary-line">
              <span>Delivery Fee</span>
              <b>{shippingFee === 0 ? <span style={{ color: "#27ae60" }}>FREE</span> : `₹${shippingFee}`}</b>
            </div>

            {discount > 0 && (
              <div className="summary-line discount">
                <span>Coupon Discount</span>
                <b>-₹{discount.toLocaleString("en-IN")}</b>
              </div>
            )}

            <div className="summary-total-line">
              <span>Total Amount</span>
              <b>₹{finalTotal.toLocaleString("en-IN")}</b>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="promo-form" style={{ marginTop: "18px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <div className="search-inline" style={{ flex: 1, padding: "8px 12px" }}>
                  <Tag size={15} />
                  <input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon code (e.g. SQUARE10)"
                    style={{ fontSize: "12px", width: "100%" }}
                  />
                </div>
                <button
                  type="submit"
                  className="secondary-btn"
                  style={{ padding: "8px 14px", fontSize: "12px", borderRadius: "20px" }}
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <small style={{ color: "#27ae60", fontWeight: 700, marginTop: "4px", display: "block" }}>
                  ✓ Promo code applied successfully
                </small>
              )}
            </form>

            {/* Delivery Details Form */}
            <form onSubmit={handleCheckout} style={{ marginTop: "22px", borderTop: "1px solid var(--line)", paddingTop: "18px" }}>
              <h4 style={{ fontSize: "14px", marginBottom: "12px", fontWeight: 800 }}>
                Delivery Details
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="cart-input"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number (e.g. 9876543210) *"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="cart-input"
                />
                <textarea
                  required
                  rows={2}
                  placeholder="Delivery Address (Street, City, Pincode) *"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="cart-input"
                  style={{ resize: "none" }}
                />

                <button
                  type="submit"
                  className="primary-btn checkout"
                  style={{ width: "100%", justifyContent: "center", marginTop: "8px" }}
                >
                  Place Order (₹{finalTotal.toLocaleString("en-IN")}) <ArrowRight size={17} />
                </button>
              </div>
            </form>

            <div className="cart-guarantee-strip" style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", color: "var(--muted)", fontSize: "11px", fontWeight: 700 }}>
              <span>🔒 100% Secure Checkout</span>
              <span>⚡ Dispatched in 24h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
