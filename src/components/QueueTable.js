import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import { tertiarySanjuan, hexToRGB } from '../../utils/colors';
import QueueRow from './QueueRow';

const style = StyleSheet.create({
  rowEven: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: hexToRGB(tertiarySanjuan, 0.2),
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

const QueueTable = ({ queues, onPress, onDelete }) => {
  const rows = queues.map((queue, idx) => (
    <QueueRow
      style={style}
      idx={idx}
      queue={queue}
      onPress={onPress}
      onDelete={onDelete}
    />
  ));

  return (
    <View>
      <View style={style.rowOdd}>
        <View style={style.flex1}>
          <Text style={style.header}>Tanggal</Text>
        </View>
        <View style={style.flex1}>
          <Text style={style.header}>Nama Pendaftar</Text>
        </View>
        <View style={style.flex1}>
          <Text style={style.header}>Kantor Imigrasi</Text>
        </View>
        <View style={style.flex1}>
          <Text style={style.header}>Jam Kedatangan</Text>
        </View>
      </View>
      {rows}
    </View>
  );
};

QueueTable.propTypes = {
  queues: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default QueueTable;
