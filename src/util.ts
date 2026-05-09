import axios from "axios";

export const BASE_URL = "https://www.omdbapi.com";

export interface MovieResult {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

export interface MovieDetails {
  Title: string;
  Genre: string;
  Plot: string;
  Poster: string;
  Awards: string;
  BoxOffice?: string;
  Metascore: string;
  imdbRating: string;
}

export async function fetchMovies(
  search: string,
): Promise<{ results: MovieResult[]; error: string | null }> {
  const res = await axios.get(BASE_URL, {
    params: { apikey: "4f174979", s: search },
  });
  if (res.data.Response === "False") {
    return { results: [], error: res.data.Error };
  }
  return { results: res.data.Search ?? [], error: null };
}

export function parseBoxOffice(s: string | undefined): number {
  return parseInt((s ?? "").replace(/[$,]/g, "")) || 0;
}

export function parseAwards(s: string): number {
  const matches: string[] = s.match(/\d+/g) ?? [];
  return matches.reduce((sum, n) => sum + parseInt(n), 0);
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
