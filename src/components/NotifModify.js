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
  constructor({ session, treshold }) {
    super();

    this.state = {
      session,
      treshold,
    };
  }

  onPressBack = () => {
    const { navigation, backNavigation } = this.props;

    navigation.navigate(backNavigation);
  }

  onSubmit = () => {}

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

    return (
      <View style={style.viewStyle}>
        <Text style={localStyle.textStyle}>Kanim {this.props.kanim}</Text>
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
  kanim: PropTypes.string.isRequired,
  session: PropTypes.string,
  treshold: PropTypes.number,
  backNavigation: PropTypes.string,
  navigation: PropTypes.object.isRequired,
};

NotifModify.defaultProps = {
  session: 'both',
  treshold: 10,
  backNavigation: 'NotifList',
};

export default NotifModify;
