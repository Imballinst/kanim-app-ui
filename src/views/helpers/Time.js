import format from 'date-fns/format';
import padStart from 'lodash/padStart';

const formatQueryParamsDate = date => format(date, 'YYYY-M-D');
const formatHour = (time) => {
  const padded = padStart(time.toString(), 4, '0');

  return `${padded.substr(0, 2)}:${padded.substr(2, 2)}`;
};

export { formatQueryParamsDate, formatHour };
