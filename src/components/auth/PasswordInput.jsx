
import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";

const PasswordInput = ({ 
  id, 
  name, 
  value, 
  onChange, 
  placeholder = "••••••••", 
  hasError = false,
  autoComplete = "current-password"
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
        autoComplete={autoComplete}
        className={`pl-10 ${hasError ? 'border-destructive focus-visible:ring-destructive' : ''}`}
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
  );
};

export default PasswordInput;
