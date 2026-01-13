import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

export default function Layout({ children, onLogout }) {
    const location = useLocation();

    const menuItems = [
        { path: '/', icon: 'ri-dashboard-line', label: 'Dashboard' },
        { path: '/profile', icon: 'ri-user-line', label: 'Profile' },
        { path: '/about', icon: 'ri-information-line', label: 'About' },
        { path: '/skills', icon: 'ri-code-s-slash-line', label: 'Skills' },
        { path: '/tools', icon: 'ri-tools-line', label: 'Tools' },
        { path: '/projects', icon: 'ri-folder-line', label: 'Projects' },
        { path: '/certifications', icon: 'ri-award-line', label: 'Certifications' },
        { path: '/blog', icon: 'ri-article-line', label: 'Blog' },
        { path: '/contact', icon: 'ri-mail-line', label: 'Contact' },
    ];

    return (
        <div className="admin-layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h1><i className="ri-admin-line"></i> Admin Panel</h1>
                </div>
                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <i className={item.icon}></i>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="sidebar-footer">
                    <button onClick={onLogout} className="btn btn-danger" style={{ width: '100%' }}>
                        <i className="ri-logout-box-line"></i>
                        Logout
                    </button>
                </div>
            </aside>
            <main className="main-content">
                <div className="content-wrapper">
                    {children}
                </div>
            </main>
        </div>
    );
}
