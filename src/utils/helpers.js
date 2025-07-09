export const generateShortcode = () =>
  Math.random().toString(36).substring(2, 7);

export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
