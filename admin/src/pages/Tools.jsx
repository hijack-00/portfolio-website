import { useState, useEffect } from 'react';
import { toolsAPI } from '../utils/api';
import { toast } from 'react-toastify';

export default function Tools() {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingTool, setEditingTool] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        icon: 'ri-code-line',
        status: 'Proficient',
        order: 0,
        isActive: true
    });

    useEffect(() => {
        fetchTools();
    }, []);

    const fetchTools = async () => {
        try {
            const response = await toolsAPI.getAll();
            setTools(response.data);
        } catch (error) {
            toast.error('Failed to load tools');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTool) {
                await toolsAPI.update(editingTool._id, formData);
                toast.success('Tool updated successfully');
            } else {
                await toolsAPI.create(formData);
                toast.success('Tool created successfully');
            }
            setShowModal(false);
            resetForm();
            fetchTools();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save tool');
        }
    };

    const handleEdit = (tool) => {
        setEditingTool(tool);
        setFormData({
            name: tool.name,
            icon: tool.icon,
            status: tool.status,
            order: tool.order,
            isActive: tool.isActive
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this tool?')) return;

        try {
            await toolsAPI.delete(id);
            toast.success('Tool deleted successfully');
            fetchTools();
        } catch (error) {
            toast.error('Failed to delete tool');
        }
    };

    const resetForm = () => {
        setEditingTool(null);
        setFormData({
            name: '',
            icon: 'ri-code-line',
            status: 'Proficient',
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
                    <i className="ri-tools-line"></i> Tools Management
                </h1>
                <button className="btn btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
                    <i className="ri-add-line"></i>
                    Add Tool
                </button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Icon</th>
                            <th>Status</th>
                            <th>Order</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tools.map((tool) => (
                            <tr key={tool._id}>
                                <td><strong>{tool.name}</strong></td>
                                <td>
                                    <i className={tool.icon} style={{ fontSize: '24px', color: 'var(--green-400)' }}></i>
                                    <span style={{ marginLeft: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                                        {tool.icon}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge ${tool.status === 'Expert' ? 'badge-success' :
                                            tool.status === 'Advanced' ? 'badge-warning' : 'badge-secondary'
                                        }`}>
                                        {tool.status}
                                    </span>
                                </td>
                                <td>{tool.order}</td>
                                <td>
                                    <span className={`badge ${tool.isActive ? 'badge-success' : 'badge-danger'}`}>
                                        {tool.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            className="btn btn-secondary"
                                            style={{ padding: '6px 12px', fontSize: '12px' }}
                                            onClick={() => handleEdit(tool)}
                                        >
                                            <i className="ri-edit-line"></i>
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            style={{ padding: '6px 12px', fontSize: '12px' }}
                                            onClick={() => handleDelete(tool._id)}
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
                            <h2>{editingTool ? 'Edit Tool' : 'Add New Tool'}</h2>
                            <button className="close-btn" onClick={handleCloseModal}>
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Tool Name *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Icon (RemixIcon class) *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                        placeholder="ri-reactjs-line"
                                        required
                                    />
                                    <small style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                        Find icons at: <a href="https://remixicon.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green-400)' }}>remixicon.com</a>
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label>Proficiency Level *</label>
                                    <select
                                        className="form-control"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        required
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Proficient">Proficient</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Expert">Expert</option>
                                    </select>
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
                                    {editingTool ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
