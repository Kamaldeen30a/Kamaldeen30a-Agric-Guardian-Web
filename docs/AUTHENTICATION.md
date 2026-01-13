# Authentication Documentation

## Overview

Agri-Guardian Web uses Supabase Auth (via Lovable Cloud) for user authentication, supporting email/password and Google OAuth methods.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      AuthContext                             │
├─────────────────────────────────────────────────────────────┤
│  State:                                                      │
│  - user: User | null                                         │
│  - session: Session | null                                   │
│  - loading: boolean                                          │
├─────────────────────────────────────────────────────────────┤
│  Methods:                                                    │
│  - signUp(email, password)                                   │
│  - signIn(email, password)                                   │
│  - signInWithGoogle()                                        │
│  - signOut()                                                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Supabase Client                           │
│              @/integrations/supabase/client                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Lovable Cloud                             │
│                   (Supabase Backend)                         │
└─────────────────────────────────────────────────────────────┘
```

## AuthContext Implementation

### Location

`src/contexts/AuthContext.tsx`

### Interface

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

### State Management

The context uses `useState` for managing auth state:

```typescript
const [user, setUser] = useState<User | null>(null);
const [session, setSession] = useState<Session | null>(null);
const [loading, setLoading] = useState(true);
```

### Auth State Listener

A critical pattern: set up the listener BEFORE checking for existing session:

```typescript
useEffect(() => {
  // Set up auth state listener FIRST
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }
  );

  // THEN check for existing session
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
    setUser(session?.user ?? null);
    setLoading(false);
  });

  return () => subscription.unsubscribe();
}, []);
```

## Authentication Methods

### Email/Password Sign Up

```typescript
const signUp = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin,
    },
  });
  return { error };
};
```

**Features:**
- Auto-confirm enabled (no email verification required)
- Redirects to app origin after confirmation

### Email/Password Sign In

```typescript
const signIn = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { error };
};
```

### Google OAuth Sign In

```typescript
const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
    },
  });
  return { error };
};
```

**Note:** Google OAuth is managed automatically by Lovable Cloud. Custom OAuth credentials can be configured in Cloud settings.

### Sign Out

```typescript
const signOut = async () => {
  await supabase.auth.signOut();
};
```

## Usage in Components

### Accessing Auth Context

```typescript
import { useAuth } from "@/contexts/AuthContext";

const Component = () => {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  if (!user) return <LoginForm />;
  
  return <Dashboard user={user} />;
};
```

### Login Page Implementation

```typescript
const Login = () => {
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back!");
      navigate("/");
    }
    
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

### Signup Page Implementation

```typescript
const Signup = () => {
  const { signUp, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    const { error } = await signUp(email, password);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created successfully!");
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

## Protected Routes

### Implementation Pattern

```typescript
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};
```

### Usage

```typescript
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

## Navbar Auth State

The Navbar displays different content based on auth state:

```typescript
const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav>
      {user ? (
        <>
          <span>{user.email}</span>
          <Button onClick={signOut}>Sign Out</Button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
};
```

## Form Validation

### Password Requirements

- Minimum 8 characters
- (Optional) Require uppercase, lowercase, number, special character

```typescript
const validatePassword = (password: string) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  return null;
};
```

### Email Validation

```typescript
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};
```

## Error Handling

### Common Errors

| Error | Message | Solution |
|-------|---------|----------|
| Invalid credentials | "Invalid login credentials" | Check email/password |
| User exists | "User already registered" | Use sign in instead |
| Weak password | "Password should be..." | Use stronger password |
| Rate limited | "Too many requests" | Wait and retry |

### Error Display

```typescript
const { error } = await signIn(email, password);

if (error) {
  // User-friendly error messages
  if (error.message.includes("Invalid")) {
    toast.error("Invalid email or password");
  } else if (error.message.includes("rate")) {
    toast.error("Too many attempts. Please wait a moment.");
  } else {
    toast.error(error.message);
  }
}
```

## Security Considerations

### Session Management

- Sessions are handled by Supabase automatically
- JWT tokens stored securely
- Auto-refresh of expired tokens

### CORS & Redirects

- Redirect URLs must be configured in Supabase
- Same-origin policy enforced

### Password Storage

- Passwords never stored in client code
- Bcrypt hashing on server side
- No plain-text transmission

## Testing Auth Flows

### Manual Testing

1. **Sign Up Flow:**
   - Navigate to /signup
   - Enter valid email and password
   - Verify redirect to home
   - Check user appears in Navbar

2. **Sign In Flow:**
   - Navigate to /login
   - Enter credentials
   - Verify successful login
   - Check session persistence (refresh page)

3. **Sign Out Flow:**
   - Click Sign Out
   - Verify redirect to home
   - Check auth buttons appear

4. **Google OAuth Flow:**
   - Click "Continue with Google"
   - Complete Google sign-in
   - Verify redirect back to app

### Automated Testing

```typescript
describe('Authentication', () => {
  it('should sign in with valid credentials', async () => {
    const { signIn } = useAuth();
    const result = await signIn('test@example.com', 'password123');
    expect(result.error).toBeNull();
  });
});
```

## Future Enhancements

1. **Password Reset Flow**
   - Forgot password link
   - Email-based reset

2. **Email Verification**
   - Verification email on signup
   - Resend verification option

3. **Multi-Factor Authentication**
   - TOTP support
   - SMS verification

4. **Social Providers**
   - GitHub OAuth
   - LinkedIn OAuth
   - Apple Sign In
