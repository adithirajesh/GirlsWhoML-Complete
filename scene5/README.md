# Harangè - GirlsWhoML x Mozilla Festival 2025

A modern, interactive website for the Harangè project, created in collaboration between GirlsWhoML and Mozilla Festival 2025. This website showcases the global initiative to amplify voices of women in Machine Learning and AI.

## 🌟 Project Overview

Harangè is a transformative project that brings together women from over 20+ countries to share their stories and experiences with AI and ML, creating much-needed representation in the emerging tech space. This website serves as the digital home for the project, featuring:

- **Interactive Mosaic of Voices**: A dynamic grid showcasing participant profiles and contributions
- **Reflection Interface**: A functional form for collecting user thoughts and feedback
- **Testimonial Slider**: Auto-playing carousel featuring participant experiences
- **Professional Animations**: Comprehensive animation system throughout the site

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd harange-website

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev

# Open http://localhost:3000 in your browser
```

## 🏗️ Project Structure

```
harange-website/
├── app/
│   ├── components/
│   │   ├── home/
│   │   │   └── TestimonialSlider.js     # Auto-playing testimonial carousel
│   │   └── shared/
│   │       ├── Header.js                # Navigation with scroll effects
│   │       └── Footer.js                # Social links with animations
│   ├── mosaic-of-voices/
│   │   └── page.js                      # Participant profiles grid
│   ├── contact/
│   │   └── page.js                      # Contact information
│   ├── page.js                          # Home page with reflection form
│   └── globals.css                      # Global styles and animations
├── public/
│   └── images/                          # Static assets
└── README.md
```

## 🎨 Key Features

### 1. Interactive Reflection Form
- **Location**: Home page (`app/page.js:287-392`)
- **Features**:
  - Functional textarea for user input
  - Custom SVG-based design matching Figma specifications
  - Purple arrow cursor animation
  - Responsive design with hover effects

### 2. Mosaic of Voices
- **Location**: `/mosaic-of-voices` page
- **Features**:
  - 24 participant profile tiles
  - "View more" functionality with staggered animations
  - Intersection Observer for performance optimization
  - Progressive loading with entrance animations

### 3. Testimonial Slider
- **Location**: `app/components/home/TestimonialSlider.js`
- **Features**:
  - Auto-play functionality (4-second intervals)
  - Smart pause/resume on hover and user interaction
  - Progress indicators and navigation controls
  - Smooth transitions and hover effects

### 4. Professional Animation System
- **Scroll-triggered animations** using Intersection Observer API
- **Hover effects** on interactive elements
- **Staggered timing** for multiple elements
- **Accessibility support** with reduced motion preferences
- **Performance optimized** with hardware-accelerated transforms

## 🎭 Animation Implementation

### Global Animations (`app/globals.css`)
```css
/* Custom keyframes */
@keyframes slide-up { /* ... */ }
@keyframes fade-in { /* ... */ }
@keyframes shimmer { /* ... */ }
@keyframes pulse-glow { /* ... */ }

/* Accessibility support */
@media (prefers-reduced-motion: reduce) {
  /* Reduced animations for accessibility */
}
```

### Component-Level Animations
- **Header**: Scroll-responsive opacity, logo rotation, navigation hover effects
- **Footer**: Staggered entrance animations (200ms, 400ms, 600ms, 800ms, 1000ms)
- **Testimonial Slider**: Auto-play, card lifting, color transitions
- **Mosaic Tiles**: Progressive loading, hover scaling, view more animations

## 🎨 Design System

### Color Palette
```css
:root {
  --color-primary: #261033;      /* Deep purple */
  --color-secondary: #D89EFA;    /* Light purple */
  --color-accent: #F6D55C;       /* Yellow accent */
  --color-bg-cream: #F5F3ED;     /* Cream background */
  --color-dark: #393939;         /* Dark gray */
}
```

### Typography
- **Primary Font**: Inter (system font stack)
- **Logo Font**: Alata (sans-serif)
- **Font Weights**: 400 (normal), 500 (medium), 700 (bold)

### Components
- **Buttons**: Rounded corners (100px), hover scale effects
- **Cards**: 20px border radius, hover lift effects
- **Navigation**: Glass morphism with backdrop blur
- **Forms**: Custom styling with purple accent colors

## 📱 Responsive Design

The website is built with mobile-first principles using Tailwind CSS:
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible layouts**: CSS Grid and Flexbox
- **Adaptive typography**: Responsive font sizes and spacing
- **Touch-friendly**: Appropriate button sizes and touch targets

## ⚡ Performance Optimizations

### Animation Performance
- **Hardware acceleration**: `transform3d()` and `will-change` properties
- **Intersection Observer**: Efficient scroll-based animations
- **Debounced scroll events**: Smooth performance during scrolling
- **Animation cleanup**: Proper cleanup of event listeners and observers

### Loading Optimizations
- **Next.js Image**: Optimized image loading and lazy loading
- **Font optimization**: `next/font` for optimal font loading
- **Component lazy loading**: Dynamic imports where appropriate

## 🔧 Development Guidelines

### Component Structure
```javascript
'use client'; // For client-side interactivity

