const BASE62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const N = BASE62.length;

const reverse = (str) => str.split("").reverse().join("");

export const encodeUrl = (id) => {
  let shortUrl = "";
  let i = id;
  while (i) {
    shortUrl += BASE62.charAt((i - 1) % N);
    i = Math.floor((i - 1) / N);
  }
  return reverse(shortUrl);
};
