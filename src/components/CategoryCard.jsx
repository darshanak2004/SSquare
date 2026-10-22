import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Card from "./Card.jsx";

/**
 * Reusable CategoryCard Component
 * Inspired by modern editorial e-commerce design (clean rounded image canvas,
 * uppercase bold typography, and subtle micro-interactions).
 *
 * @param {Object} props
 * @param {string} props.title - Category name/title (e.g. "Toys")
 * @param {string} [props.subtitle] - Supporting tag line (e.g. "Playful picks")
 * @param {string} [props.image] - Image source path (e.g. "/images/toys.jpg")
 * @param {string} [props.alt] - Accessible alt text for the image
 * @param {string} [props.emoji] - Fallback emoji or icon string
 * @param {React.ReactNode} [props.icon] - Custom icon component (optional)
 * @param {string} [props.badge] - Badge label (e.g. "Popular", "New")
 * @param {boolean} [props.isActive] - Active / selected state
 * @param {() => void} [props.onClick] - Click handler
 * @param {string} [props.href] - Optional link href
 * @param {boolean} [props.showArrow] - Whether to show the hover arrow indicator
 * @param {"editorial" | "boxed" | "minimal"} [props.variant="editorial"] - Card visual variant
 * @param {"left" | "center"} [props.align="left"] - Text alignment
 * @param {string} [props.className] - Additional custom CSS classes
 * @param {React.ReactNode} [props.children] - Additional slot content
 */
export default function CategoryCard({
  title,
  subtitle,
  image,
  alt,
  emoji,
  icon,
  badge,
  isActive = false,
  onClick,
  href,
  showArrow = false,
  variant = "editorial",
  align = "left",
  className = "",
  children,
  ...restProps
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasImage = Boolean(image) && !imageError;
  const imageAlt = alt || `${title} category`;

  return (
    <Card
      as={href ? "a" : "button"}
      href={href}
      onClick={onClick}
      active={isActive}
      hoverable={true}
      className={`category-card category-card--${variant} category-card--align-${align} ${
        isActive ? "active" : ""
      } ${className}`}
      aria-label={`${title} - ${subtitle || ""}`}
      aria-pressed={!href ? isActive : undefined}
      {...restProps}
    >
      {/* Visual Canvas: Soft neutral rounded image frame */}
      <div className="category-card-visual" aria-hidden="true">
        {badge && <span className="category-card-badge">{badge}</span>}

        {hasImage ? (
          <div
            className={`category-image-wrap ${
              imageLoaded ? "loaded" : "loading"
            }`}
          >
            <img
              src={image}
              alt={imageAlt}
              className="category-card-img"
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </div>
        ) : icon ? (
          <div className="category-card-icon-slot">{icon}</div>
        ) : (
          <span className="category-card-emoji">{emoji || "✨"}</span>
        )}

        {showArrow && (
          <span className="category-card-arrow" aria-hidden="true">
            <ArrowUpRight size={13} />
          </span>
        )}
      </div>

      {/* Text Info: Clean uppercase title & subtitle */}
      <div className="category-card-info">
        <h3 className="category-card-title">{title}</h3>
        {subtitle && <p className="category-card-sub">{subtitle}</p>}
      </div>

      {children}
    </Card>
  );
}
