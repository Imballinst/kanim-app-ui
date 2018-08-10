import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

import { style } from './KanimList';
import Button from './modules/Button';
import TextInput from './modules/TextInput';
import {
  primaryMineshaft,
  secondaryWilliam,
  tertiaryWhite,
} from '../utils/colors';

const localStyle = StyleSheet.create({
  textStyle: { color: primaryMineshaft, fontSize: 14 },
  labelStyle: {
    fontSize: 14,
    paddingHorizontal: 4,
    fontWeight: 'bold',
    color: primaryMineshaft,
  },
  kanimTitle: {
    marginBottom: 30,
    fontSize: 22,
    fontWeight: 'bold',
  },
});

class NotifModify extends React.Component {
  constructor(props) {
    super(props);

    const { session, treshold } = props.notification;

    this.state = {
      session,
      treshold,
    };
  }

  onPressBack = () => {
    const {
      navigation,
      notification,
    } = this.props;

    navigation.navigate(notification.backNavigation);
  }

  onSubmit = () => {
    const {
      addNotification,
      editNotification,
      kanim,
      auth,
      notification,
    } = this.props;
    const { session, treshold } = this.state;
    const { MU_ID } = auth.user;
    let notifData = { session, treshold, userID: MU_ID };

    if (typeof addNotification === 'function') {
      // Since the notification is new, we need all possible data
      const { startDate } = notification;
      const dates = { startDate, endDate: startDate };

      notifData = {
        ...notifData,
        userID: MU_ID,
        dates,
        moID: kanim.office.info.MO_ID,
      };

      addNotification(notifData);
    } else {
      // We only need notifID, session, and treshold
      // Because only these things are changeable, everything else are contained inside notifID
      const { _id: notifID } = notification;

      editNotification(notifID, notifData);
    }
  }

  onSessionChange = (selectedIndex) => {
    const indexWord = ['both', 'morning', 'afternoon'];

    this.setState({ session: indexWord[selectedIndex] });
  }

  onTresholdChange = (treshold) => {
    this.setState({ treshold });
  }

  render() {
    const { session, treshold } = this.state;
    const sessionMap = {
      both: 'Pagi/Siang',
      morning: 'Pagi',
      afternoon: 'Siang',
    };
    const values = Object.values(sessionMap);
    const keys = Object.keys(sessionMap);
    const { kanim, notification } = this.props;
    const office = kanim.offices.find(({ MO_ID }) => MO_ID === notification.moID);

    return (
      <ScrollView style={style.viewStyle} keyboardShouldPersistTaps="handled">
        <Text style={localStyle.kanimTitle}>
          {office && office.MO_NAME}, {notification.startDate}
        </Text>

        <Text style={localStyle.labelStyle}>Pilih Sesi</Text>
        <ButtonGroup
          onPress={this.onSessionChange}
          selectedIndex={keys.indexOf(session)}
          buttons={values}
          containerStyle={{
 height: 50, marginLeft: 0, marginRight: 0, borderRadius: 5,
}}
          containerBorderRadius={5}
          selectedButtonStyle={{ backgroundColor: secondaryWilliam }}
          selectedTextStyle={{ color: '#fff' }}
        />

        <TextInput
          placeholder="Minimal Kuota untuk Notifikasi"
          style={localStyle.textStyle}
          value={treshold}
          onChangeText={this.onTresholdChange}
          activeColor={primaryMineshaft}
        />

        <View style={{ flex: 1, flexDirection: 'row', marginTop: 30 }}>
          <Button
            color="black"
            backgroundColor={tertiaryWhite}
            containerViewStyle={{ flex: 1 }}
            borderRadius={5}
            onPress={this.onPressBack}
            title="Back"
          />
          <Button
            color="#fff"
            backgroundColor={secondaryWilliam}
            containerViewStyle={{ flex: 1 }}
            borderRadius={5}
            onPress={this.onSubmit}
            title="Submit"
          />
        </View>
      </ScrollView>
    );
  }
}

NotifModify.propTypes = {
  kanim: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addNotification: PropTypes.func,
  editNotification: PropTypes.func,
  notification: PropTypes.object,
};

NotifModify.defaultProps = {
  notification: {},
  addNotification: undefined,
  editNotification: undefined,
};

export default NotifModify;
