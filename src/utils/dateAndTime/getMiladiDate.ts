import persian from "react-date-object/calendars/persian"

import persian_fa from "react-date-object/locales/persian_fa"
import georgian from "react-date-object/calendars/gregorian"
import {DateObject} from "react-multi-date-picker";

function getMiladiDate({value}: {value: string | Date}) {
  const miladiDate = new DateObject({calendar:persian, date:value}).convert(georgian)
  if (!miladiDate) return
 
  return miladiDate.format().replaceAll('/','-')
}

export default getMiladiDate