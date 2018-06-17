import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View, ScrollView, Text, StyleSheet } from 'react-native';
import format from 'date-fns/format';
import Modal from 'react-native-modal';

import { primaryMineshaft, tertiaryAlto } from '../utils/colors';
import QuotaRows from './modules/QuotaRows';
import Button from './modules/Button';
import PromptModalContent from './modules/PromptModalContent';
import StepIndicator from './modules/StepIndicator';
import TextInput from './modules/TextInput';

const getStepIndex = confirmation => (confirmation ? 1 : 0);
const stepLabels = ['Pilih Waktu', 'Isi Data'];
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
  buttonContainers: {
    marginTop: 30,
    flex: 1,
  },
  textInput: {
    padding: 5,
    marginBottom: 15,
    alignItems: 'stretch',
    color: primaryMineshaft,
  },
  flex1: {
    flex: 1,
  },
});

class KanimDetail extends React.Component {
  state = {
    modalVisible: false,
    modalID: '',
    name: '',
    nik: '',
  }

  onPressBack = () => {
    if (getStepIndex(this.props.confirmation) === 0) {
      this.props.navigation.navigate('KanimList');
    } else {
      this.props.confirmQuotaSync();
      this.setState({
        name: '',
        nik: '',
      });
    }
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
      const { confirmOfficeQuota, office, auth } = this.props;
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

      confirmOfficeQuota(token, MO_ID, formattedDate, startHour, endHour);
    }
  }

  onChange = field => (val) => {
    this.setState({
      [field]: val,
    });
  }

  onModalClose = () => {
    this.setState({ modalVisible: false });
  }

  onPressSubmit = () => {
    this.setState({
      modalVisible: true,
      modalID: 'confirmRegistration',
    });
  }

  onRegisterQueue = () => {
    const {
      registerQueue,
      office,
      auth,
      confirmation,
    } = this.props;
    const { name, nik } = this.state;
    const { token, user } = auth;
    const { timingID } = confirmation;

    registerQueue(office.info.MO_ID, token, 1, user.MU_ID, timingID, name, nik);
    this.setState({
      modalVisible: false,
      modalID: '',
    });
  }

  rendermodalContainer() {
    const {
      modalID,
      modalDate,
      modalSession,
    } = this.state;
    const session = modalSession === 'morning' ? 'pagi' : 'siang';
    const cancelText = 'Tutup';
    let body;
    let confirmText;
    let confirmEvent;

    if (modalID === 'quotaFull') {
      // TODO: edit with some function
      body = (
        <View style={style.modalBody}>
          <Text style={style.modalText}>
            Kuota untuk tanggal {modalDate} sesi {session} sudah penuh. Apakah Anda ingin
            mendapatkan notifikasi apabila kuota sesi ini sudah tersedia?
          </Text>
        </View>
      );
      confirmText = 'Buat Reminder';
    } else if (modalID === 'confirmRegistration') {
      confirmEvent = this.onRegisterQueue;
      body = (
        <View style={style.modalBody}>
          <Text style={style.modalText}>
            Pastikan Anda sudah memasukkan data yang benar
            sebelum menekan tombol &quot;Daftar&quot;.
          </Text>
        </View>
      );
      confirmText = 'Daftar';
    }

    return (
      <PromptModalContent
        onConfirm={confirmEvent}
        onCancel={this.onModalClose}
        confirmText={confirmText}
        cancelText={cancelText}
      >
        {body}
      </PromptModalContent>
    );
  }

  render() {
    const {
      confirmation,
      office,
      getOfficeQuotaAttempt,
      confirmQuotaAttempt,
    } = this.props;
    const step = getStepIndex(confirmation);
    let content;

    if (step === 0) {
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

      content = (
        <View>
          <Text style={style.kanimTitle}>{info.MO_NAME}</Text>
          {dates}

          <View style={style.buttonContainers}>
            <View style={style.flex1}>
              <Button onPress={this.onPressBack} title="Back" />
            </View>
          </View>
        </View>
      );
    } else {
      content = !confirmQuotaAttempt ? (
        <View>
          <TextInput
            placeholder="Nama"
            style={style.textInput}
            value={this.state.name}
            onChangeText={(this.onChange('name'))}
          />
          <TextInput
            placeholder="NIK"
            style={style.textInput}
            value={this.state.nik}
            onChangeText={this.onChange('nik')}
          />

          <View style={style.buttonContainers}>
            <View style={style.flex1}>
              <Button onPress={this.onPressBack} title="Back" />
            </View>
            <View style={style.flex1}>
              <Button onPress={this.onPressSubmit} title="Submit" />
            </View>
          </View>
        </View>
      ) : <ActivityIndicator size="large" color="#353535" />;
    }

    return (
      <ScrollView style={style.viewStyle}>
        <View style={{ marginTop: 10 }}>
          <StepIndicator currentPosition={step} labels={stepLabels} />
        </View>

        {content}

        <Modal
          isVisible={this.state.modalVisible}
          onBackButtonPress={this.onModalClose}
          onBackdropPress={this.onModalClose}
        >
          {this.rendermodalContainer()}
        </Modal>
      </ScrollView>
    );
  }
}

KanimDetail.propTypes = {
  navigation: PropTypes.object.isRequired,
  office: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getOfficeQuotaAttempt: PropTypes.bool.isRequired,
  confirmation: PropTypes.object,
  confirmQuotaAttempt: PropTypes.bool.isRequired,
  confirmQuotaSync: PropTypes.func.isRequired,
  confirmOfficeQuota: PropTypes.func.isRequired,
  registerQueue: PropTypes.func.isRequired,
};

KanimDetail.defaultProps = {
  confirmation: undefined,
};

export default KanimDetail;
