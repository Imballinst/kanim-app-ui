import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import idLocale from 'date-fns/locale/id';

import formatHour from '../helpers/Time';

const QueueRow = ({
  style, idx, queue, onPress,
}) => {
  const {
    StartHour: startHour,
    EndHour: endHour,
    ServiceDate: serviceDate,
    NAMA_PENGANTRI: name,
    OfficeName: officeName,
    data_qr: qrCode,
  } = queue;
  const parsedDate = parse(serviceDate, 'MMM D, YYYY');
  const formattedDate = format(parsedDate, 'dddd, DD MMMM YYYY', { locale: idLocale });

  return (
    <View style={idx % 2 === 0 ? style.rowEven : style.rowOdd} key={`queue-row-${idx + 1}`}>
      <TouchableOpacity onPress={onPress(qrCode)}>
        <View style={style.flex1}>
          <Text>{formattedDate}</Text>
        </View>
        <View style={style.flex1}>
          <Text>{name}</Text>
        </View>
        <View style={style.flex1}>
          <Text>{officeName}</Text>
        </View>
        <View style={style.flex1}>
          <Text>{formatHour(startHour)} - {formatHour(endHour)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

QueueRow.propTypes = {
  style: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  queue: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default QueueRow;
