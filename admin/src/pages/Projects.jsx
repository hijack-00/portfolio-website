import { useState, useEffect } from 'react';
import { projectsAPI } from '../utils/api';
import { toast } from 'react-toastify';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        longDescription: '',
        tech: [],
        github: '',
        link: '',
        linkType: 'website',
        status: 'Active',
        screenshot: '',
        additionalScreenshots: [],
        workDone: '',
        duration: '',
        completionTime: '',
        role: '',
        client: '',
        teamSize: '',
        challenges: '',
        learnings: '',
        features: [],
        order: 0,
        isActive: true
    });
    const [techInput, setTechInput] = useState('');
    const [featureInput, setFeatureInput] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [additionalFiles, setAdditionalFiles] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await projectsAPI.getAll();
            setProjects(response.data);
        } catch (error) {
            toast.error('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    const addTech = () => {
        if (techInput.trim() && !formData.tech.includes(techInput.trim())) {
            setFormData({
                ...formData,
                tech: [...formData.tech, techInput.trim()]
            });
            setTechInput('');
        }
    };

    const removeTech = (index) => {
        setFormData({
            ...formData,
            tech: formData.tech.filter((_, i) => i !== index)
        });
    };

    const addFeature = () => {
        if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
            setFormData({
                ...formData,
                features: [...formData.features, featureInput.trim()]
            });
            setFeatureInput('');
        }
    };

    const removeFeature = (index) => {
        setFormData({
            ...formData,
            features: formData.features.filter((_, i) => i !== index)
        });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleAdditionalFilesChange = (e) => {
        const files = Array.from(e.target.files);
        setAdditionalFiles(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submitData = new FormData();

            submitData.append('title', formData.title);
            submitData.append('description', formData.description);
            submitData.append('longDescription', formData.longDescription || '');
            submitData.append('tech', formData.tech.join(','));
            submitData.append('github', formData.github);
            submitData.append('link', formData.link);
            submitData.append('linkType', formData.linkType);
            submitData.append('status', formData.status);
            submitData.append('workDone', formData.workDone || '');
            submitData.append('duration', formData.duration || '');
            submitData.append('completionTime', formData.completionTime || '');
            submitData.append('role', formData.role || '');
            submitData.append('client', formData.client || '');
            submitData.append('teamSize', formData.teamSize || '');
            submitData.append('challenges', formData.challenges || '');
            submitData.append('learnings', formData.learnings || '');
            submitData.append('features', formData.features.join(','));
            submitData.append('order', formData.order);
            submitData.append('isActive', formData.isActive);

            // Upload main screenshot
            if (selectedFile) {
                submitData.append('screenshot', selectedFile);
            }

            // Upload additional screenshots
            if (additionalFiles.length > 0) {
                const additionalUrls = [];
                toast.info('Uploading additional screenshots...');

                for (const file of additionalFiles) {
                    const fileData = new FormData();
                    fileData.append('file', file);
                    fileData.append('folder', 'screenshots');

                    const uploadResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/upload`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: fileData
                    });

                    if (uploadResponse.ok) {
                        const result = await uploadResponse.json();
                        additionalUrls.push(result.url);
                    }
                }

                submitData.append('additionalScreenshots', JSON.stringify(additionalUrls));
            }

            if (editingProject) {
                await projectsAPI.update(editingProject._id, submitData);
                toast.success('Project updated successfully');
            } else {
                await projectsAPI.create(submitData);
                toast.success('Project created successfully');
            }

            setShowModal(false);
            resetForm();
            fetchProjects();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save project');
        }
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            longDescription: project.longDescription || '',
            tech: project.tech || [],
            github: project.github,
            link: project.link,
            linkType: project.linkType,
            status: project.status,
            screenshot: project.screenshot,
            additionalScreenshots: project.additionalScreenshots || [],
            workDone: project.workDone || '',
            duration: project.duration || '',
            completionTime: project.completionTime || '',
            role: project.role || '',
            client: project.client || '',
            teamSize: project.teamSize || '',
            challenges: project.challenges || '',
            learnings: project.learnings || '',
            features: project.features || [],
            order: project.order,
            isActive: project.isActive
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            await projectsAPI.delete(id);
            toast.success('Project deleted successfully');
            fetchProjects();
        } catch (error) {
            toast.error('Failed to delete project');
        }
    };

    const resetForm = () => {
        setEditingProject(null);
        setFormData({
            title: '',
            description: '',
            longDescription: '',
            tech: [],
            github: '',
            link: '',
            linkType: 'website',
            status: 'Active',
            screenshot: '',
            additionalScreenshots: [],
            workDone: '',
            duration: '',
            completionTime: '',
            role: '',
            client: '',
            teamSize: '',
            challenges: '',
            learnings: '',
            features: [],
            order: 0,
            isActive: true
        });
        setTechInput('');
        setFeatureInput('');
        setSelectedFile(null);
        setAdditionalFiles([]);
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
                    <i className="ri-folder-line"></i> Projects Management
                </h1>
                <button className="btn btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
                    <i className="ri-add-line"></i>
                    Add Project
                </button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Technologies</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Order</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project._id}>
                                <td>
                                    <strong>{project.title}</strong>
                                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                        {project.description.substring(0, 50)}...
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '200px' }}>
                                        {project.tech.slice(0, 3).map((tech, i) => (
                                            <span key={i} className="badge badge-success" style={{ fontSize: '10px' }}>
                                                {tech}
                                            </span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span className="badge badge-secondary" style={{ fontSize: '10px' }}>
                                                +{project.tech.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <span className="badge badge-secondary">
                                        {project.linkType}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge ${project.status === 'Deployed' || project.status === 'Active' ? 'badge-success' :
                                        project.status === 'Development' ? 'badge-warning' : 'badge-secondary'
                                        }`}>
                                        {project.status}
                                    </span>
                                </td>
                                <td>{project.order}</td>
                                <td>
                                    <span className={`badge ${project.isActive ? 'badge-success' : 'badge-danger'}`}>
                                        {project.isActive ? 'Yes' : 'No'}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            className="btn btn-secondary"
                                            style={{ padding: '6px 12px', fontSize: '12px' }}
                                            onClick={() => handleEdit(project)}
                                        >
                                            <i className="ri-edit-line"></i>
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            style={{ padding: '6px 12px', fontSize: '12px' }}
                                            onClick={() => handleDelete(project._id)}
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
                    <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div className="modal-header">
                            <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                            <button className="close-btn" onClick={handleCloseModal}>
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                {/* Basic Information */}
                                <h3 style={{ color: 'var(--green-400)', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                                    <i className="ri-file-list-line"></i> Basic Information
                                </h3>

                                <div className="form-group">
                                    <label>Project Title *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Short Description (for cards) *</label>
                                    <textarea
                                        className="form-control"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={2}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Detailed Description (for details page)</label>
                                    <textarea
                                        className="form-control"
                                        value={formData.longDescription}
                                        onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                                        rows={6}
                                        placeholder="Enter detailed project description, objectives, and overview..."
                                    />
                                </div>

                                {/* Tech Stack */}
                                <div className="form-group">
                                    <label>Technologies Used</label>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={techInput}
                                            onChange={(e) => setTechInput(e.target.value)}
                                            placeholder="Enter technology"
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                                        />
                                        <button type="button" className="btn btn-secondary" onClick={addTech}>
                                            <i className="ri-add-line"></i>
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {formData.tech.map((tech, index) => (
                                            <span key={index} className="badge badge-success" style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                cursor: 'pointer',
                                                padding: '6px 10px'
                                            }} onClick={() => removeTech(index)}>
                                                {tech}
                                                <i className="ri-close-line"></i>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Links */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div className="form-group">
                                        <label>GitHub URL *</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            value={formData.github}
                                            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Project Link</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.link}
                                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                            placeholder="Website URL or APK path"
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                                    <div className="form-group">
                                        <label>Link Type *</label>
                                        <select
                                            className="form-control"
                                            value={formData.linkType}
                                            onChange={(e) => setFormData({ ...formData, linkType: e.target.value })}
                                        >
                                            <option value="website">Website</option>
                                            <option value="apk">APK</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Status *</label>
                                        <select
                                            className="form-control"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Deployed">Deployed</option>
                                            <option value="Development">Development</option>
                                            <option value="Beta">Beta</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Maintained">Maintained</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Order</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={formData.order}
                                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                {/* Detailed Information */}
                                <h3 style={{ color: 'var(--green-400)', marginTop: '32px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                                    <i className="ri-file-info-line"></i> Detailed Information
                                </h3>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div className="form-group">
                                        <label>Role/Position</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            placeholder="e.g., Full Stack Developer"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Client/Company</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.client}
                                            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                            placeholder="e.g., Personal Project or Client Name"
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                                    <div className="form-group">
                                        <label>Team Size</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.teamSize}
                                            onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                                            placeholder="e.g., Solo or 1-5"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Duration</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            placeholder="e.g., 3 months"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Completion Time</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.completionTime}
                                            onChange={(e) => setFormData({ ...formData, completionTime: e.target.value })}
                                            placeholder="e.g., Ongoing or 120 hours"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Work Done</label>
                                    <textarea
                                        className="form-control"
                                        value={formData.workDone}
                                        onChange={(e) => setFormData({ ...formData, workDone: e.target.value })}
                                        rows={4}
                                        placeholder="Describe your responsibilities and what you built..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Key Features</label>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={featureInput}
                                            onChange={(e) => setFeatureInput(e.target.value)}
                                            placeholder="Enter a key feature"
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                        />
                                        <button type="button" className="btn btn-secondary" onClick={addFeature}>
                                            <i className="ri-add-line"></i>
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {formData.features.map((feature, index) => (
                                            <span key={index} className="badge badge-info" style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                cursor: 'pointer',
                                                padding: '6px 10px'
                                            }} onClick={() => removeFeature(index)}>
                                                {feature}
                                                <i className="ri-close-line"></i>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Challenges Faced</label>
                                    <textarea
                                        className="form-control"
                                        value={formData.challenges}
                                        onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                                        rows={3}
                                        placeholder="Describe technical challenges and how you solved them..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Learnings & Takeaways</label>
                                    <textarea
                                        className="form-control"
                                        value={formData.learnings}
                                        onChange={(e) => setFormData({ ...formData, learnings: e.target.value })}
                                        rows={3}
                                        placeholder="What did you learn from this project?"
                                    />
                                </div>

                                {/* Media */}
                                <h3 style={{ color: 'var(--green-400)', marginTop: '32px', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
                                    <i className="ri-image-line"></i> Media & Screenshots
                                </h3>


                                <div className="form-group">
                                    <label>Main Screenshot (for project cards)</label>

                                    {/* Drag and Drop Zone */}
                                    <div
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            e.currentTarget.style.borderColor = 'var(--green-400)';
                                            e.currentTarget.style.backgroundColor = 'var(--green-900-10)';
                                        }}
                                        onDragLeave={(e) => {
                                            e.preventDefault();
                                            e.currentTarget.style.borderColor = 'var(--border)';
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            e.currentTarget.style.borderColor = 'var(--border)';
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
                                            if (files.length > 0) {
                                                setSelectedFile(files[0]); // Only take first file
                                            }
                                        }}
                                        style={{
                                            border: '2px dashed var(--border)',
                                            borderRadius: '4px',
                                            padding: '20px',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            marginBottom: '12px'
                                        }}
                                        onClick={() => document.getElementById('main-screenshot-input').click()}
                                    >
                                        <i className="ri-upload-cloud-line" style={{ fontSize: '36px', color: 'var(--green-400)', marginBottom: '8px' }}></i>
                                        <p style={{ color: 'var(--text-primary)', marginBottom: '4px', fontSize: '14px' }}>
                                            <strong>Drag & drop main screenshot</strong> or click to browse
                                        </p>
                                        <small style={{ color: 'var(--text-secondary)' }}>
                                            This will be shown on project cards
                                        </small>
                                    </div>

                                    <input
                                        id="main-screenshot-input"
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />

                                    {/* Image Preview */}
                                    {selectedFile && (
                                        <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                <strong style={{ color: 'var(--green-400)', fontSize: '14px' }}>
                                                    Preview
                                                </strong>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    style={{ padding: '4px 12px', fontSize: '12px' }}
                                                    onClick={() => setSelectedFile(null)}
                                                >
                                                    <i className="ri-delete-bin-line"></i> Remove
                                                </button>
                                            </div>
                                            <div style={{ border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden', maxWidth: '300px' }}>
                                                <img
                                                    src={URL.createObjectURL(selectedFile)}
                                                    alt="Main screenshot preview"
                                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                                />
                                                <div style={{ padding: '8px', backgroundColor: 'var(--bg-secondary)', fontSize: '11px', color: 'var(--text-secondary)' }}>
                                                    <i className="ri-file-line"></i> {selectedFile.name}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Current Screenshot (from database) */}
                                    {!selectedFile && formData.screenshot && (
                                        <div style={{ marginTop: '12px', padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px' }}>
                                            <small style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                                                <i className="ri-information-line"></i> Current screenshot uploaded
                                            </small>
                                            <small style={{ color: 'var(--green-400)', fontSize: '11px', wordBreak: 'break-all' }}>
                                                {formData.screenshot.substring(formData.screenshot.lastIndexOf('/') + 1)}
                                            </small>
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label>Additional Screenshots (for details page)</label>

                                    {/* Drag and Drop Zone */}
                                    <div
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            e.currentTarget.style.borderColor = 'var(--green-400)';
                                            e.currentTarget.style.backgroundColor = 'var(--green-900-10)';
                                        }}
                                        onDragLeave={(e) => {
                                            e.preventDefault();
                                            e.currentTarget.style.borderColor = 'var(--border)';
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            e.currentTarget.style.borderColor = 'var(--border)';
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
                                            if (files.length > 0) {
                                                setAdditionalFiles(prev => [...prev, ...files]);
                                            }
                                        }}
                                        style={{
                                            border: '2px dashed var(--border)',
                                            borderRadius: '4px',
                                            padding: '24px',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            marginBottom: '16px'
                                        }}
                                        onClick={() => document.getElementById('additional-screenshots-input').click()}
                                    >
                                        <i className="ri-upload-cloud-2-line" style={{ fontSize: '48px', color: 'var(--green-400)', marginBottom: '8px' }}></i>
                                        <p style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>
                                            <strong>Drag & drop images here</strong> or click to browse
                                        </p>
                                        <small style={{ color: 'var(--text-secondary)' }}>
                                            Upload multiple screenshots for project details gallery
                                        </small>
                                    </div>

                                    <input
                                        id="additional-screenshots-input"
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        multiple
                                        onChange={handleAdditionalFilesChange}
                                        style={{ display: 'none' }}
                                    />

                                    {/* Image Previews */}
                                    {additionalFiles.length > 0 && (
                                        <div style={{ marginTop: '16px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                                <strong style={{ color: 'var(--green-400)' }}>
                                                    {additionalFiles.length} image(s) ready to upload
                                                </strong>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    style={{ padding: '4px 12px', fontSize: '12px' }}
                                                    onClick={() => setAdditionalFiles([])}
                                                >
                                                    <i className="ri-delete-bin-line"></i> Clear All
                                                </button>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' }}>
                                                {additionalFiles.map((file, idx) => (
                                                    <div key={idx} style={{ position: 'relative', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                                                        <img
                                                            src={URL.createObjectURL(file)}
                                                            alt={`Preview ${idx + 1}`}
                                                            style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setAdditionalFiles(prev => prev.filter((_, i) => i !== idx))}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '4px',
                                                                right: '4px',
                                                                background: 'rgba(0, 0, 0, 0.7)',
                                                                border: 'none',
                                                                borderRadius: '50%',
                                                                width: '24px',
                                                                height: '24px',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                color: '#fff'
                                                            }}
                                                        >
                                                            <i className="ri-close-line"></i>
                                                        </button>
                                                        <div style={{ padding: '4px', fontSize: '10px', color: 'var(--text-secondary)', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                            {file.name}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Current Screenshots (from database) */}
                                    {formData.additionalScreenshots && formData.additionalScreenshots.length > 0 && (
                                        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px' }}>
                                            <small style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                                                <i className="ri-information-line"></i> Currently uploaded: {formData.additionalScreenshots.length} screenshot(s)
                                            </small>
                                            <small style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>
                                                Note: New uploads will replace existing screenshots
                                            </small>
                                        </div>
                                    )}
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
                                    {editingProject ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
