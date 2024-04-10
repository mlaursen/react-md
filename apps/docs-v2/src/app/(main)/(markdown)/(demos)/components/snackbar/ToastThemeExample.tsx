"use client";
import { Button } from "@react-md/core/button/Button";
import { addToast } from "@react-md/core/snackbar/ToastManager";
import { type ReactElement } from "react";

export default function ToastThemeExample(): ReactElement {
  return (
    <>
      <Button
        onClick={() => {
          addToast({ children: "Surface Theme (Default)", theme: "surface" });
        }}
        themeType="contained"
      >
        Surface
      </Button>
      <Button
        onClick={() => {
          addToast({ children: "Primary Theme", theme: "primary" });
        }}
        theme="primary"
        themeType="contained"
      >
        Primary
      </Button>
      <Button
        onClick={() => {
          addToast({ children: "Secondary Theme", theme: "secondary" });
        }}
        theme="secondary"
        themeType="contained"
      >
        Secondary
      </Button>
      <Button
        onClick={() => {
          addToast({ children: "Success Theme", theme: "success" });
        }}
        theme="success"
        themeType="contained"
      >
        Success
      </Button>
      <Button
        onClick={() => {
          addToast({ children: "Warning Theme", theme: "warning" });
        }}
        theme="warning"
        themeType="contained"
      >
        Warning
      </Button>
      <Button
        onClick={() => {
          addToast({ children: "Error Theme", theme: "error" });
        }}
        theme="error"
        themeType="contained"
      >
        Error
      </Button>
    </>
  );
}
