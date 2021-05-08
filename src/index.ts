import getTrailer from './getTrailer';

const main = async () => {
  console.log('starting...');
  console.log('Birds of Prey');
  console.log(await getTrailer('Birds of Prey', { year: 2010 }));

  console.log();
  console.log('Game of Thrones');
  console.log(await getTrailer('Game of Thrones', { category: 'TV', multi: true, videoId: true }));
  console.log();

  console.log('93484');
  console.log(await getTrailer(null, { category: 'TV', multi: true, tmdbId: '93484' }));
  console.log();
  // return getTrailer;
};

main();
