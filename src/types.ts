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

interface GetIdOptions extends Omit<Required<GetTrailerOptions>, 'year'> {
  year?: Year | null;
}

type ErrorMessage = string;

type GetIDResult = {
  id?: number[];
  error?: Error;
};

interface GetIDResponseDataResult {
  //   poster_path: string | null;
  //   adult: boolean;
  //   overview: string;
  //   release_date: string;
  //   genre_ids: number[];
  id: number;
  //   original_title: string;
  //   original_language: string;
  //   title: string;
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
