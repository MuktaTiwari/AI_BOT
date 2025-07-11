import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from '../api/auth';
import './style/LoginPage.css';
import axios from "axios";

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await loginUser({
                email: formData.email,
                password: formData.password
            });

            // Correct the path to match backend response
            const { user, token } = response.data;

            // Store the token and user data
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userType: user.userType
            }));

            // Set default Authorization header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            if (user.userType === 'user') {
                navigate('/conversations');
            }
            else {

                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Welcome Back</h1>
                <p className="login-subtitle">Sign in to your AI Bot account</p>

                {error && <div className="error-message">{error}</div>}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
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
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="login-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Don't have an account? <span
                        className="signup-link"
                        onClick={() => navigate('/register')}
                    >
                        Sign up
                    </span></p>
                    <p className="forgot-password">Forgot password?</p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;