const isValidUrl = (str: string): boolean => {
  try {
    new URL(str);
		return true;
	} catch {
    return false
	}

}

const parseQueryString = (query: string): string => {
  console.log(query)
  switch (query.substring(0, 2)) {
    case "g!":
      return `https://google.com/search?q=${query.substring(2)}`
    case "d!":
      return `https://duckduckgo.com/?q=${query.substring(2)}`
    case "yt!":
		  return `https://www.youtube.com/results?search_query=${query.substring(2)}`
    case "b!":
		  return `https://search.brave.com/search?q=${query.substring(2)}`
    default:
      return isValidUrl(query) ? query : `https://duckduckgo.com/?q=${query}`
  }
}

const ENGINES_MAP = {
  "duck": "https://duckduckgo.com/?q=",
  "google": "https://google.com/search?q=",
}

export default parseQueryString;
export {
  ENGINES_MAP
}
