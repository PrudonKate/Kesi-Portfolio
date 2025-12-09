# Portfolio Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Your Portfolio Website                   │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Public     │  │    Admin     │  │   Content    │     │
│  │   Pages      │  │    Panel     │  │  Management  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Supabase Backend                        │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │     Auth     │  │  PostgreSQL  │  │   Storage    │     │
│  │   (Login)    │  │  (Database)  │  │   (Images)   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend (React)

```
src/
├── components/              # Reusable UI components
│   ├── Hero/               # Landing section
│   ├── Navbar/             # Navigation bar
│   ├── Footer/             # Footer section
│   └── Layout/             # Page wrapper
│
├── pages/                  # Route pages
│   ├── Public Pages
│   │   ├── About.jsx       # About page
│   │   ├── Skills.jsx      # Skills showcase
│   │   ├── Experience.jsx  # Work history
│   │   ├── Projects.jsx    # Portfolio items
│   │   └── Contact.jsx     # Contact form
│   │
│   └── Admin Pages
│       ├── AdminLogin.jsx      # Login page
│       ├── AdminSignup.jsx     # Registration
│       ├── AdminDashboard.jsx  # Admin home
│       ├── EditHero.jsx        # Edit hero section
│       ├── EditAbout.jsx       # Edit about section
│       ├── EditSkills.jsx      # Edit skills
│       └── EditProjects.jsx    # Edit projects
│
├── config/                 # Configuration
│   ├── supabase.js        # Supabase client
│   └── emailjs.js         # Email service
│
├── utils/                  # Helper functions
│   └── imageUpload.js     # Image utilities
│
└── styles/                 # CSS files
    ├── AdminLogin.css
    ├── AdminDashboard.css
    ├── AdminEdit.css
    └── Experience.css
```

## Data Flow

### Public Pages (Read-Only)

```
User visits page
      │
      ▼
React Component loads
      │
      ▼
Fetch data from Supabase
      │
      ▼
Display content to user
```

### Admin Panel (Read-Write)

```
Admin logs in
      │
      ▼
Supabase Auth validates
      │
      ▼
Access admin dashboard
      │
      ▼
Edit content
      │
      ▼
Upload images (if needed)
      │
      ▼
Save to Supabase database
      │
      ▼
Content updated on public pages
```

## Database Schema

### Content Table

```sql
content
├── id (UUID)              # Unique identifier
├── section (TEXT)         # Section name (hero, about, etc.)
├── content (JSONB)        # Flexible JSON data
├── created_at (TIMESTAMP) # Creation time
└── updated_at (TIMESTAMP) # Last update time
```

### Example Data Structure

```json
{
  "section": "hero",
  "content": {
    "title": "Hi, I'm Kate Carmel Prudon",
    "subtitle": "Frontend Developer | Design & Video Enthusiast",
    "description": "Designing and developing with creativity at the core.",
    "profileImage": "https://supabase.co/storage/...",
    "ctaText": "Download CV →",
    "ctaLink": "/resume.pdf"
  }
}
```

## Storage Structure

```
portfolio-images/
├── profile/
│   ├── 1234567890_abc123.jpg
│   └── 1234567891_def456.png
├── projects/
│   ├── 1234567892_ghi789.jpg
│   └── 1234567893_jkl012.png
└── images/
    └── 1234567894_mno345.webp
```

## Security Architecture

### Row Level Security (RLS)

```
┌─────────────────────────────────────────┐
│         Database Access Control          │
├─────────────────────────────────────────┤
│                                          │
│  Public Users (Not Logged In)           │
│  ✅ Can READ all content                │
│  ❌ Cannot WRITE                        │
│                                          │
│  Authenticated Users (Logged In)        │
│  ✅ Can READ all content                │
│  ✅ Can WRITE/UPDATE content            │
│                                          │
└─────────────────────────────────────────┘
```

### Storage Policies

