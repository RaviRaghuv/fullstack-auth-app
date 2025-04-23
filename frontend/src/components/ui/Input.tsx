import React, { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="form-group">
        {label && (
          <label className="form-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`form-input ${
            error ? 'border-error-color' : ''
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="form-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 