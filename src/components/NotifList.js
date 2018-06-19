import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ActivityIndicator,
  ScrollView,
  Text,
  RefreshControl,
} from 'react-native';

import { primaryMineshaft } from '../utils/colors';
import { style } from './KanimList';
import RoundedListItem from './modules/RoundedListItem';

class NotifList extends React.Component {
  componentDidMount() {
    const { getNotifications, auth } = this.props;

    getNotifications(auth.user.MU_ID);
  }

  onPullDown = () => {
    this.props.getNotifications(this.props.auth.user.MU_ID);
  }

  render() {
    const { notif, kanim } = this.props;
    const { notifications, getNotificationsAttempt } = notif;
    const sessionName = {
      morning: 'pagi',
      afternoon: 'siang',
      both: 'pagi/siang',
    };
    let placeholder;

    if (notifications.length && !getNotificationsAttempt) {
      placeholder = notifications.reduce((nodes, cur, idx) => {
        const {
          email,
          moID,
          session,
          startDate,
          treshold,
        } = cur;
        const officeName = kanim.offices.find(({ MO_ID }) => MO_ID === moID).MO_NAME;

        const notifComponent = (
          <RoundedListItem
            key={`list-kanim-${idx + 1}`}
            outerStyle={style.kanimOuterItemStyle}
            innerStyle={style.kanimInnerItemStyle}
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
    } else if (getNotificationsAttempt) {
      placeholder = <ActivityIndicator size="large" color="#353535" />;
    } else {
      placeholder = <Text>Tidak ada notifikasi yang telah Anda buat.</Text>;
    }

    return (
      <View style={style.viewStyle}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={getNotificationsAttempt}
              onRefresh={this.onPullDown}
            />
          }
        >
          {placeholder}
        </ScrollView>
      </View>
    );
  }
}

NotifList.propTypes = {
  getNotifications: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // nav: PropTypes.object.isRequired,
  notif: PropTypes.object.isRequired,
  kanim: PropTypes.object.isRequired,
};

export default NotifList;
