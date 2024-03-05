import {ScaleLoader} from "react-spinners";
import COLORS from "../../../constance/colors";


const SIZES = {
  sm: {
    width: 3, height: 15
  },
  md: {
    width: 4, height: 25
  },
  lg: {
    width: 5, height: 30
  },
  xl: {
    width: 6, height: 45
  },
}

type Props = {
  size?: keyof typeof SIZES;
  color?: keyof typeof COLORS;
}

function Loading({size='md', color='accent'}: Props) {
  return (
    <ScaleLoader
      color={COLORS[color]} width={SIZES[size].width} height={SIZES[size].height}
    />
  )
}

export default Loading