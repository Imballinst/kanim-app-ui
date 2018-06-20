import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode';

import { primaryMineshaft } from '../utils/colors';
import { style } from './KanimList';
import RoundedListItem from './modules/RoundedListItem';
import TextfulPrompt from './modules/TextfulPrompt';
import { formatHour } from './helpers/Time';

class QueueList extends React.Component {
  state = {
    isModalVisible: false,
    modalID: '',
    modalData: {},
  }

  componentDidMount() {
    if (!this.props.queue.isQueueExist) {
      this.props.getQueues(this.props.auth.token);
    }
  }

  onItemPress = qrCode => () => {
    this.setState({
      modalID: 'qrCode',
      isModalVisible: true,
      modalData: { qrCode },
    });
  }

  onItemLongPress = queueNumber => () => {
    this.setState({
      modalID: 'cancelQueue',
      isModalVisible: true,
      modalData: { queueNumber },
    });
  }

  onCancelQueue = queueNumber => () => {
    const { auth, cancelQueue } = this.props;

    cancelQueue(auth.token, queueNumber);
  }

  onModalClose = () => {
    this.setState({
      isModalVisible: false,
      modalData: {},
    });
  }

  renderModal() {
    const { modalID, modalData } = this.state;

    if (modalID === 'qrCode') {
      return (
        <View style={{ backgroundColor: '#fff', padding: 20 }}>
          <QRCode value={modalData.qrCode} size={256} />
        </View>
      );
    } else if (modalID === 'cancelQueue') {
      return (
        <TextfulPrompt
          onConfirm={this.onCancelQueue(modalData.queueNumber)}
          onCancel={this.onModalClose}
          confirmText="Batalkan"
          cancelText="Tutup"
        >
          <View style={{ padding: 11 }}>
            <Text style={style.modalText}>
              Apakah Anda yakin ingin membatalkan antrian ini? Antrian yang sudah dibatalkan
              tidak dapat diaktifkan kembali.
            </Text>
          </View>
        </TextfulPrompt>
      );
    }

    return <View />;
  }

  render() {
    const { queues, getQueueAttempt, queuesUsed } = this.props.queue;
    const { isModalVisible } = this.state;
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
            delayLongPress={1000}
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

    return (
      <View style={style.viewStyle}>
        <Text style={{ marginTop: 15 }}>
          Untuk melihat QR codeasdasdas, lakukan tap pada antrian yang diinginkan.
          Untuk melakukan delete, tekan antrian yang diinginkan selama 1 detik.
        </Text>
        <Text style={{ marginTop: 15 }}>
          Jumlah antrian yang telah direquest tahun ini: {queuesUsed} (maksimal 5 per tahun).
        </Text>

        {placeholder}

        <Modal
          isVisible={isModalVisible}
          onBackButtonPress={this.onModalClose}
          onBackdropPress={this.onModalClose}
        >
          {this.renderModal()}
        </Modal>
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
