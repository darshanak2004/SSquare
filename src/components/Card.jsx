import React from "react";

/**
 * Versatile, reusable Card component for modern UI layouts.
 *
 * Supports interactive button/link modes, customizable elevations,
 * hover animations, and flexible layout slots.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Custom classes
 * @param {boolean} [props.hoverable] - Whether to apply lift & hover shadow
 * @param {boolean} [props.active] - Active / selected state
 * @param {string} [props.variant] - "default" | "elevated" | "flat" | "interactive"
 * @param {() => void} [props.onClick] - Click handler
 * @param {string} [props.href] - Link destination
 * @param {React.ElementType} [props.as] - Component/element type (e.g. 'div', 'article', 'button', 'a')
 */
export default function Card({
  children,
  className = "",
  hoverable = true,
  active = false,
  variant = "default",
  onClick,
  href,
  as: Component = "div",
  ...restProps
}) {
  const isInteractive = Boolean(onClick || href || variant === "interactive");
  const Tag = href ? "a" : onClick ? "button" : Component;

  const classes = [
    "ui-card",
    `ui-card-${variant}`,
    hoverable ? "ui-card-hoverable" : "",
    active ? "ui-card-active" : "",
    isInteractive ? "ui-card-interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      className={classes}
      onClick={onClick}
      href={href}
      type={Tag === "button" ? "button" : undefined}
      {...restProps}
    >
      {children}
    </Tag>
  );
}

/**
 * Card Media / Visual Container
 */
export function CardMedia({
  children,
  src,
  alt = "",
  className = "",
  aspectRatio = "1/1",
  ...restProps
}) {
  return (
    <div
      className={`ui-card-media ${className}`}
      style={{ aspectRatio }}
      {...restProps}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="ui-card-media-img"
        />
      ) : (
        children
      )}
    </div>
  );
}

/**
 * Card Content / Body
 */
export function CardContent({ children, className = "", ...restProps }) {
  return (
    <div className={`ui-card-content ${className}`} {...restProps}>
      {children}
    </div>
  );
}
