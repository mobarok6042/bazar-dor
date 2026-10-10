import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

import HeaderPage from "./components/Header/page";
import ToastProvider from "./components/ToastProvider";
import FooterPage from "./components/Footer/page";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["latin","bengali"],
});

export const metadata = {
  title: {
    default: "বাজার দর",
    template: "%s | বাজার দর",
  },
  description: "আজকের বাজারের পণ্যের দাম ও দামের পরিবর্তন",
  icons: {
    icon: "/logo-icon.png",
    shortcut: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${notoSansBengali.className}  h-full antialiased`}
    >

      <body className="min-h-full flex flex-col">
        <ToastProvider />
        <HeaderPage></HeaderPage>
        {children}
        <FooterPage />
        </body>
    </html>
  );
}
