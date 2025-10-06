import { useEffect } from "react";

/**
 * This will be a no-op when `process.env.NODE_ENV === "production"`.
 * Otherwise, it will be a normal `useEffect` call
 * @since 6.4.0
 */
export const useDevEffect =
  process.env.NODE_ENV === "production" ? () => {} : useEffect;
