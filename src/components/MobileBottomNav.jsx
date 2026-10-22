import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Gift, Search, ShoppingCart, Heart } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function MobileBottomNav() {
  const { cartCount, likes, setCartOpen } = useShop();
  const navigate = useNavigate();

  return (
    <div className="mobile-bottom">
      <Link to="/categories">
        <Gift size={18} />
        <span>Categories</span>
      </Link>
      <Link to="/products">
        <Search size={18} />
        <span>Explore</span>
      </Link>
      <button onClick={() => setCartOpen(true)}>
        <ShoppingCart size={19} />
        <span>Bag ({cartCount})</span>
      </button>
      <button onClick={() => navigate("/products?filter=liked")}>
        <Heart size={18} />
        <span>Liked ({likes.length})</span>
      </button>
    </div>
  );
}
