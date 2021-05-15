import getTrailer from '../index';

describe('Get Trailers', () => {
  describe('Get Movie Trailers', () => {
    it('should return a trailer url', async () => {
      // Act
      const trailer = await getTrailer('Godzilla vs Kong');
      // Assert
      expect(trailer).toEqual('https://www.youtube.com/watch?v=odM92ap8_c0');
      expect(trailer).toContain('https://www.youtube.com/watch?');
    });

    it('should return a trailer youtube video id', async () => {
      // Act
      const trailer = await getTrailer('Godzilla vs Kong', { videoId: true });
      // Assert
      expect(trailer).toEqual('odM92ap8_c0');
    });

    it('should return multiple trailer urls using second argument', async () => {
      // Act
      const trailer = await getTrailer('Godzilla vs Kong', true);
      // Assert
      expect(trailer).toBeInstanceOf(Array);
      expect(trailer).toEqual([
        'https://www.youtube.com/watch?v=odM92ap8_c0',
        'https://www.youtube.com/watch?v=J-FjUN0O61k',
        'https://www.youtube.com/watch?v=w8Pr9V2M-rE',
      ]);
    });

    it('should return multiple trailer urls using option param', async () => {
      // Act
      const trailer = await getTrailer('Godzilla vs Kong', { videoId: true, multi: true });
      // Assert
      expect(trailer).toBeInstanceOf(Array);
      expect(trailer).toEqual(['odM92ap8_c0', 'J-FjUN0O61k', 'w8Pr9V2M-rE']);
    });

    it('should get trailer with tmdb id', async () => {
      // Act
      const trailer = await getTrailer(460465);
      const arrTrailer = await getTrailer(460465, { videoId: true, multi: true });
      const arrTrailer2 = await getTrailer(460465, true);
      // Assert
      expect(trailer).toEqual('https://www.youtube.com/watch?v=jBa_aHwCbC4');
      expect(arrTrailer).toBeInstanceOf(Array);
      expect(arrTrailer).toEqual(['jBa_aHwCbC4']);
      expect(arrTrailer2).toBeInstanceOf(Array);
      expect(arrTrailer2).toEqual(['https://www.youtube.com/watch?v=jBa_aHwCbC4']);
    });

    it('should get trailer with tmdb id as option param', async () => {
      // Act
      const trailer = await getTrailer(null, { tmdbId: '460465' });
      const arrTrailer = await getTrailer(null, { tmdbId: '460465', videoId: true, multi: true });
      // Assert
      expect(trailer).toEqual('https://www.youtube.com/watch?v=jBa_aHwCbC4');
      expect(arrTrailer).toEqual(['jBa_aHwCbC4']);
      expect(arrTrailer).toBeInstanceOf(Array);
    });

    it('should get trailer with language', async () => {
      // Act
      const trailer_1 = await getTrailer(460465, { videoId: true, language: 'de_DE' });
      const trailer_2 = await getTrailer('Mortal Kombat', { language: 'de_DE' });
      // Assert
      expect(trailer_1).toEqual('jBa_aHwCbC4');
      expect(trailer_2).toEqual('https://www.youtube.com/watch?v=jBa_aHwCbC4');
    });

    it('should get trailer with year as option param', async () => {
      // Act
      const trailer_1 = await getTrailer(460465, { multi: true, videoId: true });
      const trailer_2 = await getTrailer('Mortal Kombat', { year: 2021 });
      // Assert
      expect(trailer_1).toEqual(['jBa_aHwCbC4']);
      expect(trailer_2).toEqual('https://www.youtube.com/watch?v=jBa_aHwCbC4');
    });

    it('should get trailer with year as second argument', async () => {
      // Act
      const trailer_1 = await getTrailer(460465, 2021);
      const trailer_2 = await getTrailer('Mortal Kombat', 2021);
      // Assert
      expect(trailer_1).toEqual('https://www.youtube.com/watch?v=jBa_aHwCbC4');
      expect(trailer_2).toEqual('https://www.youtube.com/watch?v=jBa_aHwCbC4');
    });

    it('should get trailer with custom APIKEY', async () => {
      // Act
      const trailer_1 = await getTrailer(460465, {
        multi: true,
        videoId: true,
        apiKey: '9d2bff12ed955c7f1f74b83187f188ae',
      });
      const trailer_2 = await getTrailer('Mortal Kombat', { year: 2021, apiKey: '9d2bff12ed955c7f1f74b83187f188ae' });
      // Assert
      expect(trailer_1).toEqual(['jBa_aHwCbC4']);
      expect(trailer_2).toEqual('https://www.youtube.com/watch?v=jBa_aHwCbC4');
    });
  });

  describe('Get TV Trailers', () => {
    it('should return a TV trailer url', async () => {
      // Act
      const trailer = await getTrailer('Game of Thrones', 'TV');
      // Assert
      expect(trailer).toEqual('https://www.youtube.com/watch?v=bjqEWgDVPe0');
      expect(trailer).toContain('https://www.youtube.com/watch?');
    });

    it('should return a TV trailer url using object param', async () => {
      // Act
      const trailer = await getTrailer('Game of Thrones', { category: 'TV' });
      // Assert
      expect(trailer).toEqual('https://www.youtube.com/watch?v=bjqEWgDVPe0');
      expect(trailer).toContain('https://www.youtube.com/watch?');
    });

    it('should return a TV trailer video id using object param', async () => {
      // Act
      const trailer = await getTrailer('Game of Thrones', { category: 'TV', videoId: true });
      // Assert
      expect(trailer).toEqual('bjqEWgDVPe0');
    });

    it('should return multiple TV trailer url using object param', async () => {
      // Act
      const trailer = await getTrailer('Game of Thrones', { category: 'TV', multi: true });
      // Assert
      expect(trailer).toEqual([
        'https://www.youtube.com/watch?v=bjqEWgDVPe0',
        'https://www.youtube.com/watch?v=BpJYNVhGf1s',
      ]);
    });

    it('should return multiple TV trailer video id using object param', async () => {
      // Act
      const trailer = await getTrailer('Game of Thrones', { category: 'TV', videoId: true, multi: true });
      // Assert
      expect(trailer).toEqual(['bjqEWgDVPe0', 'BpJYNVhGf1s']);
    });

    it('should return multiple TV trailer video id with tmdbId', async () => {
      // Act
      const trailer = await getTrailer(87689, 'TV');
      const arrTrailer = await getTrailer(87689, { category: 'TV', videoId: true, multi: true });
      // Assert
      expect(trailer).toEqual('https://www.youtube.com/watch?v=An0bZpuhiBE');
      expect(arrTrailer).toEqual(['An0bZpuhiBE']);
    });

    it('should return multiple TV trailer video id with tmdbId as option param', async () => {
      // Act
      const trailer = await getTrailer(null, { tmdbId: '87689', category: 'TV' });
      const arrTrailer = await getTrailer(null, { tmdbId: '87689', category: 'TV', videoId: true, multi: true });
      // Assert
      expect(trailer).toEqual('https://www.youtube.com/watch?v=An0bZpuhiBE');
      expect(arrTrailer).toEqual(['An0bZpuhiBE']);
    });

    it('should get TV trailer with language', async () => {
      // Act
      const trailer_1 = await getTrailer(87689, { category: 'TV', videoId: true, language: 'de_DE' });
      const trailer_2 = await getTrailer('Game of Thrones', { category: 'TV', language: 'de_DE', multi: true });
      // Assert
      expect(trailer_1).toEqual('An0bZpuhiBE');
      expect(trailer_2).toEqual([
        'https://www.youtube.com/watch?v=bjqEWgDVPe0',
        'https://www.youtube.com/watch?v=BpJYNVhGf1s',
      ]);
    });

    it('should get TV trailer with year', async () => {
      // Act
      const trailer_1 = await getTrailer(87689, { category: 'TV', videoId: true, year: 2021 });
      const trailer_2 = await getTrailer('Game of Thrones', { category: 'TV', year: 2010, multi: true });
      // Assert
      expect(trailer_1).toEqual('An0bZpuhiBE');
      expect(trailer_2).toEqual([
        'https://www.youtube.com/watch?v=bjqEWgDVPe0',
        'https://www.youtube.com/watch?v=BpJYNVhGf1s',
      ]);
    });

    it('should get TV trailer with custom APIKEY', async () => {
      // Act
      const trailer_1 = await getTrailer(87689, {
        category: 'TV',
        apiKey: '9d2bff12ed955c7f1f74b83187f188ae',
        videoId: true,
      });
      const trailer_2 = await getTrailer('Game of Thrones', {
        category: 'TV',
        apiKey: '9d2bff12ed955c7f1f74b83187f188ae',
        multi: true,
      });
      // Assert
      expect(trailer_1).toEqual('An0bZpuhiBE');
      expect(trailer_2).toEqual([
        'https://www.youtube.com/watch?v=bjqEWgDVPe0',
        'https://www.youtube.com/watch?v=BpJYNVhGf1s',
      ]);
    });
  });

  describe("Don't get empty search", () => {
    it('should return null', async () => {
      // Assert
      await expect(getTrailer(null)).resolves.toBeNull();
    });
  });
});
