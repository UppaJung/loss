/**
 * Get the path of the most-recent .tsv file in the `analysis-input-raw` directory.
 * @param inputDataPath \
 * @returns 
 */
export const getPathOfMostRecentInputTsvFile = async (inputDataPath = "./analysis-input-raw") => {
  const tsvFileEntries = (await Array.fromAsync(Deno.readDir(inputDataPath)))
    .filter(entry => entry.isFile && entry.name.endsWith(".tsv"));
  const tsvFileEntriesWithDate = await Promise.all(tsvFileEntries.map(async (entry) => {
    return { ...entry, date: (await Deno.stat(`${inputDataPath}/${entry.name}`)).mtime };
  }));
  const [mostRecentTsvFileEntry] = tsvFileEntriesWithDate.sort(
    (a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0)
  );
  if (mostRecentTsvFileEntry == null) {
    throw new Error(`No files with a .tsv extension found in ${inputDataPath}`);
  }
  const name = mostRecentTsvFileEntry.name;
  const baseName = name.split(".")[0];
  const path = `${inputDataPath}/${mostRecentTsvFileEntry.name}`;
  const date = mostRecentTsvFileEntry.date || new Date();
  return {baseName, name, path, date}
};
