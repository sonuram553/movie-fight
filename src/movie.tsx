import { SearchInput } from "./search";
import { debounce, fetchMovies } from "./util";
import { useMemo } from "react";

export const Movie = () => {
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        fetchMovies(value);
      }),
    [],
  );

  return <SearchInput onChange={debouncedSearch} />;
};
