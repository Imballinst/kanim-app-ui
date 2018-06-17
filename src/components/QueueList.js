import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode';

import { primaryMineshaft } from '../utils/colors';
import { style } from './KanimList';
import RoundedListItem from './modules/RoundedListItem';
import PromptModalContent from './modules/PromptModalContent';
import { formatHour } from './helpers/Time';

class QueueList extends React.Component {
  state = {
    modalVisible: false,
    qrCode: '',
  }

  componentDidMount() {
    if (!this.props.queue.isQueueExist) {
      this.props.getQueues(this.props.auth.token);
    }
  }

  onItemPress = qrCode => () => {
    this.setState({
      modalID: 'qrCode',
      modalVisible: true,
      modalData: { qrCode },
    });
  }

  onItemLongPress = queueNumber => () => {
    console.log('xd');
    this.setState({
      modalID: 'cancelQueue',
      modalVisible: true,
      modalData: { queueNumber },
    });
  }

  onCancelQueue = queueNumber => () => {
    const { auth, cancelQueue } = this.props;

    cancelQueue(auth.token, queueNumber);
  }

  onModalClose = () => {
    this.setState({
      modalVisible: false,
      qrCode: '',
    });
  }

  renderModal() {
    const { modalID, modalVisible, modalData } = this.state;
    console.log(this.state);
    if (modalID === 'qrCode') {
      return (
        <Modal
          isVisible={modalVisible}
          onBackButtonPress={this.onModalClose}
          onBackdropPress={this.onModalClose}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={{ backgroundColor: '#fff', padding: 20 }}>
            <QRCode value={modalData.qrCode} size={256} />
          </View>
        </Modal>
      );
    } else if (modalID === 'cancelQueue') {
      return (
        <PromptModalContent
          isVisible={modalVisible}
          confirmEvent={this.onCancelQueue(modalData.queueNumber)}
          confirmText="Batalkan"
          cancelText="Tutup"
        >
          <View style={style.modalBody}>
            <Text style={style.modalText}>
              Apakah Anda yakin ingin membatalkan antrian ini? Antrian yang sudah dibatalkan
              tidak dapat diaktifkan kembali.
            </Text>
          </View>
        </PromptModalContent>
      );
    }

    return null;
  }

  render() {
    const { queues, getQueueAttempt, queuesUsed } = this.props.queue;
    let placeholder;

    if (queues.length && !getQueueAttempt) {
      placeholder = queues.reduce((nodes, cur, idx) => {
        const {
          StartHour: startHour,
          EndHour: endHour,
          ServiceDate: serviceDate,
          NAMA_PENGANTRI: name,
          OfficeName: officeName,
          NO_ANTRIAN: queueNumber,
          data_qr: qrCode,
        } = cur;
        const office = (
          <RoundedListItem
            key={`list-kanim-${idx + 1}`}
            outerStyle={style.kanimOuterItemStyle}
            innerStyle={style.kanimInnerItemStyle}
            onPress={this.onItemLongPress(qrCode)}
            onLongPress={this.onItemLongPress(queueNumber)}
          >
            <View>
              <Text style={style.kanimOfficeNameStyle}>{officeName} - {serviceDate}</Text>
              <Text style={{ fontSize: 14, color: primaryMineshaft }}>
                {name}: {formatHour(startHour)} - {formatHour(endHour)}
              </Text>
            </View>
          </RoundedListItem>
        );

        return nodes.concat(office);
      }, []);
    } else if (getQueueAttempt) {
      placeholder = <ActivityIndicator size="large" color="#353535" />;
    } else {
      placeholder = <Text>Tidak ada antrian yang telah Anda daftar.</Text>;
    }
    console.log('wew');
    return (
      <View style={style.viewStyle}>
        <Text style={{ marginTop: 15 }}>
          Untuk melihat QR codeasdasdas, lakukan tap pada antrian yang diinginkan.
          Untuk melakukan delete, tekan antrian yang diinginkan selama 3 detik.
        </Text>
        <Text style={{ marginTop: 15 }}>
          Jumlah antrian yang telah direquest tahun ini: {queuesUsed} (maksimal 5 per tahun).
        </Text>

        {placeholder}

        {this.renderModal()}
      </View>
    );
  }
}

QueueList.propTypes = {
  // navigation: PropTypes.object.isRequired,
  getQueues: PropTypes.func.isRequired,
  cancelQueue: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  queue: PropTypes.object.isRequired,
};

export default QueueList;
