# Admin Panel Development Guide

## 🎯 Overview

The admin panel is a React application built with Vite. The **Skills page** (`admin/src/pages/Skills.jsx`) is fully implemented and serves as a **template** for building the other pages.

All placeholder pages have been created. Follow this guide to implement them fully.

## 📋 Implementation Pattern

All CRUD pages follow the same pattern:

### 1. State Management
```javascript
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);
const [showModal, setShowModal] = useState(false);
const [editingItem, setEditingItem] = useState(null);
const [formData, setFormData] = useState({ /* initial values */ });
```

### 2. Data Fetching
```javascript
useEffect(() => {
  fetchItems();
}, []);

const fetchItems = async () => {
  try {
    const response = await itemsAPI.getAll();
    setItems(response.data);
  } catch (error) {
    toast.error('Failed to load items');
  } finally {
    setLoading(false);
  }
};
```

### 3. CRUD Operations
```javascript
// Create/Update
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editingItem) {
      await itemsAPI.update(editingItem._id, formData);
      toast.success('Updated successfully');
    } else {
      await itemsAPI.create(formData);
      toast.success('Created successfully');
    }
    setShowModal(false);
    resetForm();
    fetchItems();
  } catch (error) {
    toast.error('Failed to save');
  }
};

// Delete
const handleDelete = async (id) => {
  if (!confirm('Are you sure?')) return;
  try {
    await itemsAPI.delete(id);
    toast.success('Deleted successfully');
    fetchItems();
  } catch (error) {
    toast.error('Failed to delete');
  }
};
```

### 4. Modal Form
```javascript
{showModal && (
  <div className="modal-overlay" onClick={handleCloseModal}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2>{editingItem ? 'Edit' : 'Add New'}</h2>
        <button className="close-btn" onClick={handleCloseModal}>
          <i className="ri-close-line"></i>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          {/* Form fields */}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {editingItem ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
```

## 📝 Page-by-Page Implementation

### Tools Page (Similar to Skills)

**Copy Skills.jsx and modify:**

1. **Import**: `import { toolsAPI } from '../utils/api';`
2. **Form State**:
```javascript
const [formData, setFormData] = useState({
  name: '',
  icon: 'ri-code-line',
  status: 'Proficient',
  order: 0,
  isActive: true
});
```
3. **Form Fields**:
   - Name (text input)
   - Icon (text input - RemixIcon class name)
   - Status (select: Beginner, Proficient, Advanced, Expert)
   - Order (number)
   - Active (checkbox)

### Profile Page

**Type**: Single record (not a list)

```javascript
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
    githubUrl: '',
    linkedinUrl: '',
    resumeUrl: '',
    footerText: '',
    footerTagline: '',
    availability: '',
    responseTime: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await profileAPI.get();
      setFormData(response.data);
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
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  // Typing texts array management
  const addTypingText = () => {
    setFormData({
      ...formData,
      typingTexts: [...formData.typingTexts, '']
    });
  };

  const updateTypingText = (index, value) => {
    const newTexts = [...formData.typingTexts];
    newTexts[index] = value;
    setFormData({ ...formData, typingTexts: newTexts });
  };

  const removeTypingText = (index) => {
    setFormData({
      ...formData,
      typingTexts: formData.typingTexts.filter((_, i) => i !== index)
    });
  };

  return (
    <div>
      <h1>Profile Settings</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Typing Texts Array */}
          <div className="form-group">
            <label>Typing Animation Texts</label>
            {formData.typingTexts.map((text, index) => (
              <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
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
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addTypingText}>
              <i className="ri-add-line"></i> Add Text
            </button>
          </div>

          {/* ...other fields */}

          <button type="submit" className="btn btn-primary">
            <i className="ri-save-line"></i> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
```

### About Page

**Type**: Single record with 4 text fields

```javascript
const [formData, setFormData] = useState({
  whoami: '',
  expertise: '',
  services: '',
  mission: ''
});
```

Use `aboutAPI` from utils/api.js. Similar structure to Profile page.

### Projects Page (With File Upload)

**Key Difference**: File upload for screenshots

