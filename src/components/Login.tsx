import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../apis/auth';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Reset errors
        setEmailError(null);
        setPasswordError(null);

        // Kiểm tra validation trước khi gửi yêu cầu đăng nhập
        if (!email) {
            setEmailError('Email is required');
        }
        if (!password) {
            setPasswordError('Password is required');
        }

        // Nếu không có lỗi, gửi yêu cầu đăng nhập
        if (email && password) {
            try {
                const response = await login(email, password);
                authLogin(response.data.token);
                window.alert('Login successful!');
                navigate('/profile');
            } catch (error: any) {
                setError(error.response?.data || 'Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4">
                <h2 className="card-title text-center">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {emailError && <small className="text-danger">{emailError}</small>} {/* Lỗi hiển thị dưới input */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {passwordError && <small className="text-danger">{passwordError}</small>} {/* Lỗi hiển thị dưới input */}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <p className="text-center mt-3">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
