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

    const { session, treshold } = props.notif.notifModify;

    this.state = {
      session,
      treshold,
    };
  }

  onPressBack = () => {
    const { navigation, notifModify } = this.props;

    navigation.navigate(notifModify.backNavigation);
  }

  onSubmit = () => {
    const {
      addNotification,
      kanim,
      auth,
      notifModify,
    } = this.props;
    const { session, treshold } = this.state;
    const { MU_ID, MU_EMAIL } = auth.user;
    // todo: check date format
    const { date } = notifModify;
    const dates = { startDate: date, endDate: date };

    addNotification(MU_ID, MU_EMAIL, kanim.office.info.MO_ID, session, dates, treshold);
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
    const { moID } = this.props.notif.notifModify;

    return (
      <View style={style.viewStyle}>
        <Text style={localStyle.textStyle}>
          Kanim {this.props.kanim.offices.find(({ MO_ID }) => MO_ID === moID).MO_NAME}
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
            buttonStyle={{ flex: 1 }}
            onPress={this.onPressBack}
            title="Back"
          />
          <Button
            color="#fff"
            backgroundColor={secondaryWilliam}
            buttonStyle={{ flex: 1 }}
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
  notif: PropTypes.object.isRequired,
  notifModify: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  addNotification: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default NotifModify;
