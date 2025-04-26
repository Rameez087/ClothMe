import { useState } from "react"

export default function login(){

    const [email, setEmail] = useState(" ")
    const [password, setPassword] = useState(" ")

    function handleSubmit(){
        e.preventDefault()
        console.log(`email: ${email}, password:${password}`)
    }

    return(
        <div>
            <div className="login-container">
                <div className="login-image"></div>
                <div className="login-form">
                    <img className="logo" 
                        src="logotransparent.png" 
                        alt="ClothMe! logo featuring a pink circle with white hanger icon and stylized text"
                        width="150"
                        height="50" />
                    <h2>Welcome Back</h2>
                    <form id="loginForm" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" required placeholder="Enter your email"
                                value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" required placeholder="Enter your password" 
                                value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <div className="forgot-password">
                            <a href="/reset-password">Forgot Password?</a>
                        </div>
                        <button type="submit" className="login-btn">Log In</button>
                        <p className="signup-link">
                            Don't have an account? <a href="https://clothme.com/signup">Sign Up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

