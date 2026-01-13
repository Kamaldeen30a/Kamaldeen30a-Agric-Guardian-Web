# Design System Documentation

## Overview

Agri-Guardian Web uses a custom design system built on Tailwind CSS, featuring semantic color tokens, custom typography, glassmorphism effects, and animation utilities.

## Color Palette

### Primary Colors (Emerald)

| Token | HSL Value | Usage |
|-------|-----------|-------|
| `--primary` | 142 76% 36% | Primary actions, links |
| `emerald-50` | #ecfdf5 | Light backgrounds |
| `emerald-100` | #d1fae5 | Badges, highlights |
| `emerald-200` | #a7f3d0 | Decorative elements |
| `emerald-400` | #34d399 | Accents on dark |
| `emerald-500` | #10b981 | Primary buttons |
| `emerald-600` | #059669 | Hover states |

### Neutral Colors (Slate)

| Token | Usage |
|-------|-------|
| `slate-50` | Section backgrounds |
| `slate-100` | Card borders |
| `slate-200` | Dividers |
| `slate-400` | Secondary text (dark bg) |
| `slate-500` | Muted text |
| `slate-600` | Body text |
| `slate-700` | Strong text |
| `slate-800` | Dark backgrounds |
| `slate-900` | Darkest backgrounds, headings |

### Usage Examples

```tsx
// Primary button
<button className="bg-emerald-500 hover:bg-emerald-600 text-white">

// Card with border
<div className="bg-white border border-slate-200">

// Text hierarchy
<h1 className="text-slate-900">Heading</h1>
<p className="text-slate-600">Body text</p>
<span className="text-slate-500">Muted text</span>
```

## Typography

### Font Families

```css
/* Display font for headings */
.font-display {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 700;
}

/* Body font */
.font-sans {
  font-family: 'Inter', system-ui, sans-serif;
}
```

### Type Scale

| Class | Size | Usage |
|-------|------|-------|
| `text-xs` | 12px | Captions, badges |
| `text-sm` | 14px | Secondary text |
| `text-base` | 16px | Body text |
| `text-lg` | 18px | Large body |
| `text-xl` | 20px | Card titles |
| `text-2xl` | 24px | Stats, numbers |
| `text-3xl` | 30px | Section titles (mobile) |
| `text-4xl` | 36px | Section titles (tablet) |
| `text-5xl` | 48px | Section titles (desktop) |
| `text-6xl` | 60px | Hero headline |

### Responsive Typography

```tsx
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
  Hero Headline
</h1>

<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
  Section Title
</h2>
```

## Spacing

### Scale

```
4px  = 1 (p-1, m-1)
8px  = 2 (p-2, m-2)
12px = 3 (p-3, m-3)
16px = 4 (p-4, m-4)
20px = 5 (p-5, m-5)
24px = 6 (p-6, m-6)
32px = 8 (p-8, m-8)
40px = 10 (p-10, m-10)
48px = 12 (p-12, m-12)
64px = 16 (p-16, m-16)
96px = 24 (py-24 for sections)
```

### Section Spacing

```tsx
// Standard section padding
<section className="py-24">

// Container padding
<div className="container mx-auto px-4 lg:px-8">
```

## Component Patterns

### Cards

**Standard Card:**
```tsx
<div className="p-6 rounded-2xl border border-slate-200 bg-white 
                hover:border-emerald-300 hover:shadow-xl 
                transition-all duration-300">
```

**Glass Card:**
```tsx
<div className="glass-card p-6 rounded-2xl">
  {/* glass-card defined in index.css */}
</div>
```

**Dark Card:**
```tsx
<div className="p-6 rounded-2xl bg-white/5 border border-white/10 
                backdrop-blur-sm">
```

### Buttons

**Hero Button (Primary):**
```tsx
<Button variant="hero" size="xl" className="group">
  Get Started
  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</Button>
```

**Hero Outline Button:**
```tsx
<Button variant="heroOutline" size="xl">
  Learn More
</Button>
```

### Badges

**Light Badge:**
```tsx
<span className="inline-block px-4 py-2 rounded-full 
                 bg-emerald-100 text-emerald-700 
                 text-sm font-medium">
  Badge Text
</span>
```

**Dark Badge:**
```tsx
<span className="px-4 py-2 rounded-full 
                 bg-emerald-500/20 border border-emerald-500/30 
                 text-emerald-400 text-sm font-medium">
  Badge Text
</span>
```

### Icons

**Icon Container (Light):**
```tsx
<div className="w-12 h-12 rounded-xl bg-emerald-100 
                flex items-center justify-center">
  <Icon className="w-6 h-6 text-emerald-600" />
</div>
```

**Icon Container (Interactive):**
```tsx
<div className="w-12 h-12 rounded-xl bg-emerald-100 
                flex items-center justify-center
                group-hover:bg-emerald-500 transition-colors">
  <Icon className="w-6 h-6 text-emerald-600 
                   group-hover:text-white transition-colors" />
</div>
```

## Effects

### Glassmorphism

```css
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

### Gradients

**Hero Gradient:**
```css
.gradient-hero {
  background: linear-gradient(
    135deg, 
    #ecfdf5 0%,    /* emerald-50 */
    #d1fae5 50%,   /* emerald-100 */
    #ffffff 100%
  );
}
```

**Text Gradient:**
```css
.text-gradient {
  background: linear-gradient(135deg, #059669, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Dark Section:**
```tsx
<section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
```

### Shadows

**Emerald Shadow:**
```css
.shadow-emerald {
  box-shadow: 0 10px 40px -10px rgba(16, 185, 129, 0.4);
}
```

**Standard Shadows:**
```tsx
// Subtle
<div className="shadow-md">

// Card hover
<div className="hover:shadow-xl">

// Hero elements
<div className="shadow-2xl">
```

### Background Patterns

**Grid Pattern:**
```css
.grid-pattern {
  background-image: 
    linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

**Dark Grid:**
```tsx
<div className="bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),
                   linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] 
                bg-[size:60px_60px]">
```

## Animation Utilities

### Defined in Tailwind Config

```typescript
animation: {
  "fade-in": "fade-in 0.3s ease-out",
  "scale-in": "scale-in 0.2s ease-out",
  "slide-in-right": "slide-in-right 0.3s ease-out",
}
```

### Custom Animations (index.css)

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 6s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-pulse-soft {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### Hover Effects

```tsx
// Lift on hover
<div className="hover:-translate-y-1 transition-transform">

// Scale on hover
<div className="hover:scale-105 transition-transform">

// Color transition
<div className="hover:text-emerald-600 transition-colors">
```

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Small tablets, landscape phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

### Common Patterns

```tsx
// Grid columns
<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

// Flex direction
<div className="flex flex-col sm:flex-row gap-4">

// Padding
<div className="px-4 lg:px-8">

// Text size
<h1 className="text-4xl sm:text-5xl lg:text-6xl">
```

## Dark Mode (Future)

The design system is prepared for dark mode:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}
```

## Accessibility

### Color Contrast

- Body text on white: slate-600 (7:1 ratio)
- Headings on white: slate-900 (16:1 ratio)
- Primary on white: emerald-600 (4.5:1 ratio)

### Focus States

```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-emerald-500 
                   focus:ring-offset-2">
```

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
