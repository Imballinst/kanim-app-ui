import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import Button from './modules/Button';

const style = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#c1c3c8',
    flex: 1,
    paddingHorizontal: '16.5%',
    height: '100%',
  },
});

class NotifDetail extends React.Component {
  onPressBack = () => {
    this.props.navigation.navigate('NotifList');
  }

  render() {
    const sessionName = {
      morning: 'pagi',
      afternoon: 'siang',
      both: 'pagi/siang',
    };
    const { notif, kanim } = this.props;
    const { getNotificationAttempt, notification } = notif;
    const { getOfficesAttempt } = kanim;

    let placeholder;

    if (notification && !getNotificationAttempt && !getOfficesAttempt) {
      const {
        moID,
        session,
        startDate,
        treshold,
      } = notification;

      placeholder = (
        <View>
          <Text>{kanim.offices.find(({ MO_ID }) => MO_ID === moID).MO_NAME}</Text>
          <Text>{startDate} - Sesi {sessionName[session]}</Text>
          <Text>Treshold {treshold}</Text>
        </View>
      );
    } else if (getNotificationAttempt || getOfficesAttempt) {
      placeholder = <ActivityIndicator size="large" color="#353535" />;
    }

    return (
      <View style={style.viewStyle}>
        {placeholder}

        <Button onPress={this.onPressBack} title="Back" />
      </View>
    );
  }
}

NotifDetail.propTypes = {
  navigation: PropTypes.object.isRequired,
  kanim: PropTypes.object.isRequired,
  notif: PropTypes.object.isRequired,
};

export default NotifDetail;
