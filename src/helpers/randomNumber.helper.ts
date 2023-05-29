export function randomNumberHelper(min, max) {
  if (max > min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  console.log("Error min cannot higher max!");
  return max;
}
