function randomBetween(min:number, max:number, exeptions: number[] = []): any {
  const randomBettened: number =
    Math.floor(Math.random() * (max - min + 1)) + min;
  if (exeptions.includes(randomBettened)) {
    return randomBetween(min, max, exeptions);
  } else {
    return randomBettened;
  }
}

export default randomBetween