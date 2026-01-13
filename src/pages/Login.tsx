import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Leaf, ArrowLeft, Mail, Lock, AlertCircle, Chrome } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate("/");
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero relative overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Decorative blobs - smaller on mobile */}
      <div className="absolute top-1/4 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-100/40 rounded-full blur-3xl" />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 sm:p-6">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-primary transition-colors group text-sm sm:text-base">
            <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="text-center mb-6 sm:mb-8">
              <Link to="/" className="inline-flex items-center gap-2 group">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-primary flex items-center justify-center shadow-emerald group-hover:scale-105 transition-transform">
                  <Leaf className="w-6 sm:w-7 h-6 sm:h-7 text-primary-foreground" />
                </div>
                <span className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                  Agri-Guardian <span className="text-primary">Web</span>
                </span>
              </Link>
            </div>

            {/* Login Form Card */}
            <div className="glass-card p-5 sm:p-8">
              <div className="text-center mb-5 sm:mb-6">
                <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  Welcome Back
                </h1>
                <p className="text-sm sm:text-base text-slate-600">
                  Sign in to access your Command Center
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 mb-6 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Google OAuth Button */}
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full h-11 sm:h-12 border-slate-200 hover:bg-slate-50 text-sm sm:text-base"
                onClick={handleGoogleSignIn}
                disabled={googleLoading || loading}
              >
                <Chrome className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                {googleLoading ? "Connecting..." : "Continue with Google"}
              </Button>

              <div className="relative my-5 sm:my-6">
                <Separator className="bg-slate-200" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs sm:text-sm text-slate-500 whitespace-nowrap">
                  or continue with email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="email" className="text-slate-700 text-sm">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9 sm:pl-10 h-11 sm:h-12 bg-white/50 border-slate-200 focus:border-primary text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="password" className="text-slate-700 text-sm">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-slate-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 sm:pl-10 h-11 sm:h-12 bg-white/50 border-slate-200 focus:border-primary text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full h-11 sm:h-12 text-sm sm:text-base"
                  disabled={loading || googleLoading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-5 sm:mt-6 text-center">
                <p className="text-sm text-slate-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary font-medium hover:underline">
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
