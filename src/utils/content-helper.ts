export function extractLists(text: string) {
  if (!text) return [];
  return text.split("- ");
}

export function serialize(text: string) {
  let output: string[] | string = text;
  output = extractLists(output);
  return output;
}
