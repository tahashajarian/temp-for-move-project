import CryptoJS from "crypto-js"

const tokenSecretKey = '12345esm12345tejarat12345electronic12345rasadi12345'

export function encrypt(value: string) {
  const encryptedData = CryptoJS.AES.encrypt(value, tokenSecretKey)

  return encryptedData.toString()
}

export function decrypt(value: string) {
  const decryptedData = CryptoJS.AES.decrypt(value, tokenSecretKey)
  const parsedText = decryptedData.toString(CryptoJS.enc.Utf8)

  return parsedText
}
