
type Props = {
  style?: any
}

function TabActiveElement({style}: Props) {
  return (
    <div
      style={style}
      className={`absolute rounded-t-full -bottom-[1px] 
							bg-accent h-1 transition-all duration-300`}
    />
  )
}

export default TabActiveElement