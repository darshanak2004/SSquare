import React from "react";
import { useShop } from "../context/ShopContext";

export default function Toast() {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      <span>✓</span>
      {toast}
    </div>
  );
}
