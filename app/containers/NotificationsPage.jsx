import React from "react";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {Page, PaddedContainer} from 'components/Page';
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
import Center from 'components/Center';
import Title from 'components/Title';
import Paragraph from 'components/Paragraph';
import PrimaryButton from 'components/PrimaryButton';

const primaryTextForNotificationType = {
  [NOTIFICATION_TYPES.TASK]: 'New Task'
}

class NotificationsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false
    };
  }

  componentDidMount() {
    this.props.dispatch(notificationActions.fetch())
      .catch(() => {
        this.setState({error: true})
      });
  }

  render() {
    console.log('RENDER', this.props.loading);
    return (
      <PullToRefresh onRefresh={this.onRefresh}>
        <Page>
          <Loader loading={this.props.loading}>
            <div>
              {this.renderContent()}
            </div>
          </Loader>
        </Page>
      </PullToRefresh>
    )
  }

  renderContent() {
    if (this.props.notifications.size) {
      return (
        <PaddedContainer>
          <List>
            {this.renderNotifications()}
          </List>
        </PaddedContainer>
      );
    } else {
      return <Center>
        <Title>No notifications have been published yet.</Title>
        <Paragraph>Stay on the lookout closer to the event start time.</Paragraph>
      </Center>;
    }
  }

  renderNotifications() {
    const items = [];
    const {notifications} = this.props;
    let notification;
    notifications.forEach((notification, id) => {
      items.push(<ListItem
        key={id}
        leftAvatar={<Avatar/>}
        primaryText={`${primaryTextForNotificationType[notification.get('type')]}: ${notification.get('title')}`}
        secondaryText={notification.get('message')}
        onClick={this.openNotification.bind(this, notification)}>
      </ListItem>);
      items.push(<Divider key={id + 'd'} inset={true}/>);
    });
    return items;
  }

  openNotification(notification) {
    this.props.router.push(`/app/notifications/${notification.get('_id')}`);
  }

  onRefresh = (resolve, reject) => {
    this.props.dispatch(notificationActions.fetch()).then(resolve).catch(reject);
  }
}

function mapStateToProps(state) {
  return {
    loading: state.getIn(['loading', 'notifications']),
    notifications: state.getIn(['entities', 'notifications']),
    administrate: state.getIn(['form', 'settings', 'administrate', 'value'])
  };
}

export default connect(mapStateToProps)(withRouter(NotificationsPage));
