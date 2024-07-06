export function getShortedText(maxLength = 30, text?: string) {
  if (!text || text?.length == 0) return "";

  const shortText =
    text?.length > maxLength ? text?.slice(0, maxLength) + "..." : text;

  return shortText;
}
