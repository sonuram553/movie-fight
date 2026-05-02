import axios from "axios";
import { SearchInput } from "./search";

const BASE_URL = "https://www.omdbapi.com";

export const Movie = () => {
  const fetchMovies = (search: string) => {
    axios.get(BASE_URL, {
      params: {
        apikey: "4f174979",
        s: search,
      },
    });
  };

  const onSearchTermChange = (value: string) => {
    fetchMovies(value);
  };
  return <SearchInput onChange={onSearchTermChange} />;
};
