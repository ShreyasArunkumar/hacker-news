export function checkInLocalStorage(key: string): null | any {
  const value = localStorage.getItem(key);
  return value;
}

export function setInLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getHostName(url: string): string | null {
  try {
    const newUrl = new URL(url);
    return newUrl.hostname;
  } catch (err) {
    console.log("error on creating URL", err);
    return null;
  }
}