```javascript
import { useState, useEffect } from 'react';
import { projectsAPI } from '../utils/api';
import { toast } from 'react-toastify';

const [formData, setFormData] = useState({
  title: '',
  description: '',
  tech: [],
  github: '',
  link: '',
  linkType: 'website',
  status: 'Active',
  screenshot: '',
  order: 0,
  isActive: true
});
const [selectedFile, setSelectedFile] = useState(null);

// Tech array management
const [techInput, setTechInput] = useState('');

const addTech = () => {
  if (techInput.trim()) {
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

// File handling
const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const submitData = new FormData();
    
    // Append all fields
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('tech', formData.tech.join(','));
    submitData.append('github', formData.github);
    submitData.append('link', formData.link);
    submitData.append('linkType', formData.linkType);
    submitData.append('status', formData.status);
    submitData.append('order', formData.order);
    submitData.append('isActive', formData.isActive);
    
    // Append file if selected
    if (selectedFile) {
      submitData.append('screenshot', selectedFile);
    }
    
    if (editingProject) {
      await projectsAPI.update(editingProject._id, submitData);
      toast.success('Project updated');
    } else {
      await projectsAPI.create(submitData);
      toast.success('Project created');
    }
    
    setShowModal(false);
    resetForm();
    fetchProjects();
  } catch (error) {
    toast.error('Failed to save project');
  }
};

// In form:
<div className="form-group">
  <label>Screenshot</label>
  <input
    type="file"
    className="form-control"
    accept="image/*"
    onChange={handleFileChange}
  />
  {formData.screenshot && (
    <div style={{ marginTop: '8px' }}>
      <img 
        src={formData.screenshot} 
        alt="Current" 
        style={{ maxWidth: '200px', borderRadius: '4px' }}
      />
    </div>
  )}
</div>

// Tech stack management
<div className="form-group">
  <label>Tech Stack</label>
  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
    <input
      type="text"
      className="form-control"
      value={techInput}
      onChange={(e) => setTechInput(e.target.value)}
      placeholder="Enter technology"
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
        cursor: 'pointer'
      }} onClick={() => removeTech(index)}>
        {tech}
        <i className="ri-close-line"></i>
      </span>
    ))}
  </div>
</div>
```

### Certifications Page

Similar to Skills, with topics array:

```javascript
const [formData, setFormData] = useState({
  title: '',
  description: '',
  progress: 0,
  status: 'In Progress',
  topics: [],
  order: 0,
  isActive: true
});

// Topics management (same pattern as tech in Projects)
```

### Blog Page

```javascript
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

// Auto-generate slug from title
const generateSlug = (title) => {
  return title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// When title changes:
onChange={(e) => {
  const newTitle = e.target.value;
  setFormData({
    ...formData,
    title: newTitle,
    slug: generateSlug(newTitle)
  });
}}

// Content editor (simple textarea or Monaco Editor)
<div className="form-group">
  <label>Content (Markdown supported)</label>
  <textarea
    className="form-control"
    value={formData.content}
    onChange={(e) => setFormData({...formData, content: e.target.value})}
    rows={15}
  />
</div>
```

### Contact Page (Read-only list with actions)

