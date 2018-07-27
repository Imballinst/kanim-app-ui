import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
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
  textStyle: { color: primaryMineshaft },
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
    const { MU_ID, MU_EMAIL } = auth.user;

    const { startDate, _id: notifID } = notification;
    const dates = { startDate, endDate: startDate };

    const notifData = {
      userID: MU_ID,
      email: MU_EMAIL,
      moID: kanim.office.info.MO_ID,
      session,
      dates,
      treshold,
    };

    // Dispatch depending on container
    if (typeof addNotification === 'function') {
      addNotification(notifData);
    } else {
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
      <View style={style.viewStyle}>
        <Text style={localStyle.textStyle}>
          Kanim {office && office.MO_NAME}, Sesi {sessionMap[session]}
        </Text>
        <Text style={localStyle.textStyle}>Sesi</Text>
        <ButtonGroup
          onPress={this.onSessionChange}
          selectedIndex={keys.indexOf(session)}
          buttons={values}
          containerStyle={{ height: 50 }}
        />

        <TextInput
          placeholder="Batas Minimum Reminder Quota"
          style={localStyle.textStyle}
          value={treshold}
          onChangeText={this.onTresholdChange}
          activeColor={primaryMineshaft}
        />

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Button
            color="black"
            backgroundColor={tertiaryWhite}
            containerViewStyle={{ flex: 1 }}
            onPress={this.onPressBack}
            title="Back"
          />
          <Button
            color="#fff"
            backgroundColor={secondaryWilliam}
            containerViewStyle={{ flex: 1 }}
            onPress={this.onSubmit}
            title="Submit"
          />
        </View>
      </View>
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
