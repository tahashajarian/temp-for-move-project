import {getJalaliDateAndTime} from "./getJalaliDate";

function getCurrentDateAndTime() {
  return getJalaliDateAndTime({value: new Date(), isEnglishNumber: true})
}

export default getCurrentDateAndTime