import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "@/Component/navbar";

export default function HomePage() {
  const router = useRouter();


  return (
    <div>
      <Navbar/>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Virtual Try-On Experience</h1>
          <p>
            Transform your online shopping experience with our AI-powered virtual fitting room.
            Try clothes on your digital twin, visualize perfect fits, and shop with confidence.
            Train the system with your own wardrobe for personalized recommendations.
          </p>
          <div className="cta-buttons">
            <Link href="/try_on" className="cta-btn primary-btn">
              Try Now
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
          />
        </div>
      </section>
    </div>
  );
}
