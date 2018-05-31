import padStart from 'lodash/padStart';

export default (time) => {
  const padded = padStart(time.toString(), 4, '0');

  return `${padded.substr(0, 2)}:${padded.substr(2, 2)}`;
};
