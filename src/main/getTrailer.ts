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
  tmdbId: undefined,
  category: 'Movie',
  multi: false,
  videoId: false,
};
/**
 * Get Trailer of Movie or TV Show
 * @param {string} title Title of the Movie:
 * @param {GetTrailerOptionsParam} options - Optional: Configure getTrailer options
 * @param {APIKey} options.apiKey - Your TMDB API Key
 * @param {Year} options.year - Optional: Movie or TV Release Year
 * @param {Language} options.language - Optional: API Request language, default: 'en-US'
 * @param {Category} options.category - Category is either 'TV' or 'Movie', default: 'Movie'
 * @param {boolean} options.multi - Set to True to Display Multiple results: default: {False}
 * @param {boolean} options.videoId - Set to True to Display Youtube video Id instead of URL
 */
const getTrailer: GetTrailer = async (
  titleOrTmdbId: number | Title | null,
  optionsOrYearOrMulti?: Year | GetTrailerOptionsParam | boolean,
) => {
  let options: GetTrailerOptionsParam = { ...DefaultOptions };
  let title = null;
  if (typeof titleOrTmdbId === 'number') {
    options.tmdbId = String(titleOrTmdbId);
  } else {
    title = titleOrTmdbId;
  }

  if (typeof optionsOrYearOrMulti === 'number') {
    options.year = optionsOrYearOrMulti;
  } else if (options.tmdbId && !optionsOrYearOrMulti) {
    options = { ...options };
  } else if (typeof optionsOrYearOrMulti === 'boolean') {
    options = { ...options, multi: optionsOrYearOrMulti };
  } else if (typeof optionsOrYearOrMulti === 'undefined') {
    options = { ...DefaultOptions };
  } else options = { ...options, ...optionsOrYearOrMulti };

  const {
    apiKey = APIKEY,
    year,
    language = LANGUAGE,
    category = 'Movie',
    tmdbId,
    multi,
    videoId,
  }: GetTrailerOptionsParam = options;

  let tmdbIdToUse;
  if (title) {
    const { id: tmdbIdResult, error: getIdError } = await getTmdbId(title.toLowerCase(), {
      apiKey,
      year,
      language,
      category,
    });
    if (getIdError) {
      handleErrors(getIdError);
      return null;
    } else if (!tmdbIdResult) return null;
    tmdbIdToUse = tmdbIdResult;
    // } else if (!title && tmdbId) {
  } else if (tmdbId) {
    tmdbIdToUse = tmdbId;
  } else {
    return null;
  }

  const { youtubeIds: videosIds, error: getVideoIdError } = await getTrailerVideoId(tmdbIdToUse, {
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
