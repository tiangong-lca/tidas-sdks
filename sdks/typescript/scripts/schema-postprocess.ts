export function replaceExportedSchema(
  content: string,
  schemaName: string,
  replacement: string
): string {
  const marker = `export const ${schemaName}`;
  const startIndex = content.indexOf(marker);

  if (startIndex === -1) {
    throw new Error(`Could not replace missing generated schema ${schemaName}`);
  }

  const nextExportIndex = content.indexOf(
    '\n\nexport const ',
    startIndex + marker.length
  );
  const nextPrivateConstIndex = content.indexOf(
    '\n\nconst ',
    startIndex + marker.length
  );
  const candidateEndIndexes = [nextExportIndex, nextPrivateConstIndex].filter(
    (index) => index !== -1
  );
  const endIndex =
    candidateEndIndexes.length > 0
      ? Math.min(...candidateEndIndexes)
      : content.length;

  return `${content.slice(0, startIndex)}${replacement}${content.slice(endIndex)}`;
}
