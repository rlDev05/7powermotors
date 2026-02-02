# 7POWER MOTORS — Project Structure

## 📁 File Organization

```
/
├── README.md                          # Main project documentation
├── BRAND_GUIDELINES.md                # Comprehensive brand identity guide
├── package.json                       # Dependencies and scripts
│
├── /src
│   ├── /app
│   │   ├── App.tsx                    # Main app component (Router setup)
│   │   ├── routes.ts                  # Route configuration
│   │   │
│   │   ├── /components                # Reusable UI components
│   │   │   ├── Logo.tsx              # Brand logo component
│   │   │   ├── Navbar.tsx            # Fixed navigation with mobile menu
│   │   │   ├── Hero.tsx              # Full-screen hero section
│   │   │   ├── MotorcycleCategories.tsx # Category showcase grid
│   │   │   ├── FeaturedModels.tsx    # Premium motorcycle cards
│   │   │   ├── PerformanceEngineering.tsx # Stats & value props
│   │   │   ├── Services.tsx          # Service offerings
│   │   │   ├── Testimonials.tsx      # Customer testimonial carousel
│   │   │   ├── LifestyleGallery.tsx  # Image gallery
│   │   │   ├── Contact.tsx           # Contact form & info
│   │   │   ├── Footer.tsx            # Site footer
│   │   │   ├── ScrollToTop.tsx       # Scroll to top button
│   │   │   │
│   │   │   └── /figma                # Figma integration components
│   │   │       └── ImageWithFallback.tsx
│   │   │
│   │   └── /pages                     # Page components
│   │       └── Home.tsx              # Homepage (all sections)
│   │
│   └── /styles                        # Global styles
│       ├── fonts.css                 # Google Fonts imports
│       ├── theme.css                 # Brand colors & CSS variables
│       ├── tailwind.css              # Tailwind imports
│       └── index.css                 # Global base styles
│
└── /public                            # Static assets (if any)
```

---

## 🎯 Component Breakdown

### Core Layout Components

**Navbar** (`Navbar.tsx`)
- Fixed position navigation
- Glassmorphism backdrop blur effect
- Mobile hamburger menu with AnimatePresence
- Smooth scroll anchor links
- "Test Ride" CTA button

**Hero** (`Hero.tsx`)
- Full-screen cinematic background
- Gradient overlays for readability
- Animated headline and stats
- Dual CTA buttons
- Scroll indicator animation

**Footer** (`Footer.tsx`)
- Multi-column navigation links
- Newsletter signup form
- Social media links
- Contact information
- Legal links

### Content Sections

**MotorcycleCategories** (`MotorcycleCategories.tsx`)
- 3-column grid (responsive)
- Sport, Cruiser, Electric categories
- Hover effects with image zoom
- "Explore" CTA on each card

**FeaturedModels** (`FeaturedModels.tsx`)
- Featured + 2 standard motorcycle cards
- Spec displays (speed, horsepower, weight)
- Pricing information
- "View Details" CTAs
- Staggered scroll animations

**PerformanceEngineering** (`PerformanceEngineering.tsx`)
- 4 value proposition cards
- Icon-based visuals
- Statistical proof section
- Subtle dot pattern background

**Services** (`Services.tsx`)
- 4 service category cards
- Feature lists for each service
- Banner CTA with image background
- "Book Appointment" CTA

**Testimonials** (`Testimonials.tsx`)
- Carousel with prev/next navigation
- Dot indicators for position
- 5-star rating display
- Customer info with motorcycle model

**LifestyleGallery** (`LifestyleGallery.tsx`)
- 2x2 responsive grid
- Community, rides, showroom, customs
- Hover effects with scale
- Caption overlays

**Contact** (`Contact.tsx`)
- Split layout: form + info
- Contact cards (location, phone, email)
- Map placeholder
- Form with validation-ready inputs

### Utility Components

**Logo** (`Logo.tsx`)
- Custom SVG logo with "7" power symbol
- Two variants: default and minimal
- Scalable and responsive

**ScrollToTop** (`ScrollToTop.tsx`)
- Appears after 500px scroll
- Smooth scroll to top
- Fade in/out animation
- Fixed position bottom-right

---

## 🎨 Styling Architecture

### CSS Variables (theme.css)

All brand colors and design tokens defined as CSS variables:
```css
--background: #0a0a0a
--foreground: #f5f5f5
--accent: #ff3b00
--silver: #c0c0c0
--muted-foreground: #a3a3a3
--border: rgba(255, 255, 255, 0.08)
```

