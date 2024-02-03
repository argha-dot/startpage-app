import { levenshteinDistance } from "../localFuncs";

const getDefaultUrl = (str: string): string => {
  if (isURL(str)) return str;
  if (isUrl(`https://${str}`)) return `https://${str}`;

  return `https://duckduckgo.com/?q=${str}`;
};

const isURL = (str: string): boolean => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

function isUrl(str: string) {
  var regex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  if (!regex.test(str)) {
    return false;
  } else {
    return true;
  }
}

const parseQueryString = (query: string): string => {
  switch (query.substring(0, 2)) {
    case "g!":
      return `https://google.com/search?q=${query.substring(2)}`;
    case "d!":
      return `https://duckduckgo.com/?q=${query.substring(2)}`;
    case "yt!":
      return `https://www.youtube.com/results?search_query=${query.substring(
        2,
      )}`;
    case "b!":
      return `https://search.brave.com/search?q=${query.substring(2)}`;
    default:
      return getDefaultUrl(query);
  }
};

const ENGINES_MAP = {
  duck: "https://duckduckgo.com/?q=",
  google: "https://google.com/search?q=",
};

const fuzzy = (text: string, query: string): boolean => {
  text = text.toLowerCase();
  query = query.toLowerCase();
  let n = -1;
  let l;

  if (query.length <= 0) return false;

  for (let i = 0; (l = query[i++]); ) {
    n = text.indexOf(l, n + 1);
    if (n === -1) {
      return false;
    }
  }

  return true;
};

const fuzzySearch = (text: string, query: string): boolean => {
  query = query.toLowerCase();
  text = text.toLowerCase();

  let matches = 0;

  if (text.indexOf(query) > -1) return true;

  if (fuzzy(text, query)) {
    for (let i = 0; i < query.length; i++) {
      text.indexOf(query[i]) > -1 ? (matches += 1) : (matches -= 1);
    }
  }

  return matches / text.length > 0.3;
};

const fuzzySearchOnLinks = (
  query: string,
  links: [string, string][],
): [string, string][] => {
  const val: [string, string][] = [];

  links.forEach(([resultName, link]) => {
    if (fuzzySearch(resultName, query) || fuzzySearch(link.slice(7), query)) {
      val.push([resultName, link]);
    }
  });

  return val;
};

export interface SearchResultI {
  link: string;
  title: string;
}

export default parseQueryString;
export { ENGINES_MAP, fuzzySearchOnLinks, fuzzySearch };
