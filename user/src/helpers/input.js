export function separateString(string) {
  if (!string || !string.trim()) {
    return [];
  }
  return string
    .split(/[,;]+/)
    .map((tag) => tag.trim().replace(/\s+/g, " "))
    .filter((tag) => tag !== "");
}

export function stringIncludesQuery(string, searchQuery) {
  return string.toLowerCase().includes(searchQuery.toLowerCase());
}
