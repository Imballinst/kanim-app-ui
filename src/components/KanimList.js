import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  DatePickerAndroid,
} from 'react-native';
import format from 'date-fns/format';
import addWeeks from 'date-fns/addWeeks';
import idLocale from 'date-fns/locale/id';
import {
  primaryMineshaft,
  secondaryWilliam,
  tertiaryAlto,
  hexToRGB,
} from '../utils/colors';
import TextInput from './modules/TextInput';
import RoundedListItem from './modules/RoundedListItem';

const style = StyleSheet.create({
  viewStyle: {
    paddingTop: 10,
    backgroundColor: tertiaryAlto,
    paddingHorizontal: 10,
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
const formatShortDate = date => format(date, 'YYYY-M-D', { locale: idLocale });
const filterByProp = (array, prop, filter) => array.filter((obj) => {
  const objectLowercase = obj[prop].toLowerCase();
  const comparedLowercase = filter.toLowerCase();

  return objectLowercase.includes(comparedLowercase);
});

class Home extends React.Component {
  state = {
    startDate: new Date(),
    endDate: addWeeks(new Date(), 2),
    filter: '',
  }

  componentDidMount() {
    if (!this.props.kanim.offices.length) {
      this.props.getOffices(this.props.auth.token);
    }
  }

  onSelectStartDate = field => () => {
    DatePickerAndroid
      .open({ date: new Date() })
      .then(({
        action, year, month, day,
      }) => {
        if (action !== DatePickerAndroid.dismissedAction) {
          this.setState({ [field]: new Date(year, month, day) });
        }
      });
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  }

  onClickDetailKanim = id => () => {
    const { token } = this.props.auth;
    const { startDate, endDate } = this.state;
    const formattedStartDate = formatShortDate(startDate);
    const formattedEndDate = formatShortDate(endDate);

    this.props.navigation.navigate('KanimDetail');
    this.props.getOffice(token, id, formattedStartDate, formattedEndDate);
  }

  render() {
    const { kanim } = this.props;
    const { filter } = this.state;

    const filteredOffices = filter ?
      filterByProp(kanim.offices, 'MO_NAME', filter) : kanim.offices;
    const listOffices = filteredOffices.reduce((nodes, cur, idx) => {
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
    }, []);

    return (
      <ScrollView contentContainerStyle={style.viewStyle}>
        <TextInput
          placeholder="Filter Nama Kanim"
          onChangeText={this.onFilterChange}
          activeColor={primaryMineshaft}
          value={filter}
          inactiveColor={hexToRGB(primaryMineshaft, 0.6)}
        />

        {listOffices}
      </ScrollView>
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
