import React from 'react';
import PropTypes from 'prop-types';
import { View, Button, Text, StyleSheet } from 'react-native';
import format from 'date-fns/format';
import idLocale from 'date-fns/locale/id';

const style = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#c1c3c8',
    flex: 1,
    paddingHorizontal: '16.5%',
    height: '100%',
  },
  kanimTitle: {
    marginBottom: 30,
  },
});

class Detail extends React.Component {
  onPressBack = () => {
    this.props.navigation.navigate('Home');
  }

  render() {
    const { office, getOfficeQuotaAttempt } = this.props;
    const { info, quota } = office;

    const quotaDates = Object.keys(quota);
    const filler = getOfficeQuotaAttempt ?
      <Text>Sedang mengambil data...</Text> :
      <Text>Tidak ada kuota pada kanim ini hingga 3 bulan ke depan</Text>;

    const dates = quotaDates.length ? quotaDates.map((date, idx) => {
      const formattedDate = format(date, 'DD MMMM YYYY', { locale: idLocale });
      const { morning, afternoon } = quota[date];

      return (
        <Text key={`kanim-date-${idx + 1}`}>
          {formattedDate}: {morning} (pagi), {afternoon} (siang)
        </Text>
      );
    }) : filler;

    return (
      <View style={style.viewStyle}>
        <Text style={style.kanimTitle}>{info.MO_NAME}</Text>
        {dates}

        <Button onPress={this.onPressBack} title="Back" />
      </View>
    );
  }
}

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
  office: PropTypes.object.isRequired,
  getOfficeQuotaAttempt: PropTypes.bool.isRequired,
};

export default Detail;
