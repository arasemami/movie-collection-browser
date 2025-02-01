export interface Movie {
  id: number;
  title: string;
  releaseYear: number;
  genre: string;
  posterPath: string;
  isWatckList: Boolean;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: string;
  credits: {
    cast: {
      profile_path: string;
      name: string;
    }[]
  };
}