```
┌─────────────────────────────────────────┐
│         Storage Access Control           │
├─────────────────────────────────────────┤
│                                          │
│  Public Users                            │
│  ✅ Can VIEW images                     │
│  ❌ Cannot UPLOAD/DELETE                │
│                                          │
│  Authenticated Users                     │
│  ✅ Can VIEW images                     │
│  ✅ Can UPLOAD images                   │
│  ✅ Can DELETE images                   │
│                                          │
└─────────────────────────────────────────┘
```

## Authentication Flow

```
┌──────────────┐
│ User visits  │
│ /admin/login │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ Enter email &    │
│ password         │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Supabase Auth    │
│ validates        │
└──────┬───────────┘
       │
       ├─── ✅ Valid ────────┐
       │                     │
       │                     ▼
       │              ┌──────────────┐
       │              │ Create       │
       │              │ session      │
       │              └──────┬───────┘
       │                     │
       │                     ▼
       │              ┌──────────────┐
       │              │ Redirect to  │
       │              │ dashboard    │
       │              └──────────────┘
       │
       └─── ❌ Invalid ──────┐
                             │
                             ▼
                      ┌──────────────┐
                      │ Show error   │
                      │ message      │
                      └──────────────┘
```

## Image Upload Flow

```
┌──────────────┐
│ Admin selects│
│ image file   │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ Validate file    │
│ (type, size)     │
└──────┬───────────┘
       │
       ├─── ✅ Valid ────────┐
       │                     │
       │                     ▼
       │              ┌──────────────────┐
       │              │ Upload to        │
       │              │ Supabase Storage │
       │              └──────┬───────────┘
       │                     │
       │                     ▼
       │              ┌──────────────────┐
       │              │ Get public URL   │
       │              └──────┬───────────┘
       │                     │
       │                     ▼
       │              ┌──────────────────┐
       │              │ Save URL to      │
       │              │ database         │
       │              └──────┬───────────┘
       │                     │
       │                     ▼
       │              ┌──────────────────┐
       │              │ Display image    │
       │              │ preview          │
       │              └──────────────────┘
       │
       └─── ❌ Invalid ──────┐
                             │
                             ▼
                      ┌──────────────┐
                      │ Show error   │
                      │ alert        │
                      └──────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Production Setup                      │
└─────────────────────────────────────────────────────────┘

┌──────────────┐         ┌──────────────┐
│   Vercel/    │         │   Supabase   │
│   Netlify    │◄───────►│   Cloud      │
│              │         │              │
│  - Frontend  │         │  - Database  │
│  - Static    │         │  - Auth      │
│  - CDN       │         │  - Storage   │
└──────────────┘         └──────────────┘
       │
       │
       ▼
┌──────────────┐
│   Users      │
│   (Visitors) │
└──────────────┘
```

## Technology Stack

```
Frontend
├── React 19              # UI framework
├── React Router          # Routing
├── Vite                  # Build tool
└── CSS                   # Styling

Backend (Supabase)
├── PostgreSQL            # Database
├── PostgREST             # Auto API
├── GoTrue                # Authentication
└── Storage               # File storage

Services
├── EmailJS               # Contact form
└── Supabase CDN          # Image delivery
```

## Performance Optimization

```
┌─────────────────────────────────────────┐
│         Performance Features             │
├─────────────────────────────────────────┤
│                                          │
│  Frontend                                │
│  ✅ Code splitting                      │
│  ✅ Lazy loading                        │
│  ✅ Optimized images                    │
│  ✅ Minified CSS/JS                     │
│                                          │
│  Backend                                 │
│  ✅ CDN delivery                        │
│  ✅ Database indexing                   │
│  ✅ Connection pooling                  │
│  ✅ Caching                             │
│                                          │
└─────────────────────────────────────────┘
```

## Scalability

```
Current Setup (Free Tier)
├── 500MB Database
├── 1GB Storage
├── 50,000 MAU
└── Unlimited API requests

Can Scale To
├── Unlimited Database
├── Unlimited Storage
├── Unlimited Users
└── Custom infrastructure
```

---

This architecture provides a solid foundation for a modern, scalable portfolio website with a powerful admin panel.
