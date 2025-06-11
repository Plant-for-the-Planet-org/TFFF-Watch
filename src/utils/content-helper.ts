export function extractLists(text: string) {
  if (!text) return [];
  const output = text.split("- ");
  console.log({ output });
  return output;
}

export function serialize(text: string) {
  let output: string[] | string = text;
  output = extractLists(output);
  return output;
}
