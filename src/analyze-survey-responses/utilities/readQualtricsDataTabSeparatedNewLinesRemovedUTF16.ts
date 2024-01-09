export const readQualtricsDataTabSeparatedNewLinesRemovedUTF16 = async (path: string) => {
  const tabSeparatedDataFileUtf16 = await Deno.readFile(path);
  const tabSeparatedDataFile = new TextDecoder("utf-16").decode(tabSeparatedDataFileUtf16);
  const [idLine, _questionTextLine, _jsonHeaderLine, ...responseLines] = tabSeparatedDataFile.split("\n");
  const idArray = idLine.split("\t");

  const responses = responseLines
    .filter( line => line.length > 1)
    .map(responseLine => responseLine.split("\t")
      .reduce((res, responseToIndex, index) => {
        let cleanedResponse = responseToIndex.trim();
        if (cleanedResponse.startsWith('"') && cleanedResponse.endsWith('"')) {
          cleanedResponse = cleanedResponse.substring(1, cleanedResponse.length - 1).trim();
        }
        res[idArray[index]] = cleanedResponse;
        return res;
      }, {} as Record<string, string>)
    );

  return responses;
};
