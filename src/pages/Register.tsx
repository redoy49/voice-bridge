import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VoiceBridgeLogo from "@/components/VoiceBridgeLogo";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") {
      let s = 0;
      if (value.length >= 8) s++;
      if (/[A-Z]/.test(value)) s++;
      if (/[0-9]/.test(value)) s++;
      if (/[^A-Za-z0-9]/.test(value)) s++;
      setPasswordStrength(s);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const strengthColor = ["bg-muted", "bg-destructive", "bg-yellow-500", "bg-blue-500", "bg-green-500"][passwordStrength];
  const strengthText = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];

  const requirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "One number", met: /[0-9]/.test(formData.password) },
    { text: "One special character", met: /[^A-Za-z0-9]/.test(formData.password) },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(270 80% 96%) 0%, hsl(12 90% 96%) 40%, hsl(270 60% 94%) 70%, hsl(200 80% 95%) 100%)",
      }}
    >
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, hsl(270 70% 85%), transparent 70%)" }} />
      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, hsl(12 90% 85%), transparent 70%)" }} />
      <div className="absolute top-1/2 left-[10%] w-[200px] h-[200px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(200 80% 85%), transparent 70%)" }} />

      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 z-10">
        <VoiceBridgeLogo size={36} />
        <span className="font-display font-bold text-xl text-foreground">VoiceBridge</span>
      </Link>

      <div className="w-full max-w-[440px] bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 p-10 shadow-lg relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground font-display">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <Button type="button" variant="outline" className="w-full h-12 border-border/60 bg-card hover:bg-secondary text-foreground font-medium rounded-lg">
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </Button>
          <Button type="button" variant="outline" className="w-full h-12 border-border/60 bg-card hover:bg-secondary text-foreground font-medium rounded-lg">
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Sign up with Apple
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/60"></div></div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-card/80 text-muted-foreground">or sign up with email:</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="text" placeholder="Full name" name="name" value={formData.name} onChange={handleInputChange} className="h-12 rounded-lg border-border/60 bg-card" required />
          <Input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} className="h-12 rounded-lg border-border/60 bg-card" required />
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} placeholder="Create a password" name="password" value={formData.password} onChange={handleInputChange} className="h-12 rounded-lg border-border/60 bg-card pr-10" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {formData.password && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${strengthColor} transition-all`} style={{ width: `${(passwordStrength / 4) * 100}%` }} />
                </div>
                {passwordStrength > 0 && <span className="text-xs font-medium text-muted-foreground">{strengthText}</span>}
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {requirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs">
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${req.met ? "bg-green-500" : "bg-muted"}`}>
                      {req.met && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <span className={req.met ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>{req.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full h-12 rounded-lg gradient-coral text-primary-foreground border-0 font-semibold text-base hover:opacity-90 transition-opacity">Create account</Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          By signing up, you agree to VoiceBridge's{" "}
          <a href="#" className="text-primary hover:underline">Terms & Conditions</a>{" "}and{" "}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Register;
