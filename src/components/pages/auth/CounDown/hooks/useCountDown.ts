import {useEffect, useState} from "react"

type Props = {
  time: number
}

export default function useCountDown({time}: Props):[number, () => void] {
  const [remainingTime, setRemainingTime] = useState<number>(time)

  const startCountDown = (customTime?:number) => {
    setRemainingTime(customTime ?? time)
    const interval = setInterval(() => downRemainingTime(), 1000)

    const downRemainingTime = () => {
      setRemainingTime(prev => {
        if (prev > 1) {
          return prev - 1
        } else {
          clearInterval(interval)
          return 0
        }
      })
    }
  }

  // useEffect(() => {
  //   startCountDown()
  // }, [])

  return [remainingTime, startCountDown];
}