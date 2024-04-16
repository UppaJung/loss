/**
 * Read a qualtrics tab-separated data file to produce an array of objects, each representing a participant's responses,
 * each of which maps question IDs to the participant's response to that question.
 * @param path The path of the .tsv file exported by qualtrics (make sure line feeds are removed from answers).
 * @returns An array of objects mapping questions IDs to the participant's response to that question.
 */
export const readQualtricsDataTabSeparatedNewLinesRemovedUTF16 = async (path: string) => {
  // Qualtrics exports are UTF-16 encoded.
  const tabSeparatedDataFileUtf16 = await Deno.readFile(path);
  // Convert UTF-16 into JavaScript's internal string format.
  const tabSeparatedDataFileAsString = new TextDecoder("utf-16").decode(tabSeparatedDataFileUtf16);

  // The first three lines of the file are headers. Extract them.
  const [idLine, _questionTextLine, _jsonHeaderLine, ...responseLines] = tabSeparatedDataFileAsString.split("\n");

  // Convert the tab-delimited line of question IDs into an array.
  const idArray = idLine.split("\t").map(id => id.trim());

  // Each line contains one participant's responses.
  // Transform each response into an Object mapping question IDs to response strings, and make an array of those for all participants.
  const responses = responseLines
    // Remove any empty lines.
    .filter( line => line.length > 1)
    // Map each line to an array of strings for each tab-delimited column
    .map(responseLine => responseLine.split("\t")
      // Turn that array of strings into a map from question IDs to the participant's response to that question.
      .reduce((res, responseToIndex, index) => {
        // Remove any whitespace from the edges of a response.
        let cleanedResponse = responseToIndex.trim();
        // Sometimes qualtrics puts quotes around a response and sometimes it doesn't. This removes the quotes if they are there.
        if (cleanedResponse.startsWith('"') && cleanedResponse.endsWith('"')) {
          cleanedResponse = cleanedResponse.substring(1, cleanedResponse.length - 1).trim();
        }
        res[idArray[index]] = cleanedResponse;
        return res;
      }, {} as Record<string, string>)
    );

  return responses;
};
