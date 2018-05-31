import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import format from 'date-fns/format';
import Modal from 'react-native-modal';

import { tertiaryAlto } from '../utils/colors';
import QuotaRows from './modules/QuotaRows';
import Button from './modules/Button';
import PromptModalContent from './modules/PromptModalContent';

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
  modalBody: {
    padding: 11,
  },
  modalText: {
    fontSize: 16,
    color: '#000',
  },
  backButton: {
    marginTop: 30,
  },
});

class KanimDetail extends React.Component {
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
      const { checkOfficeQuota, office, auth } = this.props;
      const { MO_ID } = office.info;
      const { token } = auth;
      const formattedDate = format(date, 'YYYY-MM-DD');
      let startHour;
      let endHour;

      if (session === 'morning') {
        startHour = 800;
        endHour = 1300;
      } else {
        startHour = 1200;
        endHour = 1600;
      }

      checkOfficeQuota(token, MO_ID, formattedDate, startHour, endHour);
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
    const session = modalSession === 'morning' ? 'pagi' : 'siang';
    let body;

    if (modalID === 'quotaFull') {
      body = (
        <View style={style.modalBody}>
          <Text style={style.modalText}>
            Kuota untuk tanggal {modalDate} sesi {session} sudah penuh. Apakah Anda ingin
            mendapatkan notifikasi apabila kuota sesi ini sudah tersedia?
          </Text>
        </View>
      );
    }

    return (
      <PromptModalContent
        onModalClose={this.onModalClose}
        confirmText="Ya"
        cancelText="Tidak"
      >
        {body}
      </PromptModalContent>
    );
  }

  render() {
    const { office, getOfficeQuotaAttempt } = this.props;
    const { info, quota } = office;

    const quotaDates = Object.keys(quota);
    const filler = getOfficeQuotaAttempt ?
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

KanimDetail.propTypes = {
  navigation: PropTypes.object.isRequired,
  office: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getOfficeQuotaAttempt: PropTypes.bool.isRequired,
  // confirmQuotaAttempt: PropTypes.bool.isRequired,
  checkOfficeQuota: PropTypes.func.isRequired,
};

export default KanimDetail;
