// Custom function to check if the given string is present in the Local storage or not
export function checkInLocalStorage(key: string): null | any {
  const value = localStorage.getItem(key);
  return value;
}

// Custom function to update the key and value inside Local storage
export function setInLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

// Get the hostName from the given URL
export function getHostName(url: string): string | null {
  try {
    const newUrl = new URL(url);
    return newUrl.hostname;
  } catch (err) {
    console.log("error on creating URL", err);
    return null;
  }
}
