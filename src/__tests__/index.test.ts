import getTrailer from '../index';

describe('Test Setup', () => {
  it('should return a string', () => {
    expect(getTrailer('test')).toContain('test');
  });
});
