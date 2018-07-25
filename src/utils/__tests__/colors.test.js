import * as colorFunctions from '../colors';

const {
  // unused variables
  primaryMineshaft,
  secondaryWilliam,
  tertiaryWhite,
  tertiaryAlto,
  tertiarySanjuan,
  // used functions
  hexToRGB,
  ...untestedFunctions
} = colorFunctions;
// Default counter to 5 because there are 5 constants
let counter = 5;

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
    expect(counter).toBe(Object.keys(colorFunctions).length);
    expect(untestedFunctions).toEqual({});
  });
});