```javascript
import { useState, useEffect } from 'react';
import { contactAPI } from '../utils/api';
import { toast } from 'react-toastify';

export default function Contact() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchMessages = async () => {
    try {
      const response = await contactAPI.getAll();
      setMessages(response.data);
    } catch (error) {
      toast.error('Failed to load messages');
    }
  };

  const viewMessage = async (id) => {
    try {
      const response = await contactAPI.get(id);
      setSelectedMessage(response.data);
      setShowModal(true);
    } catch (error) {
      toast.error('Failed to load message');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await contactAPI.updateStatus(id, { status, isRead: true });
      toast.success('Status updated');
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

  return (
    <div>
      <h1>Contact Messages</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id} style={{ 
                background: msg.isRead ? 'transparent' : 'rgba(74, 222, 128, 0.05)' 
              }}>
                <td>
                  {!msg.isRead && <i className="ri-mail-line" style={{ marginRight: '8px', color: 'var(--green-400)' }}></i>}
                  <strong>{msg.name}</strong>
                </td>
                <td>{msg.email}</td>
                <td>{msg.subject}</td>
                <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                <td>
                  <span className={`badge badge-${
                    msg.status === 'replied' ? 'success' :
                    msg.status === 'pending' ? 'warning' : 'secondary'
                  }`}>
                    {msg.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '12px', marginRight: '8px' }}
                    onClick={() => viewMessage(msg._id)}
                  >
                    <i className="ri-eye-line"></i>
                  </button>
                  <button 
                    className="btn btn-danger"
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                    onClick={() => deleteMessage(msg._id)}
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Message Modal */}
      {showModal && selectedMessage && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Message from {selectedMessage.name}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <i className="ri-close-line"></i>
              </button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: '16px' }}>
                <strong>Email:</strong> {selectedMessage.email}
              </div>
              <div style={{ marginBottom: '16px' }}>
                <strong>Subject:</strong> {selectedMessage.subject}
              </div>
              <div style={{ marginBottom: '16px' }}>
                <strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}
              </div>
              <div style={{ marginBottom: '16px' }}>
                <strong>Message:</strong>
                <p style={{ 
                  marginTop: '8px', 
                  padding: '12px', 
                  background: 'var(--bg-darker)', 
                  borderRadius: '4px',
                  whiteSpace: 'pre-wrap'
                }}>
                  {selectedMessage.message}
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  updateStatus(selectedMessage._id, 'pending');
                  setShowModal(false);
                }}
              >
                Mark Pending
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  updateStatus(selectedMessage._id, 'replied');
                  setShowModal(false);
                }}
              >
                Mark Replied
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### Dashboard Page (Stats & Overview)

```javascript
import { useState, useEffect } from 'react';
import { skillsAPI, toolsAPI, projectsAPI, blogAPI, contactAPI } from '../utils/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    skills: 0,
    tools: 0,
    projects: 0,
    blogs: 0,
    messages: 0
  });
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [skills, tools, projects, blogs, messages] = await Promise.all([
        skillsAPI.getAll(),
        toolsAPI.getAll(),
        projectsAPI.getAll(),
        blogAPI.getAll(),
        contactAPI.getAll()
      ]);

      setStats({
        skills: skills.data.length,
        tools: tools.data.length,
        projects: projects.data.length,
        blogs: blogs.data.length,
        messages: messages.data.length
      });

      setRecentMessages(messages.data.slice(0, 5));
    } catch (error) {
      console.error('Failed to load stats');
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        <div className="card">
          <i className="ri-code-s-slash-line" style={{ fontSize: '32px', color: 'var(--green-400)' }}></i>
          <h2 style={{ fontSize: '36px', margin: '12px 0' }}>{stats.skills}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Skills</p>
        </div>
        
        <div className="card">
          <i className="ri-tools-line" style={{ fontSize: '32px', color: 'var(--green-400)' }}></i>
          <h2 style={{ fontSize: '36px', margin: '12px 0' }}>{stats.tools}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Tools</p>
        </div>
        
        <div className="card">
          <i className="ri-folder-line" style={{ fontSize: '32px', color: 'var(--green-400)' }}></i>
          <h2 style={{ fontSize: '36px', margin: '12px 0' }}>{stats.projects}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Projects</p>
        </div>
        
        <div className="card">
          <i className="ri-article-line" style={{ fontSize: '32px', color: 'var(--green-400)' }}></i>
          <h2 style={{ fontSize: '36px', margin: '12px 0' }}>{stats.blogs}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Blog Posts</p>
        </div>
        
        <div className="card">
          <i className="ri-mail-line" style={{ fontSize: '32px', color: 'var(--green-400)' }}></i>
          <h2 style={{ fontSize: '36px', margin: '12px 0' }}>{stats.messages}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Messages</p>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="card">
        <h2 style={{ marginBottom: '16px' }}>Recent Messages</h2>
        {recentMessages.map((msg) => (
          <div key={msg._id} style={{ 
            padding: '12px', 
            border: '1px solid var(--border-color)', 
            borderRadius: '4px',
            marginBottom: '8px'
          }}>
            <strong>{msg.name}</strong> - {msg.subject}
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {new Date(msg.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🎨 Styling Tips

All components use CSS variables defined in `index.css`:
- `var(--bg-dark)` - Main background
- `var(--bg-card)` - Card background
- `var(--green-400)` - Primary green
- `var(--text-primary)` - Main text color
- `var(--text-secondary)` - Secondary text
- `var(--border-color)` - Borders

## 🚀 Quick Start

1. **Start with Skills.jsx** - It's complete and functional
2. **Copy for Tools** - Very similar structure
3. **Implement Profile & About** - Single record forms
4. **Build Projects** - Add file upload
5. **Create Certifications & Blog** - Similar to Skills
6. **Finish with Contact & Dashboard** - Read-only views

## 📦 Testing

After implementing each page:
1. Test create operation
2. Test update operation
3. Test delete operation
4. Verify data persists in MongoDB
5. Check file uploads (for Projects)
6. Test form validation

---

All placeholder pages are ready. Use Skills.jsx as your reference!
