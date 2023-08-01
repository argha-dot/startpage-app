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
}

function isUrl(str: string) {
  var regex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  if(!regex .test(str)) {
    return false;
  } else {
    return true;
  }
}

const parseQueryString = (query: string): string => {
  console.log(query);
  switch (query.substring(0, 2)) {
    case "g!":
      return `https://google.com/search?q=${query.substring(2)}`;
    case "d!":
      return `https://duckduckgo.com/?q=${query.substring(2)}`;
    case "yt!":
      return `https://www.youtube.com/results?search_query=${query.substring(
        2
      )}`;
    case "b!":
      return `https://search.brave.com/search?q=${query.substring(2)}`;
    default:
      return getDefaultUrl(query)
  }
};

const ENGINES_MAP = {
  duck: "https://duckduckgo.com/?q=",
  google: "https://google.com/search?q=",
};

export default parseQueryString;
export { ENGINES_MAP };
