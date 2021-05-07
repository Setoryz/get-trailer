import axios from 'axios';

export const getTrailerVideoId = async (
  tmdbId: string,
  { apiKey, language, category = 'Movie' }: GetTrailerVideoIdOptionsParam,
): Promise<GetTrailerVideoIdResult> => {
  // Endpoint
  const BASEURL = 'https://api.themoviedb.org/3/';
  let ENDPOINT;
  switch (category) {
    case 'Movie':
      ENDPOINT = `${BASEURL}movie/${tmdbId}/videos?api_key=${apiKey}&language=${language}`;
      break;
    case 'TV':
      // TODO: Add option to search based on season of movie
      // ENDPOINT = `${BASEURL}tv/${tmdbId}/season/${seasonNumber}/episode/${episodeNumber}/videos?api_key=${apiKey}&language=${language}`;
      ENDPOINT = `${BASEURL}tv/${tmdbId}/videos?api_key=${apiKey}&language=${language}`;
      break;
  }
  try {
    // Make Request to Search for Videos with TMDB id
    const response = await axios.get<GetTrailerVideoIdResponse>(ENDPOINT);

    if ((<GetIDResponseError>response.data).status_message) {
      return { error: { name: '', message: (<GetIDResponseError>response.data).status_message } };
    }
    const data = <GetTrailerVideoIdResponseData>response.data;
    const youtubeIds = data.results
      .filter((video) => video.type === 'Trailer' || video.type === 'Teaser')
      .map((video) => video.key);

    if (youtubeIds.length === 0) {
      return {
        error: {
          name: 'GetVideoError',
          message: `No Trailer video was found for the search query, try searching ${ENDPOINT} to verify one exists`,
        },
      };
    }

    return { youtubeIds };
  } catch (error) {
    return { error: { ...error, message: 'Error making request, Check your internet connection and try again' } };
  }
};
