"use client";
import { useEffect, useLayoutEffect } from "react";

/**
 * This is copy/pasted from react-redux which has some more information about
 * this and how to fix "invalid" warnings while running tests.
 *
 * @see {@link https://github.com/reduxjs/react-redux/blob/4c907c0870c6b9a136dd69be294c17d1dc63c8f5/src/utils/useIsomorphicLayoutEffect.js}
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  typeof window.document.createElement !== "undefined"
    ? useLayoutEffect
    : useEffect;
