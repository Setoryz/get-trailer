import getTrailer from './getTrailer';

const main = async () => {
  console.log('starting...');
  await getTrailer('Birds of Prey', { category: 'Movie' });
  await getTrailer('Game of Thrones', { category: 'TV' });
};

main();
