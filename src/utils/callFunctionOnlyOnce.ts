'use client'


function callFunctionOnlyOnce(callback: Function) {
  let callCount = 0

  return function () {
    if (callCount !== 0) return
    callback()
    callCount = 1
  }
}

export default callFunctionOnlyOnce;