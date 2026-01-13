import { useState, useEffect } from 'react';
import { skillsAPI } from '../utils/api';
import { toast } from 'react-toastify';

export default function Skills() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        level: 'Intermediate',
        progress: 50,
        order: 0,
        isActive: true
    });

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await skillsAPI.getAll();
            setSkills(response.data);
        } catch (error) {
            toast.error('Failed to load skills');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingSkill) {
                await skillsAPI.update(editingSkill._id, formData);
                toast.success('Skill updated successfully');
            } else {
                await skillsAPI.create(formData);
                toast.success('Skill created successfully');
            }
            setShowModal(false);
            resetForm();
            fetchSkills();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save skill');
        }
    };

    const handleEdit = (skill) => {
        setEditingSkill(skill);
        setFormData({
            name: skill.name,
            level: skill.level,
            progress: skill.progress,
            order: skill.order,
            isActive: skill.isActive
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this skill?')) return;

        try {
            await skillsAPI.delete(id);
            toast.success('Skill deleted successfully');
            fetchSkills();
        } catch (error) {
            toast.error('Failed to delete skill');
        }
    };

    const resetForm = () => {
        setEditingSkill(null);
        setFormData({
            name: '',
            level: 'Intermediate',
            progress: 50,
            order: 0,
            isActive: true
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
    };

    if (loading) {
        return <div className="loading"><i className="ri-loader-4-line" style={{ fontSize: '48px' }}></i></div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', color: 'var(--green-400)' }}>
                    <i className="ri-code-s-slash-line"></i> Skills Management
                </h1>
                <button className="btn btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
                    <i className="ri-add-line"></i>
                    Add Skill
                </button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Level</th>
                            <th>Progress</th>
                            <th>Order</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map((skill) => (
                            <tr key={skill._id}>
                                <td><strong>{skill.name}</strong></td>
                                <td>
                                    <span className={`badge ${skill.level === 'Expert' ? 'badge-success' :
                                        skill.level === 'Advanced' ? 'badge-warning' : 'badge-secondary'
                                        }`}>
                                        {skill.level}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ flex: 1, background: 'var(--bg-darker)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{
                                                width: `${skill.progress}%`,
                                                height: '100%',
                                                background: 'var(--green-500)',
                                                transition: 'width 0.3s'
                                            }}></div>
                                        </div>
                                        <span style={{ minWidth: '40px', textAlign: 'right' }}>{skill.progress}%</span>
                                    </div>
                                </td>
                                <td>{skill.order}</td>
                                <td>
                                    <span className={`badge ${skill.isActive ? 'badge-success' : 'badge-danger'}`}>
                                        {skill.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            className="btn btn-secondary"
                                            style={{ padding: '6px 12px', fontSize: '12px' }}
                                            onClick={() => handleEdit(skill)}
                                        >
                                            <i className="ri-edit-line"></i>
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            style={{ padding: '6px 12px', fontSize: '12px' }}
                                            onClick={() => handleDelete(skill._id)}
                                        >
                                            <i className="ri-delete-bin-line"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h2>
                            <button className="close-btn" onClick={handleCloseModal}>
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Skill Name *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Level *</label>
                                    <select
                                        className="form-control"
                                        value={formData.level}
                                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                        required
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Expert">Expert</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Progress (0-100) *</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        min="0"
                                        max="100"
                                        value={formData.progress}
                                        onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Display Order</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                            style={{ width: 'auto' }}
                                        />
                                        Active
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    <i className="ri-save-line"></i>
                                    {editingSkill ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
