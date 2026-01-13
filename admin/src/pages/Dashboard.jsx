import { useState, useEffect } from 'react';
import { skillsAPI, toolsAPI, projectsAPI, blogAPI, contactAPI, certificationsAPI } from '../utils/api';

export default function Dashboard() {
    const [stats, setStats] = useState({
        skills: 0,
        tools: 0,
        projects: 0,
        blogs: 0,
        certifications: 0,
        messages: 0,
        unreadMessages: 0
    });
    const [recentMessages, setRecentMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const [skills, tools, projects, blogs, certs, messages] = await Promise.all([
                skillsAPI.getAll(),
                toolsAPI.getAll(),
                projectsAPI.getAll(),
                blogAPI.getAll(),
                certificationsAPI.getAll(),
                contactAPI.getAll()
            ]);

            setStats({
                skills: skills.data.length,
                tools: tools.data.length,
                projects: projects.data.length,
                blogs: blogs.data.length,
                certifications: certs.data.length,
                messages: messages.data.length,
                unreadMessages: messages.data.filter(m => !m.isRead).length
            });

            setRecentMessages(messages.data.slice(0, 5));
        } catch (error) {
            console.error('Failed to load stats');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading"><i className="ri-loader-4-line" style={{ fontSize: '48px' }}></i></div>;

    return (
        <div>
            <h1 style={{ fontSize: '32px', color: 'var(--green-400)', marginBottom: '32px' }}>
                <i className="ri-dashboard-line"></i> Dashboard
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                {[
                    { label: 'Skills', value: stats.skills, icon: 'ri-code-s-slash-line', color: 'var(--green-400)' },
                    { label: 'Tools', value: stats.tools, icon: 'ri-tools-line', color: 'var(--green-500)' },
                    { label: 'Projects', value: stats.projects, icon: 'ri-folder-line', color: 'var(--green-600)' },
                    { label: 'Certifications', value: stats.certifications, icon: 'ri-award-line', color: 'var(--green-400)' },
                    { label: 'Blog Posts', value: stats.blogs, icon: 'ri-article-line', color: 'var(--green-500)' },
                    { label: 'Messages', value: stats.messages, icon: 'ri-mail-line', color: stats.unreadMessages > 0 ? '#ef4444' : 'var(--green-600)', badge: stats.unreadMessages }
                ].map((stat, i) => (
                    <div key={i} className="card" style={{ textAlign: 'center', position: 'relative' }}>
                        {stat.badge > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                background: '#ef4444',
                                color: 'white',
                                borderRadius: '12px',
                                padding: '2px 8px',
                                fontSize: '12px',
                                fontWeight: 'bold'
                            }}>
                                {stat.badge}
                            </span>
                        )}
                        <i className={stat.icon} style={{ fontSize: '48px', color: stat.color, marginBottom: '12px' }}></i>
                        <h2 style={{ fontSize: '42px', margin: '12px 0', color: 'var(--green-300)' }}>{stat.value}</h2>
                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="card">
                <h2 style={{ color: 'var(--green-400)', marginBottom: '16px' }}>
                    <i className="ri-message-3-line"></i> Recent Messages
                </h2>
                {recentMessages.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>No messages yet</p>
                ) : (
                    recentMessages.map((msg) => (
                        <div key={msg._id} style={{
                            padding: '16px',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            marginBottom: '12px',
                            background: msg.isRead ? 'transparent' : 'rgba(74, 222, 128, 0.05)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                                <div>
                                    <strong style={{ color: 'var(--green-300)' }}>{msg.name}</strong>
                                    {!msg.isRead && <span className="badge badge-warning" style={{ marginLeft: '8px', fontSize: '10px' }}>NEW</span>}
                                </div>
                                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                    {new Date(msg.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{msg.subject}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{msg.email}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
