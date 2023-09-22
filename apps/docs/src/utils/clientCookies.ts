"use client";
import Cookies from "js-cookie";

export function setCookie(name: string, value: string): void {
  const today = new Date();
  const nextYear = today.getFullYear() + 1;
  Cookies.set(name, value, {
    secure: true,
    expires: new Date(today.setFullYear(nextYear)),
    sameSite: "strict",
  });
}