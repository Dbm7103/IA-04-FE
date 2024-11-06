import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Profile: React.FC = () => {
    const { token, logout } = useAuth();
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEmail(response.data.email);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [token]);

    return (
        <div className="container mt-5">
            <div className="card p-4">
                <h2 className="card-title text-center">Profile</h2>
                <p>Email: {email}</p>
                <button className="btn btn-primary w-100" onClick={logout}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;