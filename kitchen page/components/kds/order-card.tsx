'use client'

import { Order, OrderStatus } from '@/lib/kds-types'
import { OrderItemsList } from './order-items-list'
import { ActionButton } from './action-button'
import { TimeIndicator } from './time-indicator'
import { StatusBadge } from './status-badge'

interface OrderCardProps {
  order: Order
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void
}

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const statusColors = {
    new: {
      border: 'border-blue-200',
      top: 'bg-gradient-to-r from-blue-500 to-blue-600',
      badge: '#3b82f6',
      light: 'bg-blue-50/50'
    },
    preparing: {
      border: 'border-amber-200',
      top: 'bg-gradient-to-r from-amber-500 to-amber-600',
      badge: '#f59e0b',
      light: 'bg-amber-50/50'
    },
    ready: {
      border: 'border-emerald-200',
      top: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      badge: '#10b981',
      light: 'bg-emerald-50/50'
    },
    served: {
      border: 'border-gray-200',
      top: 'bg-gradient-to-r from-gray-500 to-gray-600',
      badge: '#6b7280',
      light: 'bg-gray-50/50'
    },
  }

  const nextStatus: Record<OrderStatus, OrderStatus> = {
    new: 'preparing',
    preparing: 'ready',
    ready: 'served',
    served: 'served',
  }

  const colors = statusColors[order.status]

  return (
    <div className={`bg-white rounded-lg border ${colors.border} overflow-hidden transition-all duration-300 hover:shadow-lg shadow-md`}>
      {/* Status Bar */}
      <div className={`${colors.top} h-2`} />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-foreground">{order.id}</h3>
            {order.isRush && <StatusBadge label="RUSH" variant="rush" />}
          </div>
          <TimeIndicator createdAt={order.createdAt} />
        </div>

        {/* Table & Customer Info */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-border/50">
          <div>
            <p className="text-sm font-semibold text-foreground">Table {order.tableNumber}</p>
          </div>
          <p className="text-sm text-muted-foreground">{order.customerName}</p>
        </div>

        {/* Items */}
        <div className="mb-6">
          <OrderItemsList items={order.items} />
        </div>

        {/* Action Button */}
        <ActionButton
          status={order.status}
          onClick={() => onStatusChange(order.id, nextStatus[order.status])}
        />
      </div>
    </div>
  )
}
