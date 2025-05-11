import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        console.log(`email: ${email}, password: ${password}`);

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.success) {
                console.log('Login successful');
                router.push('/');
                setLoginError('')
            } else {
                setLoginError('Invalid email or password.')
                console.error('Login failed:', data.message);
            }
        } catch (err) {
            console.error('Request failed:', err);
        }
    }
    function handleLogo(){
        router.push('/')
      }
    return (
        <div>
            <div className="login-container">
                <div className="login-image"></div>
                <div className="login-form">
                    <img className="logo"
                        src="/static/images/logotransparent.png"
                        alt="ClothMe! logo"
                        width="150"
                        height="50" 
                        onClick={()=>handleLogo()}
                        />
                    <h2>Welcome Back</h2>
                    <form id="loginForm" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                required
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {loginError && (
                            <div style={{ color: 'red', marginTop: '10px' }}>
                                {loginError}
                            </div>
                        )}
                        <div className="forgot-password">
                            <a href="/reset-password">Forgot Password?</a>
                        </div>
                        <button type="submit" className="login-btn">Log In</button>
                        <p className="signup-link">
                            Don't have an account? <a href="/signup">Sign Up</a>
                        </p>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}
