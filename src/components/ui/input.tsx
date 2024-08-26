import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasAppendIcon?: boolean
  hasPrependIcon?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasAppendIcon, hasPrependIcon, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'dark:focus:orange-dark w-full rounded-none border-0 border-b border-gray-100 bg-transparent p-1 text-gray-500 caret-primary placeholder:text-gray-200 focus:border-gray-600 focus-visible:ring-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-100',
          className,
          hasAppendIcon && 'pe-7',
          hasPrependIcon && 'ps-7',
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
