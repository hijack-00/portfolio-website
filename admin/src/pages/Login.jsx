import { useState } from 'react';
import { authAPI } from '../utils/api';
import { toast } from 'react-toastify';
import './Login.css';

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authAPI.login(email, password);
            localStorage.setItem('token', response.data.token);
            toast.success('Login successful!');
            onLogin();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box card">
                <div className="login-header">
                    <i className="ri-admin-line" style={{ fontSize: '48px', color: 'var(--green-400)' }}></i>
                    <h1>Portfolio Admin</h1>
                    <p>Sign in to manage your portfolio</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? (
                            <>
                                <i className="ri-loader-4-line" style={{ animation: 'spin 1s linear infinite' }}></i>
                                Signing in...
                            </>
                        ) : (
                            <>
                                <i className="ri-login-box-line"></i>
                                Sign In
                            </>
                        )}
                    </button>
                </form>
                <div className="login-footer">
                    {/* <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '20px' }}>
                        Default credentials: admin@portfolio.com / Admin@12345
                    </p> */}
                </div>
            </div>
        </div>
    );
}
