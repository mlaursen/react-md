import { notFound } from "next/navigation.js";

/**
 * This is the only way to get the not-found.tsx to be picked up when using
 * route groups at this time
 */
export default function NotFoundDummy(): never {
  notFound();
}
