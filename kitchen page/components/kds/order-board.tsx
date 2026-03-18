'use client'

import { useState, useMemo } from 'react'
import { Order, OrderStatus } from '@/lib/kds-types'
import { OrderCard } from './order-card'
import { StatusTabs } from './status-tabs'

interface OrderBoardProps {
  orders: Order[]
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void
}

/**
 * OrderBoard - Main KDS component that displays a filterable board of orders
 * 
 * Can be embedded as a page in an existing POS dashboard.
 * Manages order filtering by status and displays cards in a responsive grid.
 * 
 * Usage:
 * ```tsx
 * import { OrderBoard } from '@/components/kds/order-board'
 * 
 * export default function KDSPage() {
 *   const [orders, setOrders] = useState<Order[]>(initialOrders)
 *   
 *   return (
 *     <OrderBoard 
 *       orders={orders}
 *       onStatusChange={(orderId, newStatus) => {
 *         setOrders(orders.map(o => 
 *           o.id === orderId ? { ...o, status: newStatus } : o
 *         ))
 *       }}
 *     />
 *   )
 * }
 * ```
 */
export function OrderBoard({ orders, onStatusChange }: OrderBoardProps) {
  const [activeFilter, setActiveFilter] = useState<OrderStatus | 'all'>('all')

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'all') return orders
    return orders.filter(order => order.status === activeFilter)
  }, [orders, activeFilter])

  return (
    <div className="min-h-screen bg-background" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Kitchen Display</h1>
          <p className="text-muted-foreground text-lg">Real-time order management system</p>
        </div>

        {/* Status Tabs */}
        <div className="mb-8">
          <StatusTabs
            orders={orders}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={onStatusChange}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <div className="text-center">
                <p className="text-muted-foreground text-xl mb-2">No orders in this category</p>
                <p className="text-muted-foreground/60">Check back soon for new orders</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
