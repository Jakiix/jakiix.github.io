export function getDailyRandomIndex(length: number) {
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const hash = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return hash % length;
}
