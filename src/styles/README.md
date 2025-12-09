# Admin Styles Documentation

## File Structure

```
src/styles/
├── AdminLogin.css      - Login page styling
├── AdminDashboard.css  - Dashboard and sidebar styling
└── AdminEdit.css       - All edit pages styling
```

## Color Scheme

### Primary Colors
- **Purple Gradient**: `#667eea` to `#764ba2`
- **Dark Background**: `#2d3748` to `#1a202c`
- **Success Green**: `#48bb78`
- **Error Red**: `#fc8181`

### Text Colors
- **Primary**: `#1a202c`
- **Secondary**: `#2d3748`
- **Muted**: `#718096`

### Background Colors
- **White**: `#ffffff`
- **Light Gray**: `#f7fafc`
- **Border**: `#e2e8f0`

## Components

### Login Page
- Centered card layout
- Gradient background
- Form inputs with focus states
- Error message styling

### Dashboard
- Fixed sidebar (280px)
- Main content area
- Card grid layout
- Hover effects

### Edit Pages
- Form groups with labels
- Input/textarea styling
- Card editors for dynamic content
- Add/remove buttons
- Save button with loading state

## Responsive Breakpoints

- **Mobile**: < 768px
  - Sidebar becomes full width
  - Form rows stack vertically
  - Cards stack in single column

- **Tablet**: 768px - 1024px
  - Sidebar remains fixed
  - 2-column card grid

- **Desktop**: > 1024px
  - Full layout with sidebar
  - Multi-column card grid

## Customization

To change colors, update these variables in each CSS file:

```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Sidebar background */
background: linear-gradient(180deg, #2d3748 0%, #1a202c 100%);

/* Success color */
background: #48bb78;

/* Error color */
background: #fc8181;
```

## Typography

- **Headings**: System font stack
- **Body**: Inherited from parent
- **Sizes**: Using clamp() for fluid typography
  - Small: `clamp(0.85rem, 1.5vw, 0.95rem)`
  - Base: `clamp(0.9rem, 2vw, 1rem)`
  - Large: `clamp(1.5rem, 4vw, 2rem)`
