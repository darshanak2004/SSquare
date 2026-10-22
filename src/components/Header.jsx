import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useShop } from "../context/ShopContext";

const ASSET_PATH = "/assets/";

export default function Header() {
  const { cartCount, setCartOpen, searchQuery, setSearchQuery } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/products");
    }
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <div className="announcement">
        <span>✨ Buy 5 or more to get free delivery</span>
        <i /> <span>Tamil Nadu delivery ₹40</span>
        <i />
        <span>Fast delivery in 2–3 working days</span>
      </div>

      <header className="header">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand-mark">
            <img src={ASSET_PATH + "logo-panda.jpeg"} alt="S Square Elite Logo" />
          </span>
          <span>
            <b>S SQUARE</b>
            <em>Elite</em>
            <small>G I F T&nbsp; S H O P</small>
          </span>
        </Link>

        <nav className={mobileMenuOpen ? "nav open" : "nav"}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Categories
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            All Products
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Bag ({cartCount})
          </NavLink>
        </nav>

        <div className="header-actions">
          <form className="search-pill" onSubmit={handleSearchSubmit}>
            <Search size={17} />
            <input
              aria-label="Search products"
              placeholder="Search gifts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
            aria-label="Open bag"
          >
            <ShoppingCart size={18} />
            <span>Bag</span>
            <b>{cartCount}</b>
          </button>

          <button
            className="mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
    </>
  );
}
