import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ActivityIndicator,
  ScrollView,
  Text,
  RefreshControl,
} from 'react-native';
import Modal from 'react-native-modal';

import TextlessPrompt from './modules/TextlessPrompt';
import { primaryMineshaft } from '../utils/colors';
import { style } from './KanimList';
import RoundedListItem from './modules/RoundedListItem';

class NotifList extends React.Component {
  state = {
    isModalVisible: false,
    modalData: {},
  }

  componentDidMount() {
    const { getNotifications, auth } = this.props;

    getNotifications(auth.user.MU_ID);
  }

  onPullDown = () => {
    const { getNotifications, auth } = this.props;

    getNotifications(auth.user.MU_ID);
  }

  onPress = notifID => () => {
    const { navigation, getNotification, auth } = this.props;

    navigation.navigate('NotifDetail');
    getNotification(auth.user.MU_ID, notifID);

    if (this.state.isModalVisible) {
      this.setState({
        isModalVisible: false,
        modalData: {},
      });
    }
  }

  onDelete = notifID => () => {
    const { deleteNotification, auth } = this.props;

    deleteNotification(auth.user.MU_ID, notifID);
    this.setState({
      isModalVisible: false,
      modalData: {},
    });
  }

  onLongPress = notifID => () => {
    this.setState({
      isModalVisible: true,
      modalData: {
        notifID,
      },
    });
  }

  onModalClose = () => {
    this.setState({
      isModalVisible: false,
      modalData: {},
    });
  }

  renderModal() {
    const { isModalVisible, modalData } = this.state;
    const buttonObjects = [
      { text: 'Lihat Detail', onPress: this.onPress(modalData.notifID) },
      { text: 'Hapus Notif', onPress: this.onDelete(modalData.notifID) },
    ];

    return isModalVisible ?
      <TextlessPrompt
        buttonObjects={buttonObjects}
        keyName="notiflist"
      /> :
      <View />;
  }

  render() {
    const { isModalVisible } = this.state;
    const { notif, kanim } = this.props;
    const { notifications, getNotificationsAttempt, deleteNotificationAttempt } = notif;
    const { offices, getOfficesAttempt } = kanim;

    const sessionName = {
      morning: 'pagi',
      afternoon: 'siang',
      both: 'pagi/siang',
    };
    let placeholder;

    if (notifications.length && !getNotificationsAttempt && !getOfficesAttempt &&
      !deleteNotificationAttempt) {
      placeholder = notifications.reduce((nodes, cur, idx) => {
        const {
          _id: notifID,
          email,
          moID,
          session,
          startDate,
          treshold,
        } = cur;
        const officeName = offices.find(({ MO_ID }) => MO_ID === moID).MO_NAME;

        const notifComponent = (
          <RoundedListItem
            key={`list-kanim-${idx + 1}`}
            outerStyle={style.kanimOuterItemStyle}
            innerStyle={style.kanimInnerItemStyle}
            onPress={this.onPress(notifID)}
            onLongPress={this.onLongPress(notifID)}
            delayLongPress={1000}
          >
            <View>
              <Text style={style.kanimOfficeNameStyle}>{officeName} - {startDate}</Text>
              <Text style={{ fontSize: 14, color: primaryMineshaft }}>
                Apabila kuota sesi {sessionName[session]} melebihi {treshold},
                akan dikirimkan email ke {email}
              </Text>
            </View>
          </RoundedListItem>
        );

        return nodes.concat(notifComponent);
      }, []);
    } else if (getNotificationsAttempt || getOfficesAttempt ||
      deleteNotificationAttempt) {
      placeholder = <ActivityIndicator size="large" color="#353535" />;
    } else {
      placeholder = <Text>Tidak ada notifikasi yang telah Anda buat.</Text>;
    }

    return (
      <View style={style.viewStyle}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={getNotificationsAttempt || deleteNotificationAttempt}
              onRefresh={this.onPullDown}
            />
          }
        >
          {placeholder}
        </ScrollView>

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

NotifList.propTypes = {
  getNotifications: PropTypes.func.isRequired,
  getNotification: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  notif: PropTypes.object.isRequired,
  kanim: PropTypes.object.isRequired,
};

export default NotifList;