import { useState, useEffect, useRef } from 'react';

export default function Component() {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(/* ... */);
    if (componentRef.current) {
      observer.observe(componentRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={componentRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Component content */}
    </div>
  );
}
```

### Animation Best Practices
1. **Use Intersection Observer** for scroll-triggered animations
2. **Implement staggered timing** for multiple elements
3. **Include hover states** for interactive elements
4. **Respect accessibility** preferences (`prefers-reduced-motion`)
5. **Clean up resources** in useEffect cleanup functions

### Code Style
- **ESLint**: Follow Next.js recommended rules
- **Prettier**: Consistent code formatting
- **Component naming**: PascalCase for components
- **File structure**: Organized by feature and component type

## 🌐 Pages and Routes

### `/` - Home Page
- Hero section with project introduction
- Interactive reflection form
- Testimonial slider
- Call-to-action sections

### `/mosaic-of-voices` - Participant Profiles
- Grid of 24 participant tiles
- Expandable "View more" functionality
- Individual participant stories and backgrounds

### `/contact` - Contact Information
- Team contact details
- Social media links
- Get involved information

### `/about-us` - About the Project
- Project background and mission
- Team information
- Partnership details

## 🔗 External Integrations

### Social Media Links
- **Instagram**: [@girlswhoml](https://www.instagram.com/girlswhoml/)
- **LinkedIn**: [GirlsWhoML Company](https://www.linkedin.com/company/girlswhoml/posts/?feedView=all)
- **X/Twitter**: [@girlswhoml](https://x.com/girlswhoml)

### Analytics and Tracking
- Ready for Google Analytics integration
- Performance monitoring setup
- User interaction tracking capabilities

## 📦 Dependencies

### Core Dependencies
- **Next.js 14+**: React framework with App Router
- **React 18+**: Component library
- **Tailwind CSS**: Utility-first CSS framework

### Development Dependencies
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Other Platforms
The project is compatible with:
- Netlify
- Railway
- AWS Amplify
- Traditional hosting with Node.js support

## 🐛 Troubleshooting

### Common Issues

1. **Animation not triggering**
   - Check if component is using 'use client' directive
   - Verify Intersection Observer implementation
   - Ensure proper ref assignment

2. **Styling inconsistencies**
   - Check Tailwind CSS classes are properly applied
   - Verify CSS custom properties are defined
   - Check for conflicting styles

3. **Performance issues**
   - Monitor component re-renders
   - Check for memory leaks in useEffect cleanup
   - Optimize heavy animations

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `websitetrack`
2. Make changes with comprehensive testing
3. Update documentation as needed
4. Submit pull request with detailed description

### Commit Guidelines
```
feat: add new testimonial slider animation
fix: resolve mobile responsiveness issue
docs: update README with animation guidelines
style: improve button hover effects
```

## 📄 License

This project is created for the GirlsWhoML x Mozilla Festival 2025 collaboration. Please respect the intellectual property and mission of the project.

## 🙏 Acknowledgments

- **GirlsWhoML Community**: For their inspiring stories and participation
- **Mozilla Festival 2025**: For partnership and platform support
- **Contributors**: All developers and designers who contributed to this project
- **Participants**: Women from 20+ countries sharing their AI/ML experiences

---

**Built with ❤️ for empowering women in ML and AI**

For questions or support, please contact the GirlsWhoML team through our social media channels or the contact form on the website.