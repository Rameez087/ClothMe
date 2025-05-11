"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "@/Component/navbar";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    // Smooth scrolling for internal links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        });
      });
    });

    // Login button alert
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        router.push('/login')
      });
    }

    // Secondary button scroll to about
    const secondaryBtn = document.querySelector('.secondary-btn');
    if (secondaryBtn) {
      secondaryBtn.addEventListener('click', () => {
        document.querySelector('#about').scrollIntoView({
          behavior: 'smooth',
        });
      });
    }

    // Cleanup event listeners on unmount
    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
      if (loginBtn) {
        loginBtn.removeEventListener('click', () => {});
      }
      if (secondaryBtn) {
        secondaryBtn.removeEventListener('click', () => {});
      }
    };
  }, []);

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
            <Link href="/options" className="cta-btn primary-btn">
              Try Now
            </Link>
            <button className="cta-btn secondary-btn">Learn More</button>
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
