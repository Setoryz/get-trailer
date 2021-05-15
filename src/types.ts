/* eslint-disable @typescript-eslint/no-unused-vars */
type Title = string;
type TmdbId = string;
type APIKey = string;
type Year = number;
type Language = string;
type Category = 'Movie' | 'TV';
// * type Multi = boolean;

interface OptionsParam {
  /** Your IMDB API Key */
  apiKey?: APIKey;
  /** Movie Release Year */
  year?: Year | null;
  /** API Request language - default: 'en-US' */
  language?: Language;
  /** category: **'Movie'** or **'TV'** - default: 'Movie' */
  category?: Category;
}

/**
 * @param {APIKey} apiKey - Your TMDB API Key
 * @param {Year} year - Optional: Movie or TV Release Year
 * @param {Language} language - Optional: API Request language, default: 'en-US'
 * @param {Category} category - Category is either 'TV' or 'Movie', default: 'Movie'
 * @param {boolean} multi - Set to True to Display Multiple results: default: {False}
 * @param {boolean} videoId - Set to True to Display Youtube video Id, default: {False}
 * @param {TmdbId} tmdbID - TmdbId value of Movie or TV
 */
interface GetTrailerOptionsParam extends OptionsParam {
  /** tmdbId of Movie or TV Show */
  tmdbId?: TmdbId;
  /** multi: set to true to return multiple trailers. default: false */
  multi?: boolean;
  /** videoId: Set to true to return youtube video id instead of url. default: false */
  videoId?: boolean;
}

type GetTrailerResult = null | string[] | string;

/**
 * Get Trailer of Movie or TV Show
 * ~~~
 * getTrailer(title, options)
 * getTrailer(tmdbId, options)
 * ~~~
 * @param {Title | number | null} arg1  Title or TMDB ID of movie or TV show
 * @param {Year | GetTrailerOptionsParam | boolean | Category} arg2  **options** | **year** | **multi** | **category**
 * @returns The trailer(s) of TV or Movie
 */
interface GetTrailer {
  /**
   * Get Trailer of Movie or TV Show
   * ~~~
   * getTrailer(title)
   * ~~~
   * @param {Title} title  **title** of movie or TV show
   * @returns The trailer of TV or Movie
   */
  (title: Title): Promise<GetTrailerResult>;
  /**
   * Get Trailer of Movie or TV Show
   * ~~~
   * getTrailer(tmdbId)
   * ~~~
   * @param {number} tmdbId  **tmdbId** of movie or TV show
   * @returns The trailer(s) of TV or Movie
   */
  (tmdbId: number): Promise<GetTrailerResult>;
  /**
   * Get Trailer of Movie or TV Show
   * ~~~
   * getTrailer(title, category)
   * ~~~
   * @param {Title} title  **title** of movie or TV show
   * @param {Category} category **'TV'** or **'Movie'** default=Movie
   * @returns The trailer(s) of TV or Movie
   */
  (title: Title, category?: Category): Promise<GetTrailerResult>;
  /**
   * Get Trailer of Movie or TV Show
   * ~~~
   * getTrailer(tmdbId, category)
   * ~~~
   * @param {number} tmdbId  **tmdbId** of movie or TV show
   * @param {Category} category **'TV'** or **'Movie'** **default:** Movie
   * @returns The trailer(s) of TV or Movie
   */
  (tmdbId: number, category?: Category): Promise<GetTrailerResult>;
  /**
   * Get Trailer of Movie or TV Show
   * ~~~
   * getTrailer(title, multi)
   * ~~~
   * @param {Title} title  **title** of movie or TV show
   * @param {boolean} multi  set to true to return multiple trailers
   * @returns The trailer(s) of TV or Movie
   */
  (title: Title, multi?: boolean): Promise<GetTrailerResult>;
  /**
   * Get Trailer of Movie or TV Show
   * ~~~
   * getTrailer(tmdbId, multi)
   * ~~~
   * @param {number} tmdbId  tmdbId of movie or TV show
   * @param {boolean} multi  set to true to return multiple trailers
   * @returns The trailer(s) of TV or Movie
   */
  (tmdbId: number, multi?: boolean): Promise<GetTrailerResult>;
  /**
   * Get Trailer of Movie or TV Show
   * ~~~
   * getTrailer(tmdbId, year)
   * ~~~
   * @param {number} tmdbId  tmdbId of movie or TV show
   * @param {year} year  release year of Movie or TV show
   * @returns The trailer(s) of TV or Movie
   */
  (tmdbId: number, year?: Year): Promise<GetTrailerResult>;
  /**
   * Get Trailer of Movie or TV Show
   * ~~~
   * getTrailer(title, year)
   * ~~~
   * @param {Title} title  title of movie or TV show
   * @param {year} year  release year of Movie or TV show
   * @returns The trailer(s) of TV or Movie
   */
  (title: Title, year?: Year): Promise<GetTrailerResult>;
  /**
   * Get Trailer of Movie or TV Show
   * ~~~
   * getTrailer(tmdbId, options)
   * getTrailer(tmdbId, {multi, videoId, category, language, year, apiKey})
   * ~~~
   * @param {number} tmdbId  TmdbId of movie or TV show
   * @param {GetTrailerOptionsParam | undefined} options  getTrailerOptions - { multi, videoId, category, language, year, apiKey }
   * @returns The trailer(s) of TV or Movie
   */
  (tmdbId: number, options?: GetTrailerOptionsParam): Promise<GetTrailerResult>;
  /**
   * Get Trailer of Movie or TV Show
   * ~~~
   * getTrailer(title, options)
   * getTrailer(title, {multi, videoId, category, language, year, apiKey})
   * getTrailer(null, {multi, videoId, category, tmdbId, language, year, apiKey})
   * ~~~
   * @param {Title | null} title  Title of movie or TV show
   * @param {GetTrailerOptionsParam | undefined} options  getTrailerOptions - { multi, videoId, category, language, year, apiKey }
   * @returns The trailer(s) of TV or Movie
   */
  (title: Title | null, options?: GetTrailerOptionsParam): Promise<GetTrailerResult>;
}

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
