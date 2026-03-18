'use client'

import { useState } from 'react'
import { Order } from '@/lib/kds-types'
import { OrderBoard } from '@/components/kds/order-board'

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ORD-105',
    tableNumber: 9,
    customerName: 'Mike Chen',
    status: 'new',
    isRush: true,
    items: [
      { id: '1', name: 'Garlic Bread', quantity: 2 },
      { id: '2', name: 'Margherita Pizza', quantity: 1 },
      { id: '3', name: 'Grilled Salmon', quantity: 2, notes: 'Well done' },
      { id: '4', name: 'Iced Tea', quantity: 2 },
    ],
    createdAt: new Date(Date.now() - 20 * 60 * 1000),
  },
  {
    id: 'ORD-102',
    tableNumber: 7,
    customerName: 'Sarah Khan',
    status: 'preparing',
    items: [
      { id: '5', name: 'Grilled Salmon', quantity: 1, notes: 'No lemon' },
      { id: '6', name: 'Chicken Alfredo', quantity: 1 },
    ],
    createdAt: new Date(Date.now() - 7 * 60 * 1000),
  },
  {
    id: 'ORD-106',
    tableNumber: 2,
    customerName: 'David Park',
    status: 'ready',
    items: [
      { id: '7', name: 'Chicken Alfredo', quantity: 2 },
      { id: '8', name: 'Tiramisu', quantity: 2 },
    ],
    createdAt: new Date(Date.now() - 27 * 60 * 1000),
  },
  {
    id: 'ORD-107',
    tableNumber: 6,
    customerName: 'Emily Rose',
    status: 'ready',
    items: [
      { id: '9', name: 'Cheesecake', quantity: 3 },
      { id: '10', name: 'Chocolate Cake', quantity: 1 },
    ],
    createdAt: new Date(Date.now() - 24 * 60 * 1000),
  },
  {
    id: 'ORD-104',
    tableNumber: 5,
    customerName: 'Lisa Wong',
    status: 'new',
    items: [
      { id: '11', name: 'Caesar Salad', quantity: 2 },
      { id: '12', name: 'Cheesecake', quantity: 1, notes: 'Gluten free' },
    ],
    createdAt: new Date(Date.now() - 14 * 60 * 1000),
  },
  {
    id: 'ORD-103',
    tableNumber: 1,
    customerName: 'John Doe',
    status: 'new',
    items: [
      { id: '13', name: 'Chocolate Cake', quantity: 2 },
      { id: '14', name: 'Tiramisu', quantity: 1 },
      { id: '15', name: 'Iced Tea', quantity: 3 },
    ],
    createdAt: new Date(Date.now() - 10 * 60 * 1000),
  },
  {
    id: 'ORD-101',
    tableNumber: 3,
    customerName: 'Emir Abiyyu',
    status: 'preparing',
    items: [
      { id: '16', name: 'Margherita Pizza', quantity: 2 },
      { id: '17', name: 'Caesar Salad', quantity: 1 },
      { id: '18', name: 'Garlic Bread', quantity: 1, notes: 'Extra crispy' },
    ],
    createdAt: new Date(Date.now() - 4 * 60 * 1000),
  },
]

export default function KDSPage() {
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS)

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: newStatus as any }
        : order
    ))
  }

  return (
    <OrderBoard
      orders={orders}
      onStatusChange={handleStatusChange}
    />
  )
}
