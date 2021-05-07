import axios from 'axios';

// TODO: Add option for Multi
// TODO: Make category optional

/**
 * Funtion to Get Movie Id using Title and Release year
 * @param title MovieTitle
 * @param {options} options
 * @param {apiKey} options.apiKey - Your TMDB API Key
 * @param {year} options.year - Movie Release Year
 * @param {language} options.language - API Request language
 */
const getTmdbId = async (title: string, { apiKey, year, language, category }: GetIdOptions): Promise<GetIDResult> => {
  // Endpoint
  const ENDPOINT = `https://api.themoviedb.org/3/search/${
    category === 'Movie' ? 'movie' : 'tv'
  }?api_key=${apiKey}&query=${encodeURIComponent(title)}${year ? '&year=' + year : ''}&language=${language}`;

  try {
    // Make Request to Search for Movies with Provided Title
    const response = await axios.get<GetIDResponse>(ENDPOINT);

    if ((<GetIDResponseError>response.data).status_message) {
      return { error: { name: '', message: (<GetIDResponseError>response.data).status_message } };
    }
    const data = <GetIDResponseData>response.data;

    // When there is no results with year provided
    if (data.results.length === 0) {
      // TODO: remove console logs
      console.log(ENDPOINT);
      console.log(year);
      let num = 1;
      console.log(num++);

      // Retry Failed Search Without Year
      if (year !== null) {
        const resultWithoutYear = await getTmdbId(title, {
          apiKey,
          year: null,
          language,
          category,
        });
        return resultWithoutYear;
      }

      // No Result with provided query
      return {
        error: {
          name: '',
          message: `No TMDB Movie found with that search query, try searching ${ENDPOINT} to verify one exists`,
        },
      };
    } else {
      return { id: data.results.map(({ id }) => id) };
    }
  } catch (error) {
    //   handleErrors(error);
    return { error: { ...error, message: 'Error making request, Check your internet connection and try again' } };
  }
};

export default getTmdbId;
