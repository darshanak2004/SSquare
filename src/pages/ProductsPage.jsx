import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, X, SlidersHorizontal, Heart, ChevronRight } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import { getAllProducts } from "../data/products.js";
import { categories } from "../data/categories.js";
import { useShop } from "../context/ShopContext.jsx";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { likes } = useShop();
  const allProducts = getAllProducts();

  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";
  const initialFilter = searchParams.get("filter") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [filterMode, setFilterMode] = useState(initialFilter); // "liked" or ""
  const [sortOption, setSortOption] = useState("Featured");

  // Keep state synced with URL search params if user navigated from header/menu
  useEffect(() => {
    const cat = searchParams.get("category") || "All";
    const s = searchParams.get("search") || "";
    const f = searchParams.get("filter") || "";
    setSelectedCategory(cat);
    setSearchQuery(s);
    setFilterMode(f);
  }, [searchParams]);

  // Update query params when category or search changes
  const updateCategory = (cat) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", cat);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setFilterMode("");
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        const matchesCategory =
          selectedCategory === "All" ||
          p.category.toLowerCase() === selectedCategory.toLowerCase();

        const matchesQuery =
          !searchQuery ||
          (p.name + " " + p.category + " " + (p.desc || ""))
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        const matchesLiked =
          filterMode !== "liked" || likes.includes(p.id);

        return matchesCategory && matchesQuery && matchesLiked;
      })
      .sort((a, b) => {
        if (sortOption === "Price: low to high") return a.price - b.price;
        if (sortOption === "Price: high to low") return b.price - a.price;
        return 0;
      });
  }, [allProducts, selectedCategory, searchQuery, filterMode, sortOption, likes]);

  return (
    <div className="section-wrap" style={{ paddingTop: "24px", minHeight: "75vh" }}>
      {/* Breadcrumbs */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <span>All Products</span>
        {selectedCategory !== "All" && (
          <>
            <ChevronRight size={14} />
            <span>{selectedCategory}</span>
          </>
        )}
      </nav>

      {/* Page Header */}
      <div className="section-heading" style={{ marginTop: "16px", marginBottom: "24px" }}>
        <div>
          <span className="section-kicker">CURATED COLLECTION</span>
          <h2>
            {filterMode === "liked"
              ? "Your Saved Favourites"
              : selectedCategory === "All"
              ? "All Little Treasures"
              : selectedCategory}
          </h2>
          <p>
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"} available to
            brighten someone's day.
          </p>
        </div>

        <div className="product-controls">
          <div className="search-inline">
            <Search size={17} />
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                const newParams = new URLSearchParams(searchParams);
                if (e.target.value.trim()) {
                  newParams.set("search", e.target.value.trim());
                } else {
                  newParams.delete("search");
                }
                setSearchParams(newParams);
              }}
              placeholder="Search in products..."
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete("search");
                  setSearchParams(newParams);
                }}
                style={{ border: 0, background: "transparent", cursor: "pointer", color: "var(--muted)" }}
              >
                <X size={15} />
              </button>
            )}
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            aria-label="Sort products"
          >
            <option>Featured</option>
            <option>Price: low to high</option>
            <option>Price: high to low</option>
          </select>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="category-pill-filter">
        <button
          className={`filter-pill ${selectedCategory === "All" && filterMode !== "liked" ? "active" : ""}`}
          onClick={() => {
            setFilterMode("");
            updateCategory("All");
          }}
        >
          All
        </button>

        <button
          className={`filter-pill ${filterMode === "liked" ? "active" : ""}`}
          onClick={() => {
            const nextMode = filterMode === "liked" ? "" : "liked";
            setFilterMode(nextMode);
            const newParams = new URLSearchParams(searchParams);
            if (nextMode) newParams.set("filter", nextMode);
            else newParams.delete("filter");
            setSearchParams(newParams);
          }}
        >
          <Heart size={14} fill={filterMode === "liked" ? "currentColor" : "none"} />
          Saved ({likes.length})
        </button>

        {categories.map((c) => (
          <button
            key={c.id || c.name}
            className={`filter-pill ${selectedCategory === c.name && filterMode !== "liked" ? "active" : ""}`}
            onClick={() => {
              setFilterMode("");
              updateCategory(c.name);
            }}
          >
            <span>{c.emoji}</span>
            <span>{c.name}</span>
          </button>
        ))}
      </div>

      {/* Active Filters Bar if any */}
      {(selectedCategory !== "All" || searchQuery || filterMode) && (
        <div className="active-filters-bar">
          <span>Active filters:</span>
          {selectedCategory !== "All" && (
            <span className="active-chip">
              Category: {selectedCategory}
              <button onClick={() => updateCategory("All")} aria-label="Remove category filter">
                <X size={12} />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="active-chip">
              Search: "{searchQuery}"
              <button
                onClick={() => {
                  setSearchQuery("");
                  const p = new URLSearchParams(searchParams);
                  p.delete("search");
                  setSearchParams(p);
                }}
                aria-label="Remove search filter"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {filterMode === "liked" && (
            <span className="active-chip">
              Only Saved
              <button
                onClick={() => {
                  setFilterMode("");
                  const p = new URLSearchParams(searchParams);
                  p.delete("filter");
                  setSearchParams(p);
                }}
                aria-label="Remove liked filter"
              >
                <X size={12} />
              </button>
            </span>
          )}
          <button className="clear-all-btn" onClick={clearAllFilters}>
            Clear all
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="product-grid" style={{ marginTop: "24px" }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-catalog-state">
          <span>🔍</span>
          <h3>No products match your criteria</h3>
          <p>Try resetting the search filters or choosing a different category.</p>
          <button className="primary-btn" onClick={clearAllFilters} style={{ marginTop: "14px" }}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
