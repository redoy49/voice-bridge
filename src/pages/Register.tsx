import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VoiceBridgeLogo from "@/components/VoiceBridgeLogo";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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

  const strengthColor = [
    "bg-muted",
    "bg-destructive",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ][passwordStrength];

  const strengthText = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];

  const requirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "One number", met: /[0-9]/.test(formData.password) },
    {
      text: "One special character",
      met: /[^A-Za-z0-9]/.test(formData.password),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-[linear-gradient(135deg,hsl(270_80%_96%)_0%,hsl(12_90%_96%)_40%,hsl(270_60%_94%)_70%,hsl(200_80%_95%)_100%)]">
      {/* floating bg */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] rounded-full opacity-30 bg-primary/20" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] rounded-full opacity-25 bg-accent/20" />
      <div className="absolute top-1/2 left-[10%] w-[200px] h-[200px] rounded-full opacity-20 bg-primary/10" />

      {/* Logo */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 z-10"
      >
        <VoiceBridgeLogo size={36} className="rounded-full" />
        <span className="font-display font-bold text-xl text-foreground">
          VoiceBridge
        </span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-[440px] bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 p-10 shadow-lg z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground font-display">
            Create your account
          </h1>

          <p className="text-sm text-muted-foreground mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Social */}
        <div className="space-y-3 mb-6">
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border-border/60 bg-card hover:bg-secondary text-foreground font-medium rounded-lg transition-colors"
          >
            Sign up with Google
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border-border/60 bg-card hover:bg-secondary text-foreground font-medium rounded-lg transition-colors"
          >
            Sign up with Apple
          </Button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/60" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-card text-muted-foreground">
              or sign up with email
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleInputChange}
            className="h-12 rounded-lg border-border/60 bg-card text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/30"
          />

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="h-12 rounded-lg border-border/60 bg-card text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/30"
          />

          {/* password */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleInputChange}
              className="h-12 rounded-lg border-border/60 bg-card text-foreground placeholder:text-muted-foreground pr-10 focus-visible:ring-primary/30"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* strength */}
          {formData.password && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strengthColor} transition-all`}
                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                  />
                </div>

                {passwordStrength > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {strengthText}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {requirements.map((req, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                        req.met ? "bg-green-500" : "bg-muted"
                      }`}
                    >
                      {req.met && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>

                    <span
                      className={
                        req.met
                          ? "text-green-600 dark:text-green-400"
                          : "text-muted-foreground"
                      }
                    >
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 rounded-lg gradient-coral text-primary-foreground font-semibold hover:opacity-90 transition"
          >
            Create account
          </Button>
        </form>

        {/* footer */}
        <p className="text-xs text-muted-foreground text-center mt-6">
          By signing up, you agree to VoiceBridge Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Register;
