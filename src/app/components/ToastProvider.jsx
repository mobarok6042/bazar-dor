"use client";

import { Toaster } from "react-hot-toast";

const ToastProvider = () => (
  <Toaster
    position="top-center"
    toastOptions={{
      duration: 4000,
      style: {
        background: "#047F39",
        color: "#fff",
        fontWeight: 600,
      },
      error: {
        style: {
          background: "#b42318",
          color: "#fff",
        },
      },
    }}
  />
);

export default ToastProvider;
