export function getKaboomSpriteName(id: string | number, isAgent: boolean) {
  if (isAgent) {
    return `a${id}`;
  }
  return `ma${id}`;
}