import { useEffect, useState } from "react";
import Navbar from "../layouts/navbar";
import Sidebar from "../layouts/sidebar";
import { getAllUsers } from "../api/auth";
import './style/Users.css';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getAllUsers();
                // Ensure we're working with the data array
                if (Array.isArray(usersData)) {
                    setUsers(usersData);
                } else if (usersData?.data && Array.isArray(usersData.data)) {
                    // Handle case where response is {success, data, message}
                    setUsers(usersData.data);
                } else {
                    throw new Error('Unexpected data format received');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);



    return (
        <div className="app-container">
            <Navbar />

            <div className="main-content">
                <Sidebar />

                <div className="user-content-area">
                    <div>
                        <h1>User List</h1>
                        <p>Manage your users here</p>
                    </div>

                    <div className="user-list-content">
                        {loading ? (
                            <div className="loading">Loading users...</div>
                        ) : error ? (
                            <div className="error">Error: {error}</div>
                        ) : users.length === 0 ? (
                            <div className="no-users">
                                <p>No users found</p>
                            </div>
                        ) : (
                            <div className="users-table-container">
                                <table className="users-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>User Type</th>
                                            <th>View</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user._id || user.id}>
                                                <td>{user.firstName || ''} {user.lastName || ''}</td>
                                                <td>{user.email || 'N/A'}</td>
                                                <td>{user.mobileNo || 'N/A'}</td>
                                                <td>{user.userType || 'N/A'}</td>

                                                <td>
                                                    <button className="view-btn">View</button>
                                                </td>

                                                <td>
                                                    <button className="edit-btn">Edit</button>
                                                </td>
                                                <td>
                                                    <button  className="delete-btn  delete">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserList;