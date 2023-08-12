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
