import {connect} from 'react-redux';
import Page from 'components/Page';
import * as notificationActions from 'actions/notificationActions';
import Title from 'components/Title';
import Paragraph from 'components/Paragraph';
import Center from 'components/Center';
import {withRouter} from 'react-router';
import GreyLink from 'components/GreyLink';
import Loader from 'components/Loader';
import * as taskActions from 'actions/taskActions';
import TaskCodeForm from 'components/TaskCodeForm';
import _ from 'lodash';
import {error} from 'actions/errorActions';

class NotificationPage extends React.Component {

  componentWillMount() {
    this.props.dispatch(notificationActions.get(this.props.params.id));
  }

  render() {
    console.log('PROPS', this.props);
    return (
      <Page>
        <Loader loading={this.props.loading}>
          {this.renderContent()}
        </Loader>
      </Page>
    );
  }

  renderContent() {
    if (this.props.loading) {
      return <div/>;
    } else {
      return (
        <Center>
          <Title>{this.props.notification.get('title')}</Title>
          <Paragraph>{this.props.notification.get('message')}</Paragraph>
          {this.getTaskContent()}
          <Paragraph>
            <GreyLink to="/app/notifications">Go back to notifications</GreyLink>
          </Paragraph>
        </Center>
      );
    }
  }

  getTaskContent = () => {
    if (this.props.notification.getIn(['task', 'completed'])) {
      return <p className="green">You have already completed this task</p>;
    } else {
      return <TaskCodeForm onSubmit={this.checkCode}/>;
    }
  }

  checkCode = (code) => {
    this.props.dispatch(taskActions.submit(code)).then(() => {
      this.props.router.push(`/app/tasks/${this.props.notification.task._id}/success`);
    }).catch((err) => {
      this.props.dispatch(error(err));
    });
  }
}

function mapStateToProps(state, props) {
  const notification = state.getIn(['entities', 'notifications', props.params.id]);
  return {
    loading: !notification,
    notification: notification
  };
}

export default connect(mapStateToProps)(withRouter(NotificationPage));
