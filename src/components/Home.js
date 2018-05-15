import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
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
    this.props.getListKanim(this.props.auth.token);
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

    this.props.navigation.navigate('Detail');
    this.props.getOfficeQuota(token, id, formattedStartDate, formattedEndDate);
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
        <View
          key={`list-kanim-${idx + 1}`}
          style={style.kanimOuterItemStyle}
        >
          <TouchableHighlight
            onPress={this.onClickDetailKanim(MO_ID)}
            underlayColor={hexToRGB(primaryMineshaft, 0.2)}
            style={style.kanimInnerItemStyle}
          >
            <View>
              <Text style={style.kanimOfficeNameStyle}>{MO_NAME}</Text>
              <Text style={{ fontSize: 14, color: primaryMineshaft }}>{MO_ADDRESS}</Text>
              <Text style={{ fontSize: 13, color: primaryMineshaft }}>{MO_TELP}</Text>
            </View>
          </TouchableHighlight>
        </View>
      );

      return nodes.concat(office);
    }, []);

    return (
      <ScrollView contentContainerStyle={style.viewStyle}>
        {/* <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
          <TouchableHighlight
            underlayColor={hexToRGB(primaryMineshaft, 0.2)}
            style={{
              flex: 2,
              flexDirection: 'column',
              paddingVertical: 7.5,
              borderColor: hexToRGB(primaryMineshaft, 0.6),
              borderWidth: 1,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
            onPress={this.onSelectStartDate('startDate')}>
            <Text style={{textAlign: 'center'}}>
              Dari: {formatLongDate(startDate)}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={hexToRGB(primaryMineshaft, 0.2)}
            style={{
              flex: 2,
              flexDirection: 'column',
              paddingVertical: 7.5,
              borderColor: hexToRGB(primaryMineshaft, 0.6),
              borderWidth: 1,
              marginLeft: 5,
            }}
            onPress={this.onSelectStartDate('endDate')}>
            <Text style={{textAlign: 'center'}}>
              Hingga: {formatLongDate(endDate)}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={hexToRGB(primaryMineshaft, 0.6)}
            style={{
              flex: 1,
              flexDirection: 'column',
              paddingVertical: 7.5,
              backgroundColor: primaryMineshaft,
              borderColor: primaryMineshaft,
              borderWidth: 1,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              marginLeft: 5,
            }}
            onPress={() => {}}>
            <Text style={{textAlign: 'center', color: tertiaryWhite }}>Cari kuota</Text>
          </TouchableHighlight>
        </View> */}
        {/* next version */}

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
  getOfficeQuota: PropTypes.func.isRequired,
  getListKanim: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  kanim: PropTypes.object.isRequired,
};

export default Home;
