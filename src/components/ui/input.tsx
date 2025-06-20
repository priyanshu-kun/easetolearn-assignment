import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outlined';
  inputSize?: 'sm' | 'md' | 'lg';
  inputType?: 'input' | 'textarea';
  rows?: number;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      className,
      label,
      error,
      leftIcon,
      rightIcon,
      helperText,
      variant = 'default',
      inputSize = 'md',
      inputType = 'input',
      rows = 3,
      required = false,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseStyles = [
      'w-full transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'placeholder:text-gray-400',
    ];

    const variantStyles = {
      default: [
        'border border-gray-300 rounded-lg',
        'focus:border-blue-500 focus:ring-blue-500/20',
        'hover:border-gray-400',
      ],
      filled: [
        'border-0 bg-gray-50 rounded-lg',
        'focus:bg-white focus:ring-blue-500/20 focus:border focus:border-blue-500',
        'hover:bg-gray-100',
      ],
      outlined: [
        'border-2 border-gray-300 rounded-lg bg-transparent',
        'focus:border-blue-500 focus:ring-blue-500/20',
        'hover:border-gray-400',
      ],
    };

    const sizeStyles = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-sm',
      lg: 'px-5 py-4 text-lg',
    };

    const errorStyles = error ? [
      'border-red-500 focus:border-red-500 focus:ring-red-500/20',
      'hover:border-red-400',
    ] : [];

    const inputStyles = cn(
      ...baseStyles,
      ...variantStyles[variant],
      sizeStyles[inputSize],
      ...errorStyles,
      leftIcon && inputType === 'input' ? 'pl-10' : '',
      rightIcon && inputType === 'input' ? 'pr-10' : '',
      inputType === 'textarea' ? 'resize-none' : '',
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1',
              error && 'text-red-600'
            )}
          >
            {label}
            {required && (
              <span className="text-red-500" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && inputType === 'input' && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          {inputType === 'textarea' ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              id={inputId}
              rows={rows}
              className={inputStyles}
              disabled={disabled}
              required={required}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              id={inputId}
              className={inputStyles}
              disabled={disabled}
              required={required}
              {...props}
            />
          )}
          
          {rightIcon && inputType === 'input' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <div className="mt-2">
            {error && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </p>
            )}
            {helperText && !error && (
              <p className="text-sm text-gray-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