### Typography System

Two primary fonts:
- **Rajdhani**: Display headings (H1-H3)
- **Inter**: Body text and UI elements

Type scale from 0.75rem to 4.5rem with consistent line-heights and letter-spacing.

### Tailwind Utilities

- Custom utilities via Tailwind v4
- Dark theme first (no light mode needed)
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

---

## 🔄 Data Flow

### Static Data
All content is currently static within components. For dynamic data:

1. Create data files (e.g., `/src/data/motorcycles.ts`)
2. Export typed arrays/objects
3. Import into components
4. Map over data to render

Example:
```typescript
// /src/data/motorcycles.ts
export const motorcycles = [
  { id: 1, brand: 'Yamaha', model: 'YZF-R1M', ... },
  // ...
];

// In component
import { motorcycles } from '@/data/motorcycles';
```

### Form Handling
Contact form currently logs to console. To integrate:

1. Add API endpoint/service
2. Update `handleSubmit` in `Contact.tsx`
3. Add loading states and success/error messages
4. Optional: Email service integration (SendGrid, etc.)

---

## 🎬 Animation Strategy

### Motion Library (Framer Motion)

All animations use the `motion` package (formerly Framer Motion):

**Common Patterns:**
```typescript
// Scroll reveal
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}

// Hover scale
whileHover={{ scale: 1.05 }}

// Button press
whileTap={{ scale: 0.95 }}
```

**Performance:**
- Only animate `opacity`, `transform` (GPU-accelerated)
- Use `viewport={{ once: true }}` to prevent re-animation
- Keep durations under 800ms

---

## 🚀 Build & Deploy

### Development
```bash
npm run dev         # Start Vite dev server
```

### Production
```bash
npm run build       # Build for production
```

### Environment Variables (if needed)
Create `.env` file:
```
VITE_API_URL=your_api_url
VITE_CONTACT_EMAIL=info@7powermotors.com
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🔧 Customization Quick Guide

### Change Brand Color
**File:** `/src/styles/theme.css`
```css
--accent: #ff3b00;  /* Your new color */
```

### Update Logo
**File:** `/src/app/components/Logo.tsx`
- Modify SVG path data
- Adjust viewBox and sizing

### Add New Section
1. Create component: `/src/app/components/NewSection.tsx`
2. Import in: `/src/app/pages/Home.tsx`
3. Add navigation link: `/src/app/components/Navbar.tsx`

### Modify Content
Each component contains its data inline. Search for text strings and update directly.

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 18.3.1 | UI framework |
| react-router | 7.13.0 | Client-side routing |
| motion | 12.23.24 | Animations (Framer Motion) |
| tailwindcss | 4.1.12 | Utility-first CSS |
| lucide-react | 0.487.0 | Icon library |
| vite | 6.3.5 | Build tool |

---

## ✅ Quality Checklist

- [x] **Responsive**: Mobile, tablet, desktop layouts
- [x] **Accessible**: ARIA labels, semantic HTML, keyboard nav
- [x] **Performant**: Lazy loading, optimized animations
- [x] **SEO-ready**: Semantic structure, meta tags ready
- [x] **Dark theme**: Consistent brand aesthetic
- [x] **Type-safe**: TypeScript throughout
- [x] **Modular**: Reusable component architecture
- [x] **Animated**: Subtle, purposeful motion
- [x] **Documented**: Comprehensive README and guidelines

---

## 🎓 Learning Resources

### React & TypeScript
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Styling
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Motion Documentation](https://motion.dev/docs)

### Icons
- [Lucide React](https://lucide.dev)

---

## 🆘 Troubleshooting

**Issue: Animations not working**
- Check Motion is imported: `import { motion } from 'motion/react'`
- Verify component is wrapped with `<motion.div>`

**Issue: Images not loading**
- Verify ImageWithFallback component exists
- Check image URLs are valid

**Issue: Styles not applying**
- Ensure Tailwind imports in index.css
- Check theme.css is loaded
- Verify className spelling

**Issue: Router not working**
- Check RouterProvider is in App.tsx
- Verify routes.ts exports router
- Ensure react-router package is installed

---

**Need help? Check the README.md and BRAND_GUIDELINES.md for detailed information.**

© 2026 7POWER MOTORS. All rights reserved.
