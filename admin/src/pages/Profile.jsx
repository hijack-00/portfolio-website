import { useState, useEffect } from 'react';
import { profileAPI } from '../utils/api';
import { toast } from 'react-toastify';

export default function Profile() {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        subtitle: '',
        typingTexts: [],
        email: '',
        phone: '',
        githubUrl: '',
        linkedinUrl: '',
        resumeUrl: '',
        footerText: '',
        footerTagline: '',
        availability: '',
        responseTime: ''
    });
    const [newText, setNewText] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await profileAPI.get();
            if (response.data) {
                setFormData(response.data);
            }
        } catch (error) {
            toast.error('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await profileAPI.update(formData);
            toast.success('Profile updated successfully');
            fetchProfile();
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    const addTypingText = () => {
        if (newText.trim()) {
            setFormData({
                ...formData,
                typingTexts: [...formData.typingTexts, newText.trim()]
            });
            setNewText('');
        }
    };

    const removeTypingText = (index) => {
        setFormData({
            ...formData,
            typingTexts: formData.typingTexts.filter((_, i) => i !== index)
        });
    };

    const updateTypingText = (index, value) => {
        const newTexts = [...formData.typingTexts];
        newTexts[index] = value;
        setFormData({ ...formData, typingTexts: newTexts });
    };

    if (loading) {
        return <div className="loading"><i className="ri-loader-4-line" style={{ fontSize: '48px' }}></i></div>;
    }

    return (
        <div>
            <h1 style={{ fontSize: '32px', color: 'var(--green-400)', marginBottom: '32px' }}>
                <i className="ri-user-line"></i> Profile Settings
            </h1>

            <div className="card">
                <form onSubmit={handleSubmit}>
                    <h3 style={{ color: 'var(--green-400)', marginBottom: '24px' }}>Basic Information</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        <div className="form-group">
                            <label>Full Name *</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Title *</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="IT Consultant"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Subtitle *</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.subtitle}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                placeholder="Full-Stack Developer"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '24px' }}>
                        <label>Typing Animation Texts</label>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                            <input
                                type="text"
                                className="form-control"
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                                placeholder="Enter text to add"
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTypingText())}
                            />
                            <button type="button" className="btn btn-secondary" onClick={addTypingText}>
                                <i className="ri-add-line"></i>
                            </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {formData.typingTexts.map((text, index) => (
                                <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--text-secondary)', minWidth: '24px' }}>{index + 1}.</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={text}
                                        onChange={(e) => updateTypingText(index, e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => removeTypingText(index)}
                                        style={{ padding: '6px 12px' }}
                                    >
                                        <i className="ri-delete-bin-line"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h3 style={{ color: 'var(--green-400)', marginTop: '32px', marginBottom: '24px' }}>Contact Information</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>GitHub URL</label>
                            <input
                                type="url"
                                className="form-control"
                                value={formData.githubUrl}
                                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>LinkedIn URL</label>
                            <input
                                type="url"
                                className="form-control"
                                value={formData.linkedinUrl}
                                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Resume URL</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.resumeUrl}
                                onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                            />
                        </div>
                    </div>

                    <h3 style={{ color: 'var(--green-400)', marginTop: '32px', marginBottom: '24px' }}>Footer & Availability</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        <div className="form-group">
                            <label>Footer Text</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.footerText}
                                onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Footer Tagline</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.footerTagline}
                                onChange={(e) => setFormData({ ...formData, footerTagline: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Availability Status</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.availability}
                                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Response Time</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.responseTime}
                                onChange={(e) => setFormData({ ...formData, responseTime: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" className="btn btn-primary">
                            <i className="ri-save-line"></i>
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
