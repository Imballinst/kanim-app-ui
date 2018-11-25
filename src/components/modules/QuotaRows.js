import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import format from 'date-fns/format';
import idLocale from 'date-fns/locale/id';

import { lightSanjuan } from '../../utils/colors';

const style = StyleSheet.create({
  rowEven: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: lightSanjuan,
  },
  rowOdd: {
    flexDirection: 'row',
    padding: 5,
  },
  flex1: {
    flex: 1,
  },
  header: {
    fontWeight: 'bold',
  },
});

const QuotaRows = ({ quota, dates, onPressQuotaColumn }) => {
  const quotaDates = dates.map((date, idx) => {
    const formattedDate = format(date, 'dddd, DD MMMM YYYY', { locale: idLocale });
    const { morning, afternoon } = quota[date];

    return (
      <View style={idx % 2 === 0 ? style.rowEven : style.rowOdd} key={`quota-kanim-${idx + 1}`}>
        <View style={style.flex1}>
          <Text>{formattedDate}</Text>
        </View>
        <View style={style.flex1}>
          <TouchableOpacity onPress={onPressQuotaColumn(date, 'morning', morning)}>
            <Text>{morning}</Text>
          </TouchableOpacity>
        </View>
        <View style={style.flex1}>
          <TouchableOpacity onPress={onPressQuotaColumn(date, 'afternoon', afternoon)}>
            <Text>{afternoon}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  return (
    <View>
      <View style={style.rowOdd}>
        <View style={style.flex1}>
          <Text style={style.header}>Tanggal</Text>
        </View>
        <View style={style.flex1}>
          <Text style={style.header}>Kuota Pagi</Text>
        </View>
        <View style={style.flex1}>
          <Text style={style.header}>Kuota Siang</Text>
        </View>
      </View>
      {quotaDates}
    </View>
  );
};

QuotaRows.propTypes = {
  quota: PropTypes.object.isRequired,
  dates: PropTypes.array.isRequired,
  onPressQuotaColumn: PropTypes.func.isRequired,
};

export default QuotaRows;
