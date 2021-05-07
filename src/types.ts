type Title = string;
type APIKey = string;
type Year = number;
type Language = string;
type Category = 'Movie' | 'TV';
// * type Multi = boolean;

interface GetTrailerOptions {
  /**Your IMDB API Key */
  apiKey?: APIKey;
  /**Movie Release Year */
  year?: Year | null;
  /**API Request language */
  language?: Language;
  /**
   * Category of Movie:
   * Either Movie or TV
   */
  category: Category;
}

interface GetIdOptionsParam extends Omit<Required<GetTrailerOptions>, 'year'> {
  year?: Year | null;
}

// type ErrorMessage = string;

type GetIDResult = {
  id?: string[];
  error?: Error;
};

interface GetIDResponseDataResult {
  //   poster_path: string | null;
  //   adult: boolean;
  //   overview: string;
  //   release_date: string;
  //   genre_ids: number[];
  id: string;
  //   original_title: string;
  //   original_language: string;
  title: string; // TODO: --VERBOSE SHOW TITLE
  //   backdrop_path: string | null;
  //   popularity: number;
  //   vote_count: number;
  //   video: boolean;
  //   vote_average: number;
}
interface GetIDResponseData {
  page: number;
  results: GetIDResponseDataResult[];
  total_results: number;
  total_pages: number;
}
interface GetIDResponseError {
  status_message: string;
  status_code: number;
}

type GetIDResponse = GetIDResponseData | GetIDResponseError;

declare type GetTmdbId = (title: Title, options: GetIdOptionsParam) => Promise<GetIDResult>;
interface GetTrailerVideoIdOptionsParam extends Omit<Required<GetTrailerOptions>, 'year' | 'category'> {
  category?: Category;
}
// TODO: CHANGE
type GetTrailerVideoIdResult = { youtubeIds?: string[]; error?: Error };
type VideoType = 'Trailer' | 'Teaser' | 'Clip' | 'Behind the Scenes' | 'Bloopers' | 'Recap';
type VideoSite = 'Youtube' | 'Video';
interface GetTrailerVideoIdResponseDataResult {
  id: number;
  // iso_639_1: string;
  // iso_3166_1: string;
  key: string;
  // name: string;
  site: VideoSite;
  // size: number;
  type: VideoType;
}
interface GetTrailerVideoIdResponseData {
  id: number;
  results: GetTrailerVideoIdResponseDataResult[];
}
type GetTrailerVideoIdResponse = GetTrailerVideoIdResponseData | GetIDResponseError;
// declare type GetDetails = () => Promise<void>;
