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
      <nav className="navbar">
        <Image
          className="logo"
          src="/static/images/logotransparent.png"
          alt="ClothMe! logo featuring a pink circle with white hanger icon and stylized text"
          width={150}
          height={50}
          onClick={() => handleImageClick()}
          style={{ cursor: 'pointer' }}
        />
        <div className="nav-container">
          <div className="nav-links">     
            <Link href="/try_on">TryOn</Link>
            <Link href="/services">Our Services</Link>
            <Link href="/about">About Us</Link>
            <Link href="/history">History</Link>
            {/* <a href="/subscribe">Subscribe</a> */}
          </div>
          
          {status === 'authenticated' ? (
            <div className="user-menu">
              <button className="login-btn" onClick={() => handleLogout()}>Logout</button>
            </div>
          ) : (
            <button className="login-btn" onClick={() => handleLogin()}>Login</button>
          )}
        </div>
      </nav>
    </div>
  );
}