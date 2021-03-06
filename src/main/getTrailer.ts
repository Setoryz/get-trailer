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
 * ~~~
 * getTrailer(title, options)
 * getTrailer(tmdbId, options)
 * ~~~
 * @param {Title | number | null} arg1  Title or TMDB ID of movie or TV show
 * @param {Year | GetTrailerOptionsParam | boolean | Category} arg2  **options** | **year** | **multi** | **category**
 * @returns The trailer(s) of TV or Movie
 */
const getTrailer: GetTrailer = async (
  titleOrTmdbId: number | Title | null,
  optionsOrYearOrMultiOrCategory?: Year | GetTrailerOptionsParam | boolean | Category,
) => {
  let options: GetTrailerOptionsParam = { ...DefaultOptions };
  let title = null;
  if (typeof titleOrTmdbId === 'number') {
    options.tmdbId = String(titleOrTmdbId);
  } else {
    title = titleOrTmdbId;
  }

  if (typeof optionsOrYearOrMultiOrCategory === 'number') {
    options.year = optionsOrYearOrMultiOrCategory;
  } else if (options.tmdbId && !optionsOrYearOrMultiOrCategory) {
    options = { ...options };
  } else if (typeof optionsOrYearOrMultiOrCategory === 'boolean') {
    options = { ...options, multi: optionsOrYearOrMultiOrCategory };
  } else if (typeof optionsOrYearOrMultiOrCategory === 'string') {
    options = { ...options, category: optionsOrYearOrMultiOrCategory };
  } else if (typeof optionsOrYearOrMultiOrCategory === 'undefined') {
    options = { ...DefaultOptions };
  } else options = { ...options, ...optionsOrYearOrMultiOrCategory };

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
