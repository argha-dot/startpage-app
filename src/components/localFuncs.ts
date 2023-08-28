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

export function levenshteinDistance(a: string, b: string): number {
  const lenA = a.length;
  const lenB = b.length;

  let distanceMatrix = new Array(lenA + 1)
    .fill(0)
    .map(() => new Array(lenB + 1).fill(0));

  for (let i = 0; i < lenA + 1; i++) {
    distanceMatrix[i][0] = i;
  }

  for (let i = 0; i < lenA + 1; i++) {
    distanceMatrix[0][i] = i;
  }

  for (let i = 1; i < lenA + 1; i++) {
    for (let j = 1; j < lenB + 1; j++) {
      if (a[i - 1] === b[j - 1]) {
        distanceMatrix[i][j] = distanceMatrix[i - 1][j - 1];
      } else {
        distanceMatrix[i][j] = Math.min(
          1 + distanceMatrix[i][j - 1],
          1 + distanceMatrix[i - 1][j],
          1 + distanceMatrix[i - 1][j - 1]
        );
      }
    }
  }

  return distanceMatrix[lenA][lenB];
}
