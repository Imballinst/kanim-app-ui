import { formatHour, formatQueryParamsDate } from '../Time';

describe('Time', () => {
  it('should return formatted time', () => {
    expect(formatHour('900')).toBe('09:00');
    expect(formatHour(900)).toBe('09:00');
    expect(formatHour('0900')).toBe('09:00');
  });

  it('should return date in query params format', () => {
    const date1 = new Date(2018, 0, 13);
    const date2 = new Date(2018, 5, 13);

    expect(formatQueryParamsDate(date1)).toBe('2018-1-13');
    expect(formatQueryParamsDate(date2)).toBe('2018-6-13');
  });
});
