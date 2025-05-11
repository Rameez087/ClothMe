import styles from './navbar.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter();

  function handleLogin() {
    router.push('/login');
  }
  function handleImageClick(){
    router.push('/')
  }
  return (<div>
    <nav className="navbar">
            <Image
              className="logo"
              src="/static/images/logotransparent.png"
              alt="ClothMe! logo featuring a pink circle with white hanger icon and stylized text"
              width={150}
              height={50}
              onClick={(e)=>handleImageClick()}
            />
            <div className="nav-container">
              <div className="nav-links">
                <a href="/try_on">TryOn</a>
                <a href="/services">Our Services</a>
                <a href="/about">About Us</a>
                {/* <a href="/subscribe">Subscribe</a> */}
              </div>
              <button className="login-btn" onClick={()=>handleLogin()}>Login</button>
            </div>
          </nav>
          
          </div>
  );
}
