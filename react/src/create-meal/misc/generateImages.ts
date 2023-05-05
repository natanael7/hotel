interface GoogleResponse {
  kind: string;
  url: URL;
  queries: Queries;
  context: Context;
  searchInformation: SearchInformation;
  items: Item[];
}

interface Context {
  title: string;
}

interface Item {
  kind: Kind;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  mime: FileFormat;
  fileFormat: FileFormat;
  image: Image;
}

enum FileFormat {
  ImageJPEG = "image/jpeg",
}

interface Image {
  contextLink: string;
  height: number;
  width: number;
  byteSize: number;
  thumbnailLink: string;
  thumbnailHeight: number;
  thumbnailWidth: number;
}

enum Kind {
  CustomsearchResult = "customsearch#result",
}

interface Queries {
  request: NextPage[];
  nextPage: NextPage[];
}

interface NextPage {
  title: string;
  totalResults: string;
  searchTerms: string;
  count: number;
  startIndex: number;
  inputEncoding: string;
  outputEncoding: string;
  safe: string;
  cx: string;
  searchType: string;
}

interface SearchInformation {
  searchTime: number;
  formattedSearchTime: string;
  totalResults: string;
  formattedTotalResults: string;
}

interface URL {
  type: string;
  template: string;
}

import { ImageInterface } from "../../types";

const get_links = (item: Item) => {
  return { fallback: item.image.thumbnailLink, src: item.link };
};
const endpointGenerator = (apiKey: string, seID: string, query: string) =>
  `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${seID}&q=${query}&searchType=image`;

const API_KEY = "AIzaSyCZO2gq1rObH-_i5s4kUCJg87VftsEjkKA";
const SE_ID = "b59a4b661a3644696";

export default async function generateImages(
  dishName: string,
  max = 9
): Promise<ImageInterface[]> {
  try {
    const res = await fetch(endpointGenerator(API_KEY, SE_ID, dishName));
    const data: GoogleResponse = await res.json();
    const result = data.items.map(get_links);
    while (result.length > max) result.pop();
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}
