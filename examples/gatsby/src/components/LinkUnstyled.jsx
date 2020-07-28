import React from "react"
import { Link } from "gatsby"

export default function LinkUnstyled({ to, children, ...props }) {
  if (typeof to === "string" && to.startsWith("http")) {
    // external links
    return (
      <a {...props} to={to} rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <Link {...props} to={to}>
      {children}
    </Link>
  )
}
