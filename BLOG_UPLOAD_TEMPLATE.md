# 📝 Blog Post Upload Template for Admin Panel

This document provides a template and guidelines for creating blog posts via the admin panel at `https://admin.aadilkhan.site`.

---

## 📁 REQUIRED Fields

### 1. **Title** *(Required)*
- Clear, engaging headline
- Use action words or numbers when possible
- Keep under 70 characters for SEO
- Examples:
  - "Building a Portfolio Website with Next.js 15"
  - "5 Essential Security Practices for Web Developers"
  - "How I Deployed My MERN Stack App to a VPS"

### 2. **Slug** *(Required)*
- URL-friendly version of title
- All lowercase, hyphens instead of spaces
- No special characters
- Examples:
  - `building-portfolio-website-nextjs-15`
  - `essential-security-practices-web-developers`
  - `deploy-mern-stack-vps`

### 3. **Category** *(Required)*
- Single word or short phrase
- Examples:
  - `Full Stack`
  - `Backend`
  - `Frontend`
  - `Mobile Dev`
  - `DevOps`
  - `Security`
  - `E-commerce`
  - `WordPress`
  - `Tutorial`
  - `Case Study`

### 4. **Preview** *(Required)*
- 1-2 sentence summary for cards
- Should entice readers to click
- Max ~150 characters
- Example: "Complete guide to building a modern portfolio with Next.js, React, and a custom CMS backend."

### 5. **Read Time** *(Required)*
- Estimated reading time
- Format: "X min read"
- Calculate: ~200 words per minute
- Examples: "5 min read", "12 min read", "20 min read"

### 6. **Content** *(Required)*
- Full blog post content
- Supports Markdown formatting
- Include code blocks with syntax highlighting
- Use headings, lists, and emphasis

---

## 📁 OPTIONAL Fields

### 7. **Is Published**
- Toggle to make post visible
- Default: false (draft)
- Set to true when ready to publish

### 8. **Order**
- Controls display order
- Lower numbers appear first
- Default: 0

---

## ✍️ Content Formatting Guide

### Headings
```markdown
## Main Section
### Subsection
#### Sub-subsection
```

### Code Blocks
```markdown
```javascript
const example = "Hello World";
console.log(example);
```
```

### Lists
```markdown
- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2
```

### Emphasis
```markdown
**Bold text**
*Italic text*
`inline code`
```

### Links
```markdown
[Link text](https://example.com)
```

### Images (if supported)
```markdown
![Alt text](image-url)
```

---

## 📝 BLANK TEMPLATE (Copy & Fill)

```
BASIC INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Title:       [Your Blog Title]
Slug:        [url-friendly-title]
Category:    [Category Name]
Preview:     [1-2 sentence summary]
Read Time:   [X min read]
Published:   [true or false]
Order:       [0-99]

CONTENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Introduction

[Opening paragraph - hook the reader]

## [Section 1 Title]

[Content for section 1]

### [Subsection if needed]

[More detailed content]

## [Section 2 Title]

[Content for section 2]

## [Section 3 Title]

[Content for section 3]

## Key Takeaways

- [Takeaway 1]
- [Takeaway 2]
- [Takeaway 3]

## Conclusion

[Wrap up the article, call to action]

---

*[Optional: Author note or call to action]*
```

---

## 💡 Blog Post Best Practices

### Structure
1. **Hook** - Start with an engaging opening
2. **Problem** - Identify the challenge/topic
3. **Solution** - Provide value and insights
4. **Examples** - Use code, screenshots, or demos
5. **Conclusion** - Summarize and call to action

### Writing Tips
- Use short paragraphs (2-3 sentences max)
- Include code examples where relevant
- Add real-world applications
- Be conversational but professional
- Proofread for errors

### SEO Tips
- Include keywords naturally in title and content
- Use descriptive headings
- Keep preview compelling
- Choose relevant category

---

## 📊 Category Ideas

| Category | Topics |
|----------|--------|
| `Full Stack` | Complete project builds, architecture |
| `Frontend` | React, Next.js, CSS, UI/UX |
| `Backend` | Node.js, APIs, databases |
| `Mobile Dev` | Flutter, React Native, app development |
| `DevOps` | Deployment, CI/CD, server management |
| `Security` | Auth, encryption, best practices |
| `E-commerce` | Shopify, WooCommerce, payment integration |
| `Tutorial` | Step-by-step guides |
| `Case Study` | Project breakdowns |
| `Tips` | Quick tips and tricks |

---

## ⚠️ Common Mistakes to Avoid

- ❌ Empty or too-short preview
- ❌ Slug with spaces or special characters
- ❌ Missing category
- ❌ Forgetting to set isPublished to true
- ❌ Not estimating read time
- ❌ Walls of text without headings
- ❌ Code blocks without language specification
