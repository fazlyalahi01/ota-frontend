import { Open_Sans } from "next/font/google";
import { ReactNode } from "react";

export const openSans = Open_Sans({ subsets: ["latin"] });

// THEME PROVIDER
import ThemeProvider from "theme/theme-provider";
// PRODUCT CART PROVIDER
import CartProvider from "contexts/CartContext";
// SITE SETTINGS PROVIDER
import SettingsProvider from "contexts/SettingContext";
// GLOBAL CUSTOM COMPONENTS
import ProgressBar from "components/progress";

// IMPORT i18n SUPPORT FILE
import ShopLayout1 from "components/layouts/shop-layout-1";
import "i18n";
import RTL from "components/rtl";
import { AuthProvider } from "contexts/AuthContext";
import Script from "next/script";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={openSans.className}>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
        <AuthProvider>
          <CartProvider>
            <SettingsProvider>
              <ThemeProvider>
                <ProgressBar />
                <RTL>
                  {children}
                </RTL>
              </ThemeProvider>
            </SettingsProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
