
import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignupPasswordInput = ({ 
  id, 
  name, 
  value, 
  onChange, 
  error, 
  showStrength = false, 
  passwordStrength = null, 
  label = "Password", 
  placeholder = "••••••••" 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <LockIcon className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`pl-10 ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {showStrength && value && passwordStrength && (
        <div className="mt-2">
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${passwordStrength.color}`} 
              style={{ width: `${passwordStrength.strength}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Password strength: {passwordStrength.text}
          </p>
        </div>
      )}
      
      {error && <p className="text-destructive text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SignupPasswordInput;
