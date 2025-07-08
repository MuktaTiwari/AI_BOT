import { useState, useEffect } from 'react';
import Navbar from "../layouts/navbar";
import Sidebar from "../layouts/sidebar";
import UserModal from './UserModal';
import { registerUser, getAllUsers } from '../api/auth';
import './style/Users.css';

function UserList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleCreateUser = async (userData) => {
        try {
            const response = await registerUser(userData);

            // Refresh the user list
            const updatedUsers = await getAllUsers();
            setUsers(updatedUsers);

            setNotification({
                show: true,
                message: 'User created successfully!',
                type: 'success'
            });

            setTimeout(() => {
                setIsModalOpen(false);
                setNotification({ show: false, message: '', type: '' });
            }, 2000);

            return response.data;
        } catch (error) {
            setNotification({
                show: true,
                message: error.message || 'Failed to create user',
                type: 'error'
            });
            throw error;
        }
    };

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                console.log('Fetching users...');
                const userData = await getAllUsers();
                console.log('Received users data:', userData);
                
                if (!userData || !Array.isArray(userData)) {
                    console.error('Invalid users data format:', userData);
                    throw new Error('Invalid users data format');
                }
                
                setUsers(userData);
                setError(null);
            } catch (err) {
                console.error('Detailed error in fetchAllUsers:', {
                    message: err.message,
                    stack: err.stack,
                    response: err.response
                });
                setError(err.message || 'Failed to fetch users');
                setNotification({
                    show: true,
                    message: 'Failed to fetch users',
                    type: 'error'
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllUsers();
    }, []);

    return (
        <div className="app-container">
            <Navbar />
            <div className="main-content">
                <Sidebar />
                <div className="content-area">
                    <div className="users-header">
                        <h1>User Management</h1>

                        <div>

                        <button
                            className="create-user-button"
                            onClick={() => setIsModalOpen(true)}
                            >
                            Add New User
                        </button>
                            </div>
                    </div>

                    {isLoading ? (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Loading users...</p>
                        </div>
                    ) : error ? (
                        <div className="error-message">{error}</div>
                    ) : (
                        <div className="users-table-container">
                            <table className="users-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users.map(user => (
                                            <tr key={user._id} className="user-row">
                                                <td>
                                                    <div className="user-avatar-name">
                                                        <span className="user-avatar">
                                                            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                                                        </span>
                                                        {user.firstName} {user.lastName}
                                                    </div>
                                                </td>
                                                <td>{user.email}</td>
                                                <td>{user.mobileNo}</td>
                                                <td>
                                                    <span className={`role-badge ${user.userType}`}>
                                                        {user.userType}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="user-actions">
                                                        <button className="edit-btn">Edit</button>
                                                        <button className="delete-btn">Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="no-users-row">
                                            <td colSpan="5">
                                                <div className="no-users-message">
                                                    No users found. Create your first user!
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <UserModal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateUser}
            />

            {notification.show && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
        </div>
    );
}

export default UserList;