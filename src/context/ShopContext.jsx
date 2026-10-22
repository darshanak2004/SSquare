import React, { createContext, useContext, useState, useEffect } from "react";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("ssquare_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [likes, setLikes] = useState(() => {
    try {
      const saved = localStorage.getItem("ssquare_likes");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("ssquare_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("ssquare_likes", JSON.stringify(likes));
    } catch (e) {
      console.error(e);
    }
  }, [likes]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast("");
    }, 2400);
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, qty: quantity }];
    });
    showToast(`${product.name} added to your bag`);
  };

  const updateQty = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleLike = (product) => {
    setLikes((prevLikes) => {
      const isLiked = prevLikes.includes(product.id);
      if (isLiked) {
        showToast(`Removed from saved items`);
        return prevLikes.filter((id) => id !== product.id);
      } else {
        showToast(`Saved ${product.name} to wishlist`);
        return [...prevLikes, product.id];
      }
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        cartOpen,
        setCartOpen,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        likes,
        toggleLike,
        toast,
        showToast,
        selectedProduct,
        setSelectedProduct,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
