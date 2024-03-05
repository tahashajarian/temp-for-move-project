import {BarLoader} from "react-spinners";
import COLORS from "../../../constance/colors";


type Props = {
  loading: boolean
}

function LoadingPage({loading}: Props) {
  return (
    <BarLoader
      loading={loading}
      color={COLORS.accent}
      width='100vw'
      height='4'
      cssOverride={{position:'fixed', top: 0, right: 0}}
    />
  )
}

export default LoadingPage