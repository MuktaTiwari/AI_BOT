import { useNavigate } from "react-router-dom";
import './style/LoginPage.css'; // Create this CSS file

function LoginPage() {
    const navigate = useNavigate();

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Welcome Back</h1>
                <p className="login-subtitle">Sign in to your AI Bot account</p>
                
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            className="form-input"
                            placeholder="Enter your username"
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className="form-input"
                            placeholder="Enter your password"
                            required 
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>

                <div className="login-footer">
                    <p>Don't have an account? <span className="signup-link" onClick={() => navigate('/register')}>Sign up</span></p>
                    <p className="forgot-password">Forgot password?</p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;