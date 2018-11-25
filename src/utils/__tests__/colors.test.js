import * as colorFunctions from '../colors';

const {
  hexToRGB,
  ...untestedFunctions
} = colorFunctions;
let counter = 0;

describe('colors (utils/colors)', () => {
  afterEach(() => {
    counter += 1;
  });

  it('should return correct color after convert', () => {
    const red = '#00ffff';

    expect(hexToRGB(red)).toBe(`rgba(0, 255, 255, 1)`);
    expect(hexToRGB(red, 0.5)).toBe(`rgba(0, 255, 255, 0.5)`);
  });
});

describe('colors counters (utils/colors)', () => {
  it('should test all action creators', () => {
    const length = Object.values(untestedFunctions).reduce((sum, cur) => {
      let remaining = 0;

      if (typeof cur !== 'function') {
        remaining += 1;
      }

      return sum + remaining;
    }, 0);

    expect(counter).toBe(Object.keys(colorFunctions).length - length);
  });
});
