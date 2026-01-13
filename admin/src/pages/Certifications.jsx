import { useState, useEffect } from 'react';
import { certificationsAPI } from '../utils/api';
import { toast } from 'react-toastify';

export default function Certifications() {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing

        , setEditing] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        progress: 0,
        status: 'In Progress',
        topics: [],
        order: 0,
        isActive: true
    });
    const [topicInput, setTopicInput] = useState('');

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        try {
            const response = await certificationsAPI.getAll();
            setCertifications(response.data);
        } catch (error) {
            toast.error('Failed to load certifications');
        } finally {
            setLoading(false);
        }
    };

    const addTopic = () => {
        if (topicInput.trim() && !formData.topics.includes(topicInput.trim())) {
            setFormData({ ...formData, topics: [...formData.topics, topicInput.trim()] });
            setTopicInput('');
        }
    };

    const removeTopic = (index) => {
        setFormData({ ...formData, topics: formData.topics.filter((_, i) => i !== index) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await certificationsAPI.update(editing._id, formData);
                toast.success('Certification updated');
            } else {
                await certificationsAPI.create(formData);
                toast.success('Certification created');
            }
            setShowModal(false);
            resetForm();
            fetchCertifications();
        } catch (error) {
            toast.error('Failed to save certification');
        }
    };

    const handleEdit = (cert) => {
        setEditing(cert);
        setFormData({
            title: cert.title,
            description: cert.description,
            progress: cert.progress,
            status: cert.status,
            topics: cert.topics || [],
            order: cert.order,
            isActive: cert.isActive
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this certification?')) return;
        try {
            await certificationsAPI.delete(id);
            toast.success('Deleted');
            fetchCertifications();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const resetForm = () => {
        setEditing(null);
        setFormData({ title: '', description: '', progress: 0, status: 'In Progress', topics: [], order: 0, isActive: true });
        setTopicInput('');
    };

    if (loading) return <div className="loading"><i className="ri-loader-4-line" style={{ fontSize: '48px' }}></i></div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', color: 'var(--green-400)' }}>
                    <i className="ri-award-line"></i> Certifications
                </h1>
                <button className="btn btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
                    <i className="ri-add-line"></i> Add Certification
                </button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Progress</th>
                            <th>Status</th>
                            <th>Topics</th>
                            <th>Order</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {certifications.map((cert) => (
                            <tr key={cert._id}>
                                <td><strong>{cert.title}</strong></td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ flex: 1, background: 'var(--bg-darker)', height: '6px', borderRadius: '3px' }}>
                                            <div style={{ width: `${cert.progress}%`, height: '100%', background: 'var(--green-500)' }}></div>
                                        </div>
                                        <span>{cert.progress}%</span>
                                    </div>
                                </td>
                                <td><span className={`badge ${cert.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>{cert.status}</span></td>
                                <td>
                                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', maxWidth: '200px' }}>
                                        {cert.topics.slice(0, 2).map((t, i) => (
                                            <span key={i} className="badge badge-success" style={{ fontSize: '10px' }}>{t}</span>
                                        ))}
                                        {cert.topics.length > 2 && <span className="badge badge-secondary" style={{ fontSize: '10px' }}>+{cert.topics.length - 2}</span>}
                                    </div>
                                </td>
                                <td>{cert.order}</td>
                                <td><span className={`badge ${cert.isActive ? 'badge-success' : 'badge-danger'}`}>{cert.isActive ? 'Yes' : 'No'}</span></td>
                                <td>
                                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', marginRight: '8px' }} onClick={() => handleEdit(cert)}>
                                        <i className="ri-edit-line"></i>
                                    </button>
                                    <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleDelete(cert._id)}>
                                        <i className="ri-delete-bin-line"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => { setShowModal(false); resetForm(); }}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editing ? 'Edit' : 'Add'} Certification</h2>
                            <button className="close-btn" onClick={() => { setShowModal(false); resetForm(); }}>
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Title *</label>
                                    <input type="text" className="form-control" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Description *</label>
                                    <textarea className="form-control" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} required />
                                </div>
                                <div className="form-group">
                                    <label>Progress (0-100) *</label>
                                    <input type="number" className="form-control" min="0" max="100" value={formData.progress} onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })} required />
                                </div>
                                <div className="form-group">
                                    <label>Status *</label>
                                    <select className="form-control" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Active">Active</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Topics</label>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                        <input type="text" className="form-control" value={topicInput} onChange={(e) => setTopicInput(e.target.value)} placeholder="Enter topic" onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTopic())} />
                                        <button type="button" className="btn btn-secondary" onClick={addTopic}><i className="ri-add-line"></i></button>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {formData.topics.map((topic, index) => (
                                            <span key={index} className="badge badge-success" style={{ cursor: 'pointer', padding: '6px 10px' }} onClick={() => removeTopic(index)}>
                                                {topic} <i className="ri-close-line"></i>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Order</label>
                                    <input type="number" className="form-control" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                        <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} style={{ width: 'auto' }} />
                                        Active
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => { setShowModal(false); resetForm(); }}>Cancel</button>
                                <button type="submit" className="btn btn-primary"><i className="ri-save-line"></i> {editing ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
