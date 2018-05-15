import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import format from 'date-fns/format';
import Modal from 'react-native-modal';

import {
  primaryMineshaft,
  tertiaryAlto,
} from '../utils/colors';
import QuotaRows from './modules/QuotaRows';
import Button from './modules/Button';

const style = StyleSheet.create({
  viewStyle: {
    backgroundColor: tertiaryAlto,
    flex: 1,
    paddingHorizontal: 10,
    height: '100%',
  },
  kanimTitle: {
    marginBottom: 30,
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: tertiaryAlto,
    borderRadius: 4,
    borderColor: primaryMineshaft,
    borderWidth: 1,
    marginVertical: 20,
  },
  modalBody: {
    padding: 11,
  },
  modalFooter: {
    height: 50,
  },
  modalViewButtons: {
    marginLeft: 0,
    marginRight: 0,
    flex: 1,
  },
  modalLeftButton: {
    backgroundColor: tertiaryAlto,
    flex: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: primaryMineshaft,
  },
  modalRightButton: {
    backgroundColor: tertiaryAlto,
    flex: 1,
    borderTopWidth: 1,
    borderColor: primaryMineshaft,
  },
  modalText: {
    fontSize: 16,
    color: '#000',
  },
  backButton: {
    marginTop: 30,
  },
});

class Detail extends React.Component {
  state = {
    modalVisible: false,
    modalID: '',
  }

  onPressBack = () => {
    this.props.navigation.navigate('Home');
  }

  onPressQuotaColumn = (date, session, quota) => () => {
    let modalID;

    if (quota === 0) {
      modalID = 'quotaFull';

      this.setState({
        modalVisible: true,
        modalID,
        modalDate: date,
        modalSession: session,
      });
    } else {
      // Register
      const { confirmQuotaAvailability, office, auth } = this.props;
      const { MO_ID } = office.info;
      const { token } = auth;
      const startHour = session === 'morning' ? 800 : 1200;
      const endHour = session === 'morning' ? 1300 : 1600;
      const formattedDate = format(date, 'YYYY-MM-DD');

      confirmQuotaAvailability(token, MO_ID, formattedDate, startHour, endHour);
    }
  }

  onModalClose = () => {
    this.setState({ modalVisible: false });
  }

  rendermodalContainer() {
    const {
      modalID,
      modalDate,
      modalSession,
    } = this.state;
    const footer = (
      <View style={style.modalFooter}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Button
            containerViewStyle={style.modalViewButtons}
            buttonStyle={style.modalLeftButton}
            textStyle={style.modalText}
            title="Ya"
            onPress={() => {}}
          />
          <Button
            containerViewStyle={style.modalViewButtons}
            buttonStyle={style.modalRightButton}
            textStyle={style.modalText}
            title="Tidak"
            onPress={this.onModalClose}
          />
        </View>
      </View>
    );
    const session = modalSession === 'morning' ? 'pagi' : 'siang';
    let body;

    if (modalID === 'quotaFull') {
      body = (
        <View style={style.modalBody}>
          <Text style={style.modalText}>
            Kuota untuk tanggal {modalDate} sesi {session} sudah penuh. Apakah Anda ingin&nbsp;
            mendapatkan notifikasi apabila kuota sesi ini sudah tersedia?
          </Text>
        </View>
      );
    }

    return (
      <View style={style.modalContainer}>
        {body}
        {footer}
      </View>
    );
  }

  render() {
    const { office, confirmQuotaAttempt } = this.props;
    const { info, quota } = office;

    const quotaDates = Object.keys(quota);
    const filler = confirmQuotaAttempt ?
      <ActivityIndicator size="large" color="#353535" /> :
      <Text>Tidak ada kuota pada kanim ini hingga 3 bulan ke depan</Text>;

    const dates = quotaDates.length ?
      (<QuotaRows
        quota={quota}
        dates={quotaDates}
        onPressQuotaColumn={this.onPressQuotaColumn}
      />) : filler;

    return (
      <View style={style.viewStyle}>
        <Text style={style.kanimTitle}>{info.MO_NAME}</Text>
        {dates}

        <View style={style.backButton}>
          <Button onPress={this.onPressBack} title="Back" />
        </View>

        <Modal
          isVisible={this.state.modalVisible}
          onBackButtonPress={this.onModalClose}
          onBackdropPress={this.onModalClose}
        >
          {this.rendermodalContainer()}
        </Modal>
      </View>
    );
  }
}

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
  office: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  confirmQuotaAttempt: PropTypes.bool.isRequired,
  confirmQuotaAvailability: PropTypes.func.isRequired,
};

export default Detail;
