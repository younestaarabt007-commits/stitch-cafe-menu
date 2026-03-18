export type OrderStatus = 'new' | 'preparing' | 'ready' | 'served'

export interface OrderItem {
  id: string
  name: string
  quantity: number
  notes?: string
}

export interface Order {
  id: string
  tableNumber: number
  customerName: string
  status: OrderStatus
  items: OrderItem[]
  createdAt: Date
  isRush?: boolean
}

export interface OrderBoardProps {
  orders: Order[]
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void
}
