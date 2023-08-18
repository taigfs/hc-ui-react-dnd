export function getValueAfterUnderscore(str: string): number {
  const parts = str.split("_");
  if (parts.length > 1 && !isNaN(Number(parts[1]))) {
    return parseInt(parts[1], 10);
  }
  return 0;
}
