import {useEffect, useState} from "react";
import {DisplayWithAnimationProps} from "../DisplayWithAnimation";


type Props = {
  removedAfterThisTime?: number;
} & Pick<DisplayWithAnimationProps, 'show'>

function useDisplayWithAnimation({show, removedAfterThisTime}: Props) {

  const [shouldBeRemoved, setShouldBeRemoved] = useState(true)
  const [showWithAnimation, setShowWithAnimation] = useState(false)

  useEffect(() => {

    let timeout: NodeJS.Timeout;

    if (show) {
      setShouldBeRemoved(false)
      timeout = setTimeout(function () {
        setShowWithAnimation(true)
      }, 50)
    } else {
      setShowWithAnimation(false)
      timeout = setTimeout(function () {
        setShouldBeRemoved(true)
      }, removedAfterThisTime || 500)
    }

    return () => clearTimeout(timeout)
  }, [show]);

  return {shouldBeRemoved, showWithAnimation}
}

export default useDisplayWithAnimation