import { Button } from '@/components/ui/button'
import { OrderStatus } from '@/lib/kds-types'

interface ActionButtonProps {
  status: OrderStatus
  onClick: () => void
}

export function ActionButton({ status, onClick }: ActionButtonProps) {
  const config = {
    new: {
      text: 'Start Preparing',
      bgColor: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
      icon: '→',
    },
    preparing: {
      text: 'Mark Ready',
      bgColor: 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800',
      icon: '✓',
    },
    ready: {
      text: 'Mark Served',
      bgColor: 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800',
      icon: '✓',
    },
    served: {
      text: 'Served',
      bgColor: 'bg-gray-400 cursor-not-allowed',
      icon: '✓',
    },
  }

  const current = config[status]
  const isDisabled = status === 'served'

  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      className={`w-full text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${current.bgColor}`}
    >
      {current.text} <span className="ml-2">{current.icon}</span>
    </Button>
  )
}
