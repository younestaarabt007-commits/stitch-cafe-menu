interface QuantityBubbleProps {
  quantity: number
}

export function QuantityBubble({ quantity }: QuantityBubbleProps) {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 text-foreground text-sm font-bold flex-shrink-0 shadow-sm">
      {quantity}
    </span>
  )
}
