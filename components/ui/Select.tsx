import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options?: SelectOption[]
  onValueChange?: (value: string) => void
  /** Shown as a disabled placeholder <option> when the select has no value yet. */
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, options, onValueChange, placeholder, children, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</label>
        )}
        <select
          ref={ref}
          className={cn(
            'w-full px-4 py-2.5 rounded-lg border transition-colors appearance-none',
            'bg-white text-[#0f172a] dark:bg-[#0b1220] dark:text-slate-100',
            'focus:outline-none focus:ring-2 focus:ring-[#0047BB] focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error
              ? 'border-red-300 focus:ring-red-500 dark:border-red-500/60'
              : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600',
            className
          )}
          onChange={(e) => {
            onValueChange?.(e.target.value)
            props.onChange?.(e)
          }}
          {...props}
        >
          {placeholder && (props.value === undefined || props.value === '') && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
          {children}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'