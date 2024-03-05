import { BadgeProps } from "../Badge";

export type BadgeColorsType = 'gray' | 'blackOutlined'
export type BadgeSizesType = 'sm' | 'md'

function useBadgeStyles({color = 'gray', size = 'sm'}: Partial<BadgeProps>) {

  const badgeStylesColors: Record<BadgeColorsType, string> = {
    'gray': 'bg-gray-50 border border-gray-200',
    'blackOutlined': 'bg-transparent border border-gray-400 text-gray-600',
  }

  const badgeStylesSizes: Record<BadgeSizesType, string> = {
    'sm': 'text-sm py-0.5 px-2 rounded-lg',
    'md': 'bg-transparent border-gray-400 py-1 px-4 rounded-[20px]',
  }

  const badgeStyles = {
    color: badgeStylesColors[color],
    size: badgeStylesSizes[size],
  }

  return {badgeStyles}
}

export default useBadgeStyles;