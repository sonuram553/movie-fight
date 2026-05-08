import axios from "axios";

const BASE_URL = "https://www.omdbapi.com";

export async function fetchMovies(search: string) {
  const res = await axios.get(BASE_URL, {
    params: {
      apikey: "4f174979",
      s: search,
    },
  });

  console.log(res.data);
}

export function debounce(fn, delay = 200) {
  let timeoutId: number;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
