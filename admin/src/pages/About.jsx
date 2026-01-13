import { useState, useEffect } from 'react';
import { aboutAPI } from '../utils/api';
import { toast } from 'react-toastify';

export default function About() {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        whoami: '',
        expertise: '',
        services: '',
        mission: ''
    });

    useEffect(() => {
        fetchAbout();
    }, []);

    const fetchAbout = async () => {
        try {
            const response = await aboutAPI.get();
            if (response.data) {
                setFormData(response.data);
            }
        } catch (error) {
            toast.error('Failed to load about content');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await aboutAPI.update(formData);
            toast.success('About content updated successfully');
            fetchAbout();
        } catch (error) {
            toast.error('Failed to update about content');
        }
    };

    if (loading) {
        return <div className="loading"><i className="ri-loader-4-line" style={{ fontSize: '48px' }}></i></div>;
    }

    return (
        <div>
            <h1 style={{ fontSize: '32px', color: 'var(--green-400)', marginBottom: '32px' }}>
                <i className="ri-information-line"></i> About Me Section
            </h1>

            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Who Am I? *</label>
                        <textarea
                            className="form-control"
                            value={formData.whoami}
                            onChange={(e) => setFormData({ ...formData, whoami: e.target.value })}
                            rows={5}
                            placeholder="Introduce yourself..."
                            required
                        />
                        <small style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                            This appears as the main introduction in your About section
                        </small>
                    </div>

                    <div className="form-group">
                        <label>Expertise *</label>
                        <textarea
                            className="form-control"
                            value={formData.expertise}
                            onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                            rows={5}
                            placeholder="Describe your technical expertise..."
                            required
                        />
                        <small style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                            Highlight your main skills and areas of specialization
                        </small>
                    </div>

                    <div className="form-group">
                        <label>Services *</label>
                        <textarea
                            className="form-control"
                            value={formData.services}
                            onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                            rows={5}
                            placeholder="List the services you offer..."
                            required
                        />
                        <small style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                            Detail the services and solutions you provide to clients
                        </small>
                    </div>

                    <div className="form-group">
                        <label>Mission *</label>
                        <textarea
                            className="form-control"
                            value={formData.mission}
                            onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                            rows={5}
                            placeholder="What's your professional mission..."
                            required
                        />
                        <small style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                            Share your professional goals and what drives you
                        </small>
                    </div>

                    <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" className="btn btn-primary">
                            <i className="ri-save-line"></i>
                            Save About Content
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
