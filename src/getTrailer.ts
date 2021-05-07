import getTmdbId from './getTmdbId';
import handleErrors from './handleErrors';

const APIKEY = '77d01fba2d18effb84351218c0d4af8b';
const LANGUAGE = 'en-US';

/**
 * Get Movie Details from TMDB
 * @param title MovieTitle
 * @param {options} options
 * @param {apiKey} options.apiKey - Your TMDB API Key
 * @param {year} options.year - Movie or TV Release Year
 * @param {language} options.language - API Request language
 * @param {category} options.category - Category is either 'TV Show' or 'Movie'
 */
const getTrailer = async (
  title: string,
  { apiKey = APIKEY, year = null, language = LANGUAGE, category }: GetTrailerOptions,
): // TODO: CHANGE RETURN TYPE
Promise<void> => {
  const { id: movieId, error } = await getTmdbId(title.toLowerCase(), {
    apiKey,
    year,
    language,
    category,
  });
  if (error) handleErrors(error);
  else console.log(movieId?.length);
  //   console.log(error);
};

export default getTrailer;
