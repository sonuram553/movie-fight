import { useState, useMemo } from "react";
import { SearchInput } from "./search";
import { MovieDropdown } from "./MovieDropdown";
import { debounce, fetchMovies } from "./util";
import type { MovieResult } from "./util";

export const Movie = () => {
  const [results, setResults] = useState<MovieResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (value: string) => {
        if (!value) {
          setResults([]);
          setError(null);
          return;
        }
        const { results, error } = await fetchMovies(value);
        setResults(results);
        setError(error);
      }),
    [],
  );

  return (
    <div className="relative">
      <SearchInput onChange={debouncedSearch} />
      <MovieDropdown results={results} error={error} />
    </div>
  );
};
