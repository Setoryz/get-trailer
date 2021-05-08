import getTmdbId from './getTmdbId';
import { getTrailerVideoId } from './getTrailerVideoId';
import handleErrors from './handleErrors';
import toYoutubeUrl from './toYoutubeUrl';

const APIKEY = '77d01fba2d18effb84351218c0d4af8b';
const LANGUAGE = 'en-US';
const DefaultOptions: GetTrailerOptionsParam = {
  apiKey: APIKEY,
  year: null,
  language: LANGUAGE,
  category: 'Movie',
  multi: false,
  videoId: false,
};
/**
 * Get Movie Details from TMDB
 * @param title MovieTitle
 * @param {options} options
 * @param {apiKey} options.apiKey - Your TMDB API Key
 * @param {year} options.year - Optional: Movie or TV Release Year
 * @param {language} options.language - Optional: API Request language, default value is 'en-US'
 * @param {category} options.category - Category is either 'TV' or 'Movie', default value is set to 'Movie when  not provided
 * @param {multi} options.multi - Set to True to Display Multiple results , default value is false
 * @param {videId} options.multi - Set to True to Display Youtube video Id instead of URL
 */
const getTrailer: GetTrailer = async (
  title: string,
  {
    apiKey = APIKEY,
    year = null,
    language = LANGUAGE,
    category = 'Movie',
    multi = false,
    videoId = false,
  }: GetTrailerOptionsParam = DefaultOptions,
) => {
  const { id: tmdbId, error: getIdError } = await getTmdbId(title.toLowerCase(), {
    apiKey,
    year,
    language,
    category,
  });

  if (getIdError) {
    handleErrors(getIdError);
    return null;
  }

  if (!tmdbId) return null;

  const { youtubeIds: videosIds, error: getVideoIdError } = await getTrailerVideoId(tmdbId, {
    apiKey,
    language,
    category,
  });
  if (getVideoIdError) {
    handleErrors(getVideoIdError);
    return null;
  }

  if (!videosIds) return null;

  if (!multi) return videoId ? videosIds[0] : toYoutubeUrl(videosIds[0]);

  return videoId ? videosIds : videosIds.map((videoId) => toYoutubeUrl(videoId));
};

export default getTrailer;
