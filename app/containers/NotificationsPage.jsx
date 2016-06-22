import React from "react";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Page from 'components/Page';
import * as notificationActions from 'actions/notificationActions';
import {connect} from 'react-redux';
import {NOTIFICATION_TYPES} from 'enums';
import Placeholder from 'components/Placeholder';
import Loader from 'components/Loader';
import {withRouter} from 'react-router';
import Paper from 'material-ui/Paper';
import styles from './NotificationsPage.scss';
import PullToRefresh from 'react-pull-to-refresh';
import 'styles/pull-to-refresh.scss';

const primaryTextForNotificationType = {
  [NOTIFICATION_TYPES.TASK]: 'New Task'
}

function renderContent(items) {
  if (items.length) {
    return (
      <div className={styles.wrapper}>
        <Paper>
          <List>
            {items}
          </List>
        </Paper>
      </div>
    );
  } else {
    return <Placeholder>No notifications published yet. Stay on the lookout closer to the event start time.</Placeholder>;
  }
}

class NotificationsPage extends React.Component {
  componentWillMount() {
    this.props.dispatch(notificationActions.fetch());
  }

  render() {
    const items = [];
    const notifications = this.props.notifications;
    let notification;
    for (let i = 0; i < notifications.length; i++) {
      notification = notifications[i];
      items.push(<ListItem
        key={notification._id}
        leftAvatar={<Avatar/>}
        primaryText={`${primaryTextForNotificationType[notification.type]}: ${notification.title}`}
        secondaryText={notification.message}
        onClick={this.openNotification.bind(this, notification)}>
      </ListItem>);
      items.push(<Divider key={i} inset={true}/>);
    }
    return (
      <PullToRefresh handleRefresh={this.onRefresh.bind(this)}>
        <Page>
          <Loader loading={this.props.loading}>{renderContent(items)}</Loader>
        </Page>
      </PullToRefresh>
    )
  }

  openNotification(notification) {
    this.props.router.push(`/app/notifications/${notification._id}`);
  }

  onRefresh(resolve, reject) {
    console.log('REFRESH');
  }
}

function mapStateToProps(state) {
  return {
    loading: state.get('notifications').get('loading'),
    notifications: state.get('notifications').get('data').toJS()
  };
}

export default connect(mapStateToProps)(withRouter(NotificationsPage));
