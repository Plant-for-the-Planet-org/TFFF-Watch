export function extractLists(text: string) {
  if (!text) return [];
  const output = text.split("- ");
  return output;
}

export function serialize(text: string) {
  let output: string[] | string = text;
  output = extractLists(output);
  return output;
}

export function serializePersons(text: string) {
  if (!text) return [];
  const persons = text.split("\n\n").map((block) => {
    const [nameOrgLine, emailLine] = block.trim().split("\n");
    const [name, organization] = nameOrgLine.split(" · ");
    const email = emailLine.trim();
    return { name, organization, email };
  });
  return persons;
}

export function formatPublisherForCardBadge(text: string) {
  if (text.length > 32) {
    return text.slice(0, 32) + "...";
  }
  return text;
}
