import { forwardRef, useState, useRef } from 'react';
import { cn } from '../../lib/utils';

export interface UploadProps {
  label?: string;
  error?: string;
  helperText?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onFileSelect?: (files: File[]) => void;
  onFileRemove?: (file: File) => void;
  className?: string;
  disabled?: boolean;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  uploadedFile?: File | string | null;
}

const Upload = forwardRef<HTMLDivElement, UploadProps>(
  (
    {
      label,
      error,
      helperText,
      accept = '*/*',
      multiple = false,
      maxSize = 10, // 10MB default
      onFileSelect,
      onFileRemove,
      uploadedFile,
      className,
      disabled = false,
      variant = 'default',
      size = 'md',
      required = false,
    },
    ref
  ) => {
    const [uploadError, setUploadError] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const baseStyles = [
      'w-full transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'cursor-pointer',
    ];

    const variantStyles = {
      default: [
        'border-2 border-dashed border-gray-300 rounded-lg',
        'focus:border-blue-500 focus:ring-blue-500/20',
        'hover:border-gray-400',
      ],
      filled: [
        'border-2 border-dashed border-gray-300 rounded-lg bg-gray-50',
        'focus:border-blue-500 focus:ring-blue-500/20 focus:bg-white',
        'hover:border-gray-400 hover:bg-gray-100',
      ],
      outlined: [
        'border-2 border-dashed border-gray-300 rounded-lg bg-transparent',
        'focus:border-blue-500 focus:ring-blue-500/20',
        'hover:border-gray-400',
      ],
    };

    const sizeStyles = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const errorStyles = error || uploadError ? [
      'border-red-500 focus:border-red-500 focus:ring-red-500/20',
      'hover:border-red-400',
    ] : [];

    const uploadStyles = cn(
      ...baseStyles,
      ...variantStyles[variant],
      sizeStyles[size],
      ...errorStyles,
      className
    );

    const validateFile = (file: File): string | null => {
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        return `File size must be less than ${maxSize}MB`;
      }
      return null;
    };

    const handleFileSelect = (files: FileList | null) => {
      if (!files) return;

      const fileArray = Array.from(files);
      const errors: string[] = [];

      fileArray.forEach(file => {
        const error = validateFile(file);
        if (error) errors.push(`${file.name}: ${error}`);
      });

      if (errors.length > 0) {
        setUploadError(errors.join(', '));
        return;
      }

      setUploadError('');
      onFileSelect?.(fileArray);
    };

    const handleClick = () => {
      if (!disabled) {
        fileInputRef.current?.click();
      }
    };

    const handleFileRemove = () => {
      onFileRemove?.(uploadedFile! as File);
    };

    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

        <div
          className={uploadStyles}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
            disabled={disabled}
            required={required}
          />

          {!uploadedFile ? (
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600 hover:text-blue-500">
                    Click to upload
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {accept !== '*/*' ? `Accepted formats: ${accept}` : 'Any file type'} • Max size: {maxSize}MB
                  {required && <span className="text-red-500 ml-1">• Required</span>}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {typeof uploadedFile === 'string' 
                        ? uploadedFile.split('/').pop() || 'Uploaded file'
                        : uploadedFile.name.length > 20 
                          ? uploadedFile.name.slice(0, 20) + "..." 
                          : uploadedFile.name
                      }
                    </p>
                    <p className="text-xs text-gray-500">
                      {typeof uploadedFile === 'string' 
                        ? 'File uploaded'
                        : formatFileSize(uploadedFile.size)
                      }
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileRemove();
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {(error || uploadError || helperText) && (
          <div className="mt-2">
            {(error || uploadError) && (
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
                {error || uploadError}
              </p>
            )}
            {helperText && !error && !uploadError && (
              <p className="text-sm text-gray-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Upload.displayName = 'Upload';

export default Upload;
