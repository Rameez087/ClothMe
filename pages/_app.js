import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./context/CartContext";
import "@/styles/globals.css";
import '@/styles/landingPage.css'; 
import '@/styles/login.css'; 
import "@/styles/checkout.css";
import "@/styles/payment.css";
import '@/styles/order-status.css';  
import '@/styles/order-status.css';  

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </SessionProvider>
  );
}
