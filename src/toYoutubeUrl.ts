/**
 * Generate Youtube URL with Video Id
 * @param videoId Youtube ID of video
 */
const toYoutubeUrl = (videoId: string): string => {
  return encodeURI('https://www.youtube.com/watch?v=' + videoId);
};

export default toYoutubeUrl;
