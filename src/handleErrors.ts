/**
 * Handle Error from Request
 * @param error Error to be handled
 */
const handleErrors = (error: Error): void => {
  console.warn(error);
  const message = error && error.message ? error.message : error;
  console.warn(`movie-trailer: ${message}`);
};

export default handleErrors;
