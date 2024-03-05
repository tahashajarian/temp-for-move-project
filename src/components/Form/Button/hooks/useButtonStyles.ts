import {ButtonColorsType, ButtonProps, ButtonSizesType, ButtonVarientsType} from "../Button";

function useButtonStyles(
  {className = {}, variant = 'filled', size = 'full-width', color = 'accent', disabled}:
    Partial<ButtonProps>
) {

  const buttonStylesColors: Record<ButtonColorsType, Record<ButtonVarientsType, string>> = {
    'accent': {
      'text': 'text-accent bg-transparent hover:bg-accent/5',
      'filled': 'bg-accent border-none text-white hover:bg-accent-hover',
      'outlined': 'text-accent bg-transparent hover:bg-accent/5 border border-accent'
    },
    'red': {
      'text': 'text-red-500 bg-transparent hover:bg-red-500/5',
      'filled': 'bg-red-500 border-none text-white hover:bg-red-600',
      'outlined': 'text-red-500 bg-transparent hover:bg-red-500/5 border border-red-500'
    },
    'gray': {
      'text': 'hover:bg-gray-100',
      'filled': 'bg-gray-50 border border-custom-gray-2 hover:bg-gray-100',
      'outlined': 'hover:bg-gray-100 border border-gray-200'
    },
  }

  const buttonStylesSizes: Record<ButtonSizesType, string> = {
    'full-width': 'w-full py-3 rounded-lg',
    'xs': 'px-2 py-1.5 rounded',
    'sm': 'px-4 py-2 rounded',
    'md': 'px-8 py-2.5 rounded-md',
    'lg': 'px-12 py-3 rounded-md',
  }

  const buttonStyles = {
    default: 'flex items-center justify-center font-normal disabled:text-white disabled:bg-gray-400 duration-200 whitespace-nowrap',
    size: buttonStylesSizes[size],
    color: buttonStylesColors[color][variant],
    ...className
  }

  return {buttonStyles}
}

export default useButtonStyles;