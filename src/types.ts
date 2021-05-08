/* eslint-disable @typescript-eslint/no-unused-vars */
type Title = string;
type TmdbId = string;
type APIKey = string;
type Year = number;
type Language = string;
type Category = 'Movie' | 'TV';
// * type Multi = boolean;

interface OptionsParam {
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
  category?: Category;
}

interface GetTrailerOptionsParam extends OptionsParam {
  multi?: boolean;
  videoId?: boolean;
}

type GetTrailerResult = null | string[] | string;

declare type GetTrailer = (title: Title, options?: GetTrailerOptionsParam) => Promise<GetTrailerResult>;

interface GetTmdbIdOptionsParam extends Omit<Required<OptionsParam>, 'year'> {
  year?: Year | null;
}

// type ErrorMessage = string;

type GetTmdbIDResult = {
  id?: string;
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
  name: string; // TODO: --VERBOSE SHOW TITLE
  //   backdrop_path: string | null;
  //   popularity: number;
  //   vote_count: number;
  //   video: boolean;
  //   vote_average: number;
}
interface GetTmdbIDResponseData {
  page: number;
  results: GetIDResponseDataResult[];
  total_results: number;
  total_pages: number;
}
interface GetIDResponseError {
  status_message: string;
  status_code: number;
}

type GetIDResponse = GetTmdbIDResponseData | GetIDResponseError;

declare type GetTmdbId = (title: Title, options: GetTmdbIdOptionsParam) => Promise<GetTmdbIDResult>;
type GetTrailerVideoIdOptionsParam = Omit<Required<OptionsParam>, 'year'>;
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
declare type GetTrailerVideoId = (
  tmdbId: TmdbId,
  options: GetTrailerVideoIdOptionsParam,
) => Promise<GetTrailerVideoIdResult>;
