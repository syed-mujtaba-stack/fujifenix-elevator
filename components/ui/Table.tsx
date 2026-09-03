import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-x-auto">
      <table
        ref={ref}
        className={cn('w-full text-sm text-left text-slate-600', className)}
        {...props}
      />
    </div>
  )
)

Table.displayName = 'Table'

export const TableHeader = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn('bg-slate-50 border-b border-slate-200', className)}
      {...props}
    />
  )
)

TableHeader.displayName = 'TableHeader'

export const TableBody = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn('divide-y divide-slate-100', className)}
      {...props}
    />
  )
)

TableBody.displayName = 'TableBody'

export const TableRow = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn('hover:bg-slate-50/50 transition-colors', className)}
      {...props}
    />
  )
)

TableRow.displayName = 'TableRow'

export const TableHead = forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn('px-4 py-3 font-semibold text-slate-500 uppercase tracking-wider', className)}
      {...props}
    />
  )
)

TableHead.displayName = 'TableHead'

export const TableCell = forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn('px-4 py-3', className)}
      {...props}
    />
  )
)

TableCell.displayName = 'TableCell'