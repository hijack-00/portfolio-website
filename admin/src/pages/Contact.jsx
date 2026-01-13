import { useState, useEffect } from 'react';
import { contactAPI } from '../utils/api';
import { toast } from 'react-toastify';

export default function Contact() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await contactAPI.getAll();
            setMessages(response.data);
        } catch (error) {
            toast.error('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    const viewMessage = async (id) => {
        try {
            const response = await contactAPI.get(id);
            setSelectedMessage(response.data);
            setShowModal(true);
            fetchMessages(); // Refresh to update read status
        } catch (error) {
            toast.error('Failed to load message');
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await contactAPI.updateStatus(id, { status, isRead: true });
            toast.success('Status updated');
            setShowModal(false);
            fetchMessages();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const deleteMessage = async (id) => {
        if (!confirm('Delete this message?')) return;
        try {
            await contactAPI.delete(id);
            toast.success('Message deleted');
            fetchMessages();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    if (loading) return <div className="loading"><i className="ri-loader-4-line" style={{ fontSize: '48px' }}></i></div>;

    return (
        <div>
            <h1 style={{ fontSize: '32px', color: 'var(--green-400)', marginBottom: '32px' }}>
                <i className="ri-mail-line"></i> Contact Messages ({messages.filter(m => !m.isRead).length} unread)
            </h1>

            <div className="table-container">
                <table>
                    <thead>
                        <tr><th>Name</th><th>Email</th><th>Subject</th><th>Date</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {messages.map((msg) => (
                            <tr key={msg._id} style={{ background: msg.isRead ? 'transparent' : 'rgba(74, 222, 128, 0.05)' }}>
                                <td>
                                    {!msg.isRead && <i className="ri-mail-line" style={{ marginRight: '8px', color: 'var(--green-400)' }}></i>}
                                    <strong>{msg.name}</strong>
                                </td>
                                <td>{msg.email}</td>
                                <td>{msg.subject}</td>
                                <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <span className={`badge badge-${msg.status === 'replied' ? 'success' :
                                            msg.status === 'pending' ? 'warning' : 'secondary'
                                        }`}>
                                        {msg.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', marginRight: '8px' }} onClick={() => viewMessage(msg._id)}>
                                        <i className="ri-eye-line"></i>
                                    </button>
                                    <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => deleteMessage(msg._id)}>
                                        <i className="ri-delete-bin-line"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && selectedMessage && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Message from {selectedMessage.name}</h2>
                            <button className="close-btn" onClick={() => setShowModal(false)}><i className="ri-close-line"></i></button>
                        </div>
                        <div className="modal-body">
                            <div style={{ marginBottom: '16px' }}><strong>Email:</strong> {selectedMessage.email}</div>
                            <div style={{ marginBottom: '16px' }}><strong>Subject:</strong> {selectedMessage.subject}</div>
                            <div style={{ marginBottom: '16px' }}><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</div>
                            <div style={{ marginBottom: '16px' }}>
                                <strong>Message:</strong>
                                <p style={{ marginTop: '8px', padding: '12px', background: 'var(--bg-darker)', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
                                    {selectedMessage.message}
                                </p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => { updateStatus(selectedMessage._id, 'pending'); }}>Mark Pending</button>
                            <button className="btn btn-primary" onClick={() => { updateStatus(selectedMessage._id, 'replied'); }}>Mark Replied</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
