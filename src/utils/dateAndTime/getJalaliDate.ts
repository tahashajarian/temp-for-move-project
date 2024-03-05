import {DateObject} from "react-multi-date-picker";
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'


type Props = {
  value: string | Date,
  isEnglishNumber?: boolean
}

export function getJalaliDateAndTime({value, isEnglishNumber}: Props) {
  const date = getJalaliDate({value, isEnglishNumber})

  const dateValue = new DateObject(value)
  const time = `${dateValue.hour}-${dateValue.minute}-${dateValue.second}`

  return `${date}T${time}`
}


function getJalaliDate({value, isEnglishNumber}: Props) {
  const jalaliDate = new DateObject(value).convert(persian, isEnglishNumber ? undefined : persian_fa)
  if (!jalaliDate) return
  return jalaliDate.format()
}

export default getJalaliDate