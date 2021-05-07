import getTmdbId from './getTmdbId';
import { getTrailerVideoId } from './getTrailerVideoId';
import handleErrors from './handleErrors';
import toYoutubeUrl from './toYoutubeUrl';

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
  const { id: tmdbId, error: getIdError } = await getTmdbId(title.toLowerCase(), {
    apiKey,
    year,
    language,
    category,
  });

  if (getIdError) {
    handleErrors(getIdError);
    return;
  }
  if (tmdbId) {
    const { youtubeIds, error: getVideoIdError } = await getTrailerVideoId(tmdbId[0], { apiKey, language, category });
    if (getVideoIdError) {
      handleErrors(getVideoIdError);
      return;
    }
    console.log(youtubeIds?.map((videoId) => toYoutubeUrl(videoId)));
  }
  //   console.log(error);
};

export default getTrailer;
