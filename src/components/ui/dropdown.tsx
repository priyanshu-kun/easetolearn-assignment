import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  options: DropdownOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      label,
      error,
      helperText,
      placeholder = 'Select an option',
      options,
      value,
      onChange,
      multiple = false,
      searchable = false,
      disabled = false,
      className,
      variant = 'default',
      size = 'md',
      leftIcon,
      rightIcon,
      required = false,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValues, setSelectedValues] = useState<string[]>(
      Array.isArray(value) ? value : value ? [value] : []
    );
    const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const baseStyles = [
      'w-full transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'cursor-pointer',
    ];

    const variantStyles = {
      default: [
        'border border-gray-300 rounded-lg bg-white',
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
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    };

    const errorStyles = error ? [
      'border-red-500 focus:border-red-500 focus:ring-red-500/20',
      'hover:border-red-400',
    ] : [];

    const dropdownStyles = cn(
      ...baseStyles,
      ...variantStyles[variant],
      sizeStyles[size],
      ...errorStyles,
      leftIcon ? 'pl-10' : '',
      rightIcon ? 'pr-10' : '',
      className
    );

    const filteredOptions = options.filter(option =>
      searchable && searchTerm
        ? option.label.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );

    const selectedOptions = options.filter(option =>
      selectedValues.includes(option.value)
    );

    const checkDropdownPosition = () => {
      if (dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const dropdownHeight = 240; // Approximate height of dropdown
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        
        if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
          setDropdownPosition('top');
        } else {
          setDropdownPosition('bottom');
        }
      }
    };

    const handleToggle = () => {
      if (!disabled) {
        if (!isOpen) {
          checkDropdownPosition();
        }
        setIsOpen(!isOpen);
        if (!isOpen && searchable) {
          setTimeout(() => searchInputRef.current?.focus(), 100);
        }
      }
    };

    const handleSelect = (optionValue: string) => {
      if (multiple) {
        const newValues = selectedValues.includes(optionValue)
          ? selectedValues.filter(v => v !== optionValue)
          : [...selectedValues, optionValue];
        setSelectedValues(newValues);
        onChange?.(newValues);
      } else {
        setSelectedValues([optionValue]);
        onChange?.(optionValue);
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedValues([]);
      onChange?.(multiple ? [] : '');
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
      setSelectedValues(Array.isArray(value) ? value : value ? [value] : []);
    }, [value]);

    const getDisplayText = () => {
      if (selectedValues.length === 0) {
        return placeholder;
      }
      if (multiple) {
        if (selectedValues.length === 1) {
          return selectedOptions[0]?.label || '';
        }
        return `${selectedValues.length} items selected`;
      }
      return selectedOptions[0]?.label || '';
    };

    return (
      <div className="w-full" ref={ref}>
        {label && (
          <label className={cn(
            'block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1',
            error && 'text-red-600'
          )}>
            {label}
            {required && (
              <span className="text-red-500" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative" ref={dropdownRef}>
          <div
            className={dropdownStyles}
            onClick={handleToggle}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                {leftIcon && (
                  <div className="text-gray-400">
                    {leftIcon}
                  </div>
                )}
                <span className={cn(
                  'truncate',
                  selectedValues.length === 0 ? 'text-gray-400' : 'text-gray-900'
                )}>
                  {getDisplayText()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {selectedValues.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
                {rightIcon ? (
                  <div className="text-gray-400">
                    {rightIcon}
                  </div>
                ) : (
                  <svg
                    className={cn(
                      'h-5 w-5 text-gray-400 transition-transform',
                      isOpen && 'rotate-180'
                    )}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {isOpen && (
            <div className={cn(
              'absolute z-50 max-h-[300px] overflow-y-auto w-full bg-white border border-gray-300 rounded-lg shadow-lg',
              dropdownPosition === 'bottom' ? 'mt-1' : 'mb-1 bottom-full'
            )}>
              {searchable && (
                <div className="p-2 border-b border-gray-200">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search options..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              )}

              <div className="py-1">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    No options found
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      className={cn(
                        'px-4 py-2 text-sm cursor-pointer transition-colors',
                        'hover:bg-gray-100 focus:bg-gray-100',
                        selectedValues.includes(option.value) && 'bg-blue-50 text-blue-900',
                        option.disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent'
                      )}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                    >
                      <div className="flex items-center space-x-2">
                        {multiple && (
                          <div className="flex-shrink-0">
                            <input
                              type="checkbox"
                              checked={selectedValues.includes(option.value)}
                              readOnly
                              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </div>
                        )}
                        {option.icon && (
                          <div className="flex-shrink-0 text-gray-400">
                            {option.icon}
                          </div>
                        )}
                        <span className="truncate">{option.label}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
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

Dropdown.displayName = 'Dropdown';

export default Dropdown;
