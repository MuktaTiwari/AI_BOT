import { useState } from 'react';
import './style/UserModal.css'
const UserModal = ({ show, onClose, onCreate }) => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNo: '',
        password: '',
        userType: 'user'
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
        
            if (userData.password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }

            await onCreate({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                mobileNo: userData.mobileNo,
                password: userData.password,
                userType: userData.userType
            });

            // Reset form on success
            setUserData({
                firstName: '',
                lastName: '',
                email: '',
                mobileNo: '',
                password: '',
                userType: 'user'
            });
        } catch (err) {
            setError(err.message || 'Failed to create user');
        } finally {
            setIsLoading(false);
        }
    };

    if (!show) return null;


    

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add New User</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={userData.firstName}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={userData.lastName}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input
                            type="tel"
                            name="mobileNo"
                            value={userData.mobileNo}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            pattern="[0-9]{10}"
                            title="Please enter a 10-digit phone number"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Password</label>
                            <div className="password-input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                       
                    </div>

                    <div className="form-group">
                        <label>User Type</label>
                        <select
                            name="userType"
                            value={userData.userType}
                            onChange={handleChange}
                            disabled={isLoading}
                            className="user-type-select"
                        >
                            <option value="user">Regular User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="password-toggle-container">
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            Show Passwords
                        </label>
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="save-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating...' : 'Create User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;