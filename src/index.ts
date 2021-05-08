import getTrailer from './getTrailer';

const main = async () => {
  console.log('starting...');
  console.log('Birds of Prey');
  console.log(await getTrailer('Birds of Prey', { year: 2010 }));
  console.log();
  console.log('Game of Thrones');
  console.log(await getTrailer('Game of Thrones', { category: 'TV', multi: true, videoId: true }));
  console.log();
  // TODO: Add option go get using TMDB ID
  console.log('93484');
  console.log(await getTrailer('93484', { category: 'TV', multi: true, videoId: true }));
  console.log();
  // return getTrailer;
};

main();
