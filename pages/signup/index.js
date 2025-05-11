import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Register.module.css'; // adjust the path if needed
import { useRouter } from 'next/router';

export default function Register() {
    const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    Name: '',
   
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.Name,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert('Registered successfully!');
        router.push('/login'); // redirect to login page
      } else {
        alert(data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Something went wrong.');
    }
  }

  function handleLogo(){
    router.push('/')
  }

  return (
    <>
      <div className={styles.registerContainer}>
        <div className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src="/static/images/logotransparent.png"
            alt="ClothMe! logo"
            width={150}
            height={50}
            onClick={()=>handleLogo()
            
            }
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formSection}>
              {['Name'].map((field) => (
                <div className={styles.inputGroup} key={field}>
                  <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1')}</label>
                  <input id={field} type="text" required value={formData[field]} onChange={handleChange} />
                </div>
              ))}
            </div>
            <div className={styles.formSection}>
              {['email', 'password', 'confirmPassword'].map((field) => (
                <div className={styles.inputGroup} key={field}>
                  <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    id={field}
                    type={field.toLowerCase().includes('password') ? 'password' : 'text'}
                    placeholder={field === 'expiryDate' ? 'MM/YY' : ''}
                    required
                    value={formData[field]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className={styles.registerBtn}>Register!</button>
        </form>
      </div>
      <div className={styles.waveDecoration}></div>
    </>
  );
}
