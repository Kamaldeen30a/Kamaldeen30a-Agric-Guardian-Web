# Landing Page Implementation

## Overview

The landing page is built with a modular component architecture, featuring smooth scroll animations powered by Framer Motion and a cohesive design system.

## Component Structure

```
src/components/landing/
├── Navbar.tsx           # Fixed navigation with scroll effects
├── HeroSection.tsx      # Hero with parallax floating cards
├── Features.tsx         # 8-card feature grid with stagger
├── HowItWorks.tsx       # 4-step process with connectors
├── AIIntelligence.tsx   # AI capabilities showcase
├── DesignedForScale.tsx # Scale features marquee
├── TechnologyTrust.tsx  # Tech stack horizontal scroll
├── FinalCTA.tsx         # Call-to-action section
└── Footer.tsx           # Footer with social links
```

## Page Assembly

The Index page assembles all sections:

```tsx
// src/pages/Index.tsx
const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <Features />
      <HowItWorks />
      <AIIntelligence />
      <DesignedForScale />
      <TechnologyTrust />
      <FinalCTA />
      <Footer />
    </div>
  );
};
```

## Component Details

### Navbar

**Features:**
- Fixed positioning with backdrop blur
- Scroll-aware styling (transparent → solid)
- Mobile responsive hamburger menu
- Authentication state display

**Implementation:**
```tsx
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

### HeroSection

**Features:**
- Animated text reveal with stagger
- Parallax floating cards
- Trust indicators with hover effects
- Decorative background blobs

**Animation Implementation:**
```tsx
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start start", "end start"],
});

const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
const floatingCard1Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
```

**Stagger Animation:**
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};
```

### Features

**Features:**
- 8-card responsive grid
- Staggered reveal on scroll
- Hover lift and gradient effects
- Icon rotation on hover

**Grid Layout:**
```tsx
<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {features.map((feature) => (
    <motion.div
      variants={staggerItemVariants}
      whileHover={{ y: -8 }}
    >
      {/* Card content */}
    </motion.div>
  ))}
</div>
```

### HowItWorks

**Features:**
- 4-step numbered cards
- Connecting lines between steps
- Parallax background decorations
- Icon spin on hover

**Connector Lines:**
```tsx
{index < steps.length - 1 && (
  <motion.div 
    className="hidden lg:block absolute top-16 left-full w-full h-0.5 
               bg-gradient-to-r from-emerald-300 to-transparent"
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    style={{ originX: 0 }}
  />
)}
```

### AIIntelligence

**Features:**
- Dark theme section
- Split layout (content + grid)
- Animated badges
- Accuracy indicators

**Badge Animation:**
```tsx
<motion.div 
  className="flex flex-wrap gap-3"
  variants={{
    visible: { transition: { staggerChildren: 0.1 } },
  }}
>
  {badges.map((badge) => (
    <motion.span
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      }}
      whileHover={{ scale: 1.05 }}
    >
      {badge}
    </motion.span>
  ))}
</motion.div>
```

### DesignedForScale

**Features:**
- Centered pill/tag layout
- Parallax background blobs
- Hover lift effect

### TechnologyTrust

**Features:**
- Infinite horizontal marquee
- Gradient edge masks
- Technology icons with colors
- Hover scale effect

**Marquee Implementation:**
```tsx
<motion.div
  className="flex gap-12 py-4"
  animate={{
    x: [0, -50 * technologies.length * 4],
  }}
  transition={{
    x: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 25,
      ease: "linear",
    },
  }}
>
  {duplicatedTechnologies.map((tech) => (
    <div className="flex items-center gap-4 px-6 py-4 bg-slate-50 rounded-2xl">
      <tech.icon style={{ color: tech.color }} />
      <span>{tech.name}</span>
    </div>
  ))}
</motion.div>
```

### FinalCTA

**Features:**
- Dark gradient background
- Animated glow effect
- Staggered button reveal
- Grid pattern overlay

**Glow Animation:**
```tsx
const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);

<motion.div 
  className="absolute w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl"
  style={{ scale: glowScale }}
/>
```

### Footer

**Features:**
- Multi-column link layout
- Brand section
- Social media links (X, LinkedIn, GitHub)
- Copyright with current year

## Animation Components

### ScrollReveal

Reveals content when scrolling into view:

```tsx
<ScrollReveal delay={0.2} y={40}>
  <h2>Section Title</h2>
</ScrollReveal>
```

**Props:**
- `delay`: Animation delay in seconds
- `duration`: Animation duration
- `y`: Initial Y offset
- `x`: Initial X offset
- `once`: Animate only once

### StaggerContainer

Container for staggered child animations:

```tsx
<StaggerContainer staggerDelay={0.1}>
  {items.map((item) => (
    <motion.div variants={staggerItemVariants}>
      {item.content}
    </motion.div>
  ))}
</StaggerContainer>
```

### ParallaxSection

Applies parallax movement to content:

```tsx
<ParallaxSection speed={0.3} direction="up">
  <div className="decorative-element" />
</ParallaxSection>
```

### ParallaxBackground

Specialized for decorative background elements:

```tsx
<ParallaxBackground 
  className="absolute w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl"
  speed={0.4}
/>
```

## Responsive Design

### Breakpoints

```css
sm: 640px   /* 2-column grids */
md: 768px   /* Tablet layouts */
lg: 1024px  /* Desktop layouts */
xl: 1280px  /* Large desktop */
```

### Mobile Considerations

- Hamburger menu for navigation
- Stacked layouts on small screens
- Touch-friendly button sizes
- Reduced animation complexity

## Performance Optimizations

### Image Optimization

- Hero image in `src/assets/` for bundling
- Lazy loading for below-fold images

### Animation Performance

- GPU-accelerated transforms only
- `will-change` hints where needed
- Reduced motion support possible

### Code Splitting

- Each section is a separate component
- Dynamic imports for route-level splitting

## SEO Implementation

### Meta Tags

```html
<title>Agri-Guardian Web | Enterprise Farm Management</title>
<meta name="description" content="AI-powered farm management platform..." />
```

### Semantic HTML

- `<section>` for each content block
- `<nav>` for navigation
- `<footer>` for footer
- Proper heading hierarchy (h1 → h2 → h3)

### Accessibility

- Alt text on images
- Proper color contrast
- Keyboard navigation support
- ARIA labels where needed

## Customization Guide

### Changing Colors

Update design tokens in `src/index.css`:

```css
:root {
  --primary: 142 76% 36%;  /* emerald-600 */
}
```

### Adding Sections

1. Create component in `src/components/landing/`
2. Import in `src/pages/Index.tsx`
3. Add to page in desired position

### Modifying Animations

Adjust timing in animation components:

```tsx
const itemVariants = {
  visible: {
    transition: {
      duration: 0.8,  // Slower
      ease: "easeOut",
    },
  },
};
```
