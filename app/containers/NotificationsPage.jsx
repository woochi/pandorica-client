import React from "react";
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Page from 'components/Page';
import * as notificationActions from 'actions/notificationActions';
import {connect} from 'react-redux';
import {NOTIFICATION_TYPES} from 'enums';
import Placeholder from 'components/Placeholder';
import Loader from 'components/Loader';

const primaryTextForNotificationType = {
  [NOTIFICATION_TYPES.TASK]: 'New Task'
}

function renderContent(items) {
  if (items.length) {
    return (
      <List>
        {items}
      </List>
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
        disabled={true}
        leftAvatar={<Avatar/>}
        primaryText={`${primaryTextForNotificationType[notification.type]} - ${notification.title}`}
        secondaryText={notification.message}>
      </ListItem>);
      items.push(<Divider key={i} inset={true}/>);
    }
    return (
      <Page>
        <Loader loading={this.props.loading}>{renderContent(items)}</Loader>
      </Page>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.get('notifications').get('loading'),
    notifications: state.get('notifications').get('data').toJS()
  };
}

export default connect(mapStateToProps)(NotificationsPage);
