import { useState, useEffect } from 'react';
import { blogAPI } from '../utils/api';
import { toast } from 'react-toastify';

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        preview: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        readTime: '',
        slug: '',
        isPublished: false,
        order: 0
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await blogAPI.getAll();
            setBlogs(response.data);
        } catch (error) {
            toast.error('Failed to load blogs');
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (title) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await blogAPI.update(editing._id, formData);
                toast.success('Blog updated');
            } else {
                await blogAPI.create(formData);
                toast.success('Blog created');
            }
            setShowModal(false);
            resetForm();
            fetchBlogs();
        } catch (error) {
            toast.error('Failed to save blog');
        }
    };

    const handleEdit = (blog) => {
        setEditing(blog);
        setFormData({
            title: blog.title,
            category: blog.category,
            preview: blog.preview,
            content: blog.content,
            date: new Date(blog.date).toISOString().split('T')[0],
            readTime: blog.readTime,
            slug: blog.slug,
            isPublished: blog.isPublished,
            order: blog.order
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete?')) return;
        try {
            await blogAPI.delete(id);
            toast.success('Deleted');
            fetchBlogs();
        } catch (error) {
            toast.error('Failed');
        }
    };

    const resetForm = () => {
        setEditing(null);
        setFormData({ title: '', category: '', preview: '', content: '', date: new Date().toISOString().split('T')[0], readTime: '', slug: '', isPublished: false, order: 0 });
    };

    if (loading) return <div className="loading"><i className="ri-loader-4-line" style={{ fontSize: '48px' }}></i></div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', color: 'var(--green-400)' }}><i className="ri-article-line"></i> Blog Posts</h1>
                <button className="btn btn-primary" onClick={() => { resetForm(); setShowModal(true); }}><i className="ri-add-line"></i> Add Post</button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr><th>Title</th><th>Category</th><th>Date</th><th>Published</th><th>Order</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog._id}>
                                <td><strong>{blog.title}</strong></td>
                                <td><span className="badge badge-secondary">{blog.category}</span></td>
                                <td>{new Date(blog.date).toLocaleDateString()}</td>
                                <td><span className={`badge ${blog.isPublished ? 'badge-success' : 'badge-warning'}`}>{blog.isPublished ? 'Published' : 'Draft'}</span></td>
                                <td>{blog.order}</td>
                                <td>
                                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', marginRight: '8px' }} onClick={() => handleEdit(blog)}><i className="ri-edit-line"></i></button>
                                    <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleDelete(blog._id)}><i className="ri-delete-bin-line"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => { setShowModal(false); resetForm(); }}>
                    <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px' }}>
                        <div className="modal-header">
                            <h2>{editing ? 'Edit' : 'Add'} Blog Post</h2>
                            <button className="close-btn" onClick={() => { setShowModal(false); resetForm(); }}><i className="ri-close-line"></i></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Title *</label>
                                    <input type="text" className="form-control" value={formData.title} onChange={(e) => { setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) }); }} required />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                                    <div className="form-group">
                                        <label>Category *</label>
                                        <input type="text" className="form-control" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Date *</label>
                                        <input type="date" className="form-control" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Read Time</label>
                                        <input type="text" className="form-control" value={formData.readTime} onChange={(e) => setFormData({ ...formData, readTime: e.target.value })} placeholder="10 min read" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Slug *</label>
                                    <input type="text" className="form-control" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} required />
                                    <small style={{ color: 'var(--text-secondary)' }}>Auto-generated from title</small>
                                </div>
                                <div className="form-group">
                                    <label>Preview *</label>
                                    <textarea className="form-control" value={formData.preview} onChange={(e) => setFormData({ ...formData, preview: e.target.value })} rows={3} required />
                                </div>
                                <div className="form-group">
                                    <label>Content *</label>
                                    <textarea className="form-control" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={10} required />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div className="form-group">
                                        <label>Order</label>
                                        <input type="number" className="form-control" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                            <input type="checkbox" checked={formData.isPublished} onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })} style={{ width: 'auto' }} />
                                            Published
                                        </label>
                                    </div>
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
