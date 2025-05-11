import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import '@/styles/landingPage.css'; 
import '@/styles/login.css'; 

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
