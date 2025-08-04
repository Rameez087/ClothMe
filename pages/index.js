import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "@/Component/navbar";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="app-container">
      <Navbar/>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Virtual Try-On Revolution</h1>
          <p>
            Experience the future of fashion with our AI-powered virtual fitting room. 
            Try on clothes instantly, get perfect fits, and shop with complete confidence.
          </p>
          <div className="cta-buttons">
            <Link href="/try_on" className="btn btn-primary btn-lg">
              Try Now
            </Link>
            <Link href="/about" className="btn btn-outline btn-lg">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <Image
            className="hero-model floating"
            src="/static/images/good.webp"
            alt="Elegant woman in white blazer and black quilted bag with sophisticated style"
            width={600}
            height={800}
            priority
          />
        </div>
      </section>
    </div>
  );
}
