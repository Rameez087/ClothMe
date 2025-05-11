import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import '@/styles/landingPage.css'; 
import '@/styles/login.css'; 
import "@/styles/checkout.css";
import "@/styles/payment.css";
import '@/styles/order-status.css';  // Adjust the path if necessary

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
