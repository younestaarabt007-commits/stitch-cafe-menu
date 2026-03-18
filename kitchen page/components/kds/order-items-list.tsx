import { OrderItem } from '@/lib/kds-types'
import { QuantityBubble } from './quantity-bubble'

interface OrderItemsListProps {
  items: OrderItem[]
}

export function OrderItemsList({ items }: OrderItemsListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="space-y-1">
          <div className="flex items-center gap-3">
            <QuantityBubble quantity={item.quantity} />
            <span className="text-sm font-medium text-foreground">{item.name}</span>
          </div>
          {item.notes && (
            <p className="text-xs text-amber-600 ml-9 italic font-medium">{item.notes}</p>
          )}
        </div>
      ))}
    </div>
  )
}
