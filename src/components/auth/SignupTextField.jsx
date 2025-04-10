
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignupTextField = ({ 
  id, 
  name, 
  type = "text", 
  value, 
  onChange, 
  error, 
  label, 
  placeholder, 
  icon: Icon 
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
        <Input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${Icon ? 'pl-10' : ''} ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
        />
      </div>
      {error && <p className="text-destructive text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SignupTextField;
