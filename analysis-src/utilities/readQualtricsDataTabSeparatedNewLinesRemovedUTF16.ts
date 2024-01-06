export const readQualtricsDataTabSeparatedNewLinesRemovedUTF16 = async (path: string) => {
  const tabSeparatedDataFileUtf16 = await Deno.readFile(path);
  const tabSeparatedDataFile = new TextDecoder("utf-16").decode(tabSeparatedDataFileUtf16);
  const [idLine, _questionTextLine, _jsonHeaderLine, ...responseLines] = tabSeparatedDataFile.split("\n");
  const idArray = idLine.split("\t");

  const responses = responseLines.map(responseLine => responseLine.split("\t").reduce((res, responseToIndex, index) => {
    res[idArray[index]] = responseToIndex;
    return res;
  }, {} as Record<string, string>));

  return responses;
};
