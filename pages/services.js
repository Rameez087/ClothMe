// import { useSession } from 'next-auth/react';
import Navbar from '@/Component/navbar';
import { useRouter } from 'next/router';

export default function ServicesPage() {
//   const { data: session } = useSession();
  const router = useRouter();

  function handleSubscribe() {
    // if (!session) {
    //   router.push('/auth');
    // } else {
    //   alert('Redirecting to payment gateway...');
    //   // Add Stripe or PayPal integration here
    // }
  }

  return (
    <>
    <Navbar/>
    <div className="services-container">
      <h1 className="services-title">AI Model Training</h1>
      <p className="services-description">
        Unlock the power of AI with our state-of-the-art model training service.
        Train your datasets using our optimized pipelines and get results fast.
      </p>

      <div className="model-box">
        <h2>Starter Package</h2>
        <p>Perfect for brands and businesses.</p>
        <ul>
          <li>✅ 10 hours GPU compute</li>
          <li>✅ Basic reporting</li>
          <li>✅ Email support</li>
        </ul>
        <h3>€9.99 / month</h3>
        <button onClick={handleSubscribe} className="subscribe-btn">Subscribe Now</button>
      </div>


      <style jsx>{`
        .services-container {
          max-width: 800px;
          margin: 3rem auto;
          padding: 2rem;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          color: #2a2a2a;
        }

        .services-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #ff4fa0;
        }

        .services-description {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .model-box {
          border: 2px solid #ff69b4;
          padding: 1.5rem;
          border-radius: 10px;
          background-color: #fff;
          color: #333;
        }

        .model-box h2 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: #222;
        }

        .model-box ul {
          margin: 1rem 0;
          list-style: none;
          padding-left: 0;
        }

        .model-box ul li {
          margin: 0.4rem 0;
        }

        .model-box h3 {
          margin: 1rem 0;
          font-size: 1.3rem;
          color: #d63384;
        }

        .subscribe-btn {
          padding: 0.75rem 1.5rem;
          background-color: #ff69b4;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .subscribe-btn:hover {
          background-color: #ff4fa0;
        }
      `}</style>

    </div></>
  );
}
