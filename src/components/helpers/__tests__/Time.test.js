import formatHour from '../Time';

describe('Time', () => {
  it('should return formatted time', () => {
    expect(formatHour('900')).toBe('09:00');
    expect(formatHour(900)).toBe('09:00');
    expect(formatHour('0900')).toBe('09:00');
  });
});
