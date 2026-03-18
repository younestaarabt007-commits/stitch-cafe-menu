'use client'

import { Order, OrderStatus } from '@/lib/kds-types'

interface StatusTabsProps {
  orders: Order[]
  activeFilter: OrderStatus | 'all'
  onFilterChange: (filter: OrderStatus | 'all') => void
}

export function StatusTabs({ orders, activeFilter, onFilterChange }: StatusTabsProps) {
  const counts = {
    all: orders.length,
    new: orders.filter(o => o.status === 'new').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
  }

  const tabs = [
    { label: 'All Orders', value: 'all' as const, count: counts.all },
    { label: 'New', value: 'new' as const, count: counts.new },
    { label: 'Preparing', value: 'preparing' as const, count: counts.preparing },
    { label: 'Ready', value: 'ready' as const, count: counts.ready },
  ]

  return (
    <div className="flex gap-3 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onFilterChange(tab.value)}
          className={`px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
            activeFilter === tab.value
              ? 'bg-foreground text-white shadow-lg'
              : 'bg-white text-foreground border border-border hover:bg-secondary/50 hover:shadow-md'
          }`}
        >
          {tab.label} 
          <span className="ml-2 font-bold inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20">
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  )
}
