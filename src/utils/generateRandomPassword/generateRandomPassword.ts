import randomBetween from "./randomBetween";

function generateRandomPassword (
  passLength: number = 12,
  hasNumber: boolean = true,
  hasSpecialChars: boolean = true,
  hasUpperAlphabet: boolean = true,
  hasLowerAlphabet: boolean = true
) {
  const password = new Array(passLength);
  const upAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const downAlphabet = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "1234567890";
  const specialChars = "×!@#$%^&*)(_+";
  const exeptIndexs: number[] = [];

  if (hasUpperAlphabet) {
    const randomIndex: number = randomBetween(0, passLength - 1, exeptIndexs);
    exeptIndexs.push(randomIndex);
    password[randomIndex] = upAlphabet[randomBetween(0, upAlphabet.length - 1)];
  }

  if (hasLowerAlphabet) {
    const randomIndex: number = randomBetween(0, passLength - 1, exeptIndexs);
    exeptIndexs.push(randomIndex);
    password[randomIndex] =
      downAlphabet[randomBetween(0, downAlphabet.length - 1)];
  }

  if (hasNumber) {
    const randomIndex: number = randomBetween(0, passLength - 1, exeptIndexs);
    exeptIndexs.push(randomIndex);
    password[randomIndex] = numbers[randomBetween(0, numbers.length - 1)];
  }

  if (hasSpecialChars) {
    const randomIndex: number = randomBetween(0, passLength - 1, exeptIndexs);
    exeptIndexs.push(randomIndex);
    password[randomIndex] =
      specialChars[randomBetween(0, specialChars.length - 1)];
  }

  for (let i = 0; i < passLength; i++) {
    if (exeptIndexs.indexOf(i) === -1) {
      password[i] = downAlphabet[randomBetween(0, downAlphabet.length - 1)];
    }
  }

  return password.join("");
}

export default generateRandomPassword