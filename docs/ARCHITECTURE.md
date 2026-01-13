# Architecture Documentation

## System Overview

Agri-Guardian Web follows a modern React architecture with clear separation of concerns, component-based design, and a robust state management approach.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Pages     │  │ Components  │  │      Contexts           │  │
│  │  - Index    │  │  - Landing  │  │  - AuthContext          │  │
│  │  - Login    │  │  - UI       │  │  - (Future contexts)    │  │
│  │  - Signup   │  │  - Anim     │  │                         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    React Router v6                          ││
│  │         Route Management & Navigation                       ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌────────────────────────────────────┐│
│  │   React Query       │  │        Supabase Client             ││
│  │   Data Fetching     │  │   Auth, Database, Storage          ││
│  └─────────────────────┘  └────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Lovable Cloud (Supabase)                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │    Auth     │  │  Database   │  │      Edge Functions     │  │
│  │  - Email    │  │  PostgreSQL │  │   Serverless Logic      │  │
│  │  - OAuth    │  │  - Tables   │  │                         │  │
│  │  - Sessions │  │  - RLS      │  │                         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Core Principles

### 1. Component-Based Architecture

Components are organized by feature and responsibility:

```
components/
├── animations/     # Reusable animation wrappers
├── landing/        # Landing page specific components
└── ui/             # Generic UI components (shadcn/ui)
```

### 2. State Management

**Local State**: React useState for component-specific state

**Context API**: For cross-cutting concerns like authentication

```typescript
// AuthContext provides user state across the app
const { user, signIn, signOut } = useAuth();
```

**React Query**: For server state management (future implementation)

### 3. Type Safety

Full TypeScript coverage with strict mode enabled:

```typescript
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}
```

## Data Flow

### Authentication Flow

```
┌──────────┐     ┌──────────────┐     ┌─────────────┐
│  Login   │────▶│ AuthContext  │────▶│  Supabase   │
│  Page    │     │  signIn()    │     │    Auth     │
└──────────┘     └──────────────┘     └─────────────┘
                        │
                        ▼
               ┌──────────────┐
               │ onAuthState  │
               │   Change     │
               └──────────────┘
                        │
                        ▼
               ┌──────────────┐
               │  Update UI   │
               │  (user set)  │
               └──────────────┘
```

### Page Rendering Flow

```
┌──────────┐     ┌──────────────┐     ┌─────────────┐
│  Router  │────▶│    Page      │────▶│ Components  │
│  Match   │     │  Component   │     │   Render    │
└──────────┘     └──────────────┘     └─────────────┘
```

## File Conventions

### Naming

- **Components**: PascalCase (`HeroSection.tsx`)
- **Hooks**: camelCase with `use` prefix (`useAuth.ts`)
- **Utilities**: camelCase (`utils.ts`)
- **Constants**: UPPER_SNAKE_CASE

### Exports

```typescript
// Named exports for components
export const HeroSection = () => { ... };
export default HeroSection;

// Barrel exports from index files
export { ScrollReveal } from "./ScrollReveal";
export { StaggerContainer } from "./StaggerContainer";
```

## Performance Considerations

### Code Splitting

React Router enables route-based code splitting:

```typescript
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
```

### Animation Performance

Framer Motion animations use GPU-accelerated properties:
- `transform` (translate, scale, rotate)
- `opacity`

### Bundle Optimization

- Tree-shaking enabled via ES modules
- Lucide icons are individually imported
- Tailwind CSS purges unused styles

## Security Architecture

### Client-Side

- No sensitive data in client code
- Environment variables for configuration
- Secure token handling via Supabase SDK

### Server-Side (Supabase)

- Row Level Security (RLS) on all tables
- JWT-based authentication
- Secure session management

## Scalability Patterns

### Component Composition

Small, focused components that compose together:

```tsx
<ScrollReveal>
  <StaggerContainer>
    {items.map(item => (
      <motion.div variants={staggerItemVariants}>
        {item.content}
      </motion.div>
    ))}
  </StaggerContainer>
</ScrollReveal>
```

### Feature Modules

Future features can be added as self-contained modules:

```
src/
├── features/
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   ├── inventory/
│   └── reports/
```

## Testing Strategy

### Unit Tests

Vitest for component and utility testing:

```typescript
describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('...')).toBeInTheDocument();
  });
});
```

### E2E Tests

Browser-based testing for critical paths:
- Authentication flows
- Form submissions
- Navigation

## Monitoring & Debugging

### Development Tools

- React DevTools
- Network tab for API calls
- Console for runtime errors

### Production Monitoring

- Error boundaries for graceful failures
- Logging via console (production-safe)
