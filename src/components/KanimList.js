import React from 'react';
import PropTypes from 'prop-types';
import addWeeks from 'date-fns/addWeeks';

import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import {
  primaryMineshaft,
  secondaryWilliam,
  tertiaryAlto,
  hexToRGB,
} from '../utils/colors';
import TextInput from './modules/TextInput';
import RoundedListItem from './modules/RoundedListItem';
import { formatQueryParamsDate } from './helpers/Time';
import filterByProp from './helpers/Object';

const style = StyleSheet.create({
  viewStyle: {
    backgroundColor: tertiaryAlto,
    paddingHorizontal: 10,
    flex: 1,
  },
  kanimOuterItemStyle: {
    marginTop: 10,
  },
  kanimInnerItemStyle: {
    padding: 10,
    backgroundColor: hexToRGB(secondaryWilliam, 0.4),
  },
  kanimOfficeNameStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: primaryMineshaft,
  },
});

class Home extends React.Component {
  state = {
    filter: '',
  }

  componentDidMount() {
    if (!this.props.kanim.offices.length) {
      this.props.getOffices(this.props.auth.token);
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  }

  onClickDetailKanim = id => () => {
    const { token } = this.props.auth;
    const date = new Date();

    const formattedStartDate = formatQueryParamsDate(date);
    const formattedEndDate = formatQueryParamsDate(addWeeks(date, 2));

    this.props.navigation.navigate('KanimDetail');
    this.props.getOffice(token, id, formattedStartDate, formattedEndDate);
  }

  render() {
    const { kanim } = this.props;
    const { filter } = this.state;

    const filteredOffices = filter ?
      filterByProp(kanim.offices, 'MO_NAME', filter) : kanim.offices;
    const listOffices = !kanim.getOfficesAttempt ? filteredOffices.reduce((nodes, cur, idx) => {
      const {
        MO_NAME, MO_ID, MO_ADDRESS, MO_TELP,
      } = cur;
      const office = (
        <RoundedListItem
          key={`list-kanim-${idx + 1}`}
          outerStyle={style.kanimOuterItemStyle}
          innerStyle={style.kanimInnerItemStyle}
          onPress={this.onClickDetailKanim(MO_ID)}
        >
          <View>
            <Text style={style.kanimOfficeNameStyle}>{MO_NAME}</Text>
            <Text style={{ fontSize: 14, color: primaryMineshaft }}>{MO_ADDRESS}</Text>
            <Text style={{ fontSize: 13, color: primaryMineshaft }}>{MO_TELP}</Text>
          </View>
        </RoundedListItem>
      );

      return nodes.concat(office);
    }, []) : <View style={{ marginTop: 10 }}><ActivityIndicator size="large" color="#353535" /></View>;

    return (
      <View style={style.viewStyle}>
        <ScrollView>
          {filteredOffices && filteredOffices.length > 0 && (
            <TextInput
              placeholder="Filter Nama Kanim"
              onChangeText={this.onFilterChange}
              activeColor={primaryMineshaft}
              value={filter}
              inactiveColor={hexToRGB(primaryMineshaft, 0.6)}
            />
          )}
          {listOffices}
        </ScrollView>
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
  getOffice: PropTypes.func.isRequired,
  getOffices: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  kanim: PropTypes.object.isRequired,
};

export { style };
export default Home;
