import { useNavigate } from "react-router-dom";
import './style/RegisterPage.css';
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from '../api/auth';



function RegisterPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await registerUser({
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                email: e.target.email.value,
                mobileNo: e.target.mobileNo.value,
                password: e.target.password.value,
            });

            console.log('Registration successful:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error.response?.data || error.message);
            // Add error state to show user feedback
        } finally {
            setIsSubmitting(false);
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1 className="register-title">Create Account</h1>
                <p className="register-subtitle">Join our AI Bot platform today</p>

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName" className="form-label">FirstName</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="form-input"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName" className="form-label">LastName</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="form-input"
                            placeholder="Enter your last name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mobileNo" className="form-label">Mobile Number</label>
                        <input
                            type="text"
                            id="mobileNo"
                            name="mobileNo"
                            className="form-input"
                            placeholder="Enter your mobile number"
                            pattern="[0-9]{10}"
                            title="Please enter a valid 10-digit mobile number"
                            required
                        />
                    </div>

                    <div className="form-group password-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="form-input password-input"
                                placeholder="Create a password"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="register-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="register-footer">
                    <p>Already have an account? <span className="login-link" onClick={() => navigate('/login')}>Sign in</span></p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;