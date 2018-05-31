import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode';

import { primaryMineshaft } from '../utils/colors';
import { style } from './KanimList';
import RoundedListItem from './modules/RoundedListItem';
import formatHour from './helpers/Time';

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

  onViewQR = qrCode => () => {
    this.setState({
      modalVisible: true,
      qrCode,
    });
  }

  onModalClose = () => {
    this.setState({
      modalVisible: false,
      qrCode: '',
    });
  }

  render() {
    const listQueues = this.props.queue.queues.reduce((nodes, cur, idx) => {
      const {
        StartHour: startHour,
        EndHour: endHour,
        ServiceDate: serviceDate,
        NAMA_PENGANTRI: name,
        OfficeName: officeName,
        data_qr: qrCode,
      } = cur;
      const office = (
        <RoundedListItem
          key={`list-kanim-${idx + 1}`}
          outerStyle={style.kanimOuterItemStyle}
          innerStyle={style.kanimInnerItemStyle}
          onPress={this.onViewQR(qrCode)}
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

    return (
      <View style={style.viewStyle}>
        {listQueues}

        <Modal
          isVisible={this.state.modalVisible}
          onBackButtonPress={this.onModalClose}
          onBackdropPress={this.onModalClose}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={{ backgroundColor: '#fff', padding: 20 }}>
            <QRCode value={this.state.qrCode} size={256} />
          </View>
        </Modal>
      </View>
    );
  }
}

QueueList.propTypes = {
  // navigation: PropTypes.object.isRequired,
  getQueues: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  queue: PropTypes.object.isRequired,
};

export default QueueList;
