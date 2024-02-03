export function loadState(key: string) {
  try {
    const data = localStorage.getItem(key);
    if (!data) return undefined;

    return JSON.parse(data);
  } catch (error) {
    return undefined;
  }
}

type SavableData = string | number | object | boolean | undefined | null;
export async function saveState(key: string, state: SavableData) {
  try {
    const data = JSON.stringify(state);
    localStorage.setItem(key, data);
  } catch (error) {
    console.warn(error);
  }
}

export function levenshteinDistance(s: string, t: string): number {
  if (!s.length) return t.length;
  if (!t.length) return s.length;

  const arr: number[][] = [];

  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];

    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1),
            );
    }
  }
  return arr[t.length][s.length];
}
