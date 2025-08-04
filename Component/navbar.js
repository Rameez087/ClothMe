import styles from './navbar.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showWelcome, setShowWelcome] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      setShowWelcome(true);
      setTimeout(() => setShowWelcome(false), 3000); // Hide after 3 seconds
    }
  }, [status]);
  function handleLogin() {
    router.push('/login');
  }

  function handleLogout() {
    signOut({ callbackUrl: '/' });
  }

  function handleImageClick() {
    router.push('/');
  }

  return (
    <div>
      <nav className="modern-navbar">
        <div className="nav-content">
          <div className="nav-brand">
            <Image
              className="logo"
              src="/static/images/logotransparent.png"
              alt="ClothMe! logo featuring a pink circle with white hanger icon and stylized text"
              width={150}
              height={50}
              onClick={() => handleImageClick()}
              style={{ cursor: 'pointer' }}
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">     
            <Link href="/try_on" className="nav-link">
              <span>Try On</span>
            </Link>
            <Link href="/services" className="nav-link">
              <span>Services</span>
            </Link>
            <Link href="/about" className="nav-link">
              <span>About</span>
            </Link>
            <Link href="/history" className="nav-link">
              <span>History</span>
            </Link>
          </div>

          <div className="nav-actions">
            {status === 'authenticated' ? (
              <div className="user-menu">
                <div className="user-info">
                  <span className="user-greeting">Hi, {session?.user?.name || session?.user?.email?.split('@')[0]}</span>
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => handleLogout()}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={() => handleLogin()}>
                Login
              </button>
            )}

            {/* Mobile menu button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-nav-links">
            <Link href="/try_on" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Try On
            </Link>
            <Link href="/services" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Services
            </Link>
            <Link href="/about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            <Link href="/history" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              History
            </Link>
            
            <div className="mobile-auth">
              {status === 'authenticated' ? (
                <button className="btn btn-outline" onClick={() => handleLogout()}>
                  Logout
                </button>
              ) : (
                <button className="btn btn-primary" onClick={() => handleLogin()}>
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}