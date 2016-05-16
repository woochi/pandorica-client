import {connect} from 'react-redux';
import Page from 'components/Page';
import * as notificationActions from 'actions/notificationActions';
import Title from 'components/Title';
import Paragraph from 'components/Paragraph';
import Center from 'components/Center';
import RaisedButton from 'material-ui/lib/raised-button';
import {withRouter} from 'react-router';
import GreyLink from 'components/GreyLink';
import Loader from 'components/Loader';
import * as taskActions from 'actions/taskActions';
import TaskCodeForm from 'components/TaskCodeForm';
import _ from 'lodash';

class NotificationPage extends React.Component {
  componentWillMount() {
    this.props.dispatch(notificationActions.get(this.props.params.id));
  }

  render() {
    return (
      <Page>
        <Loader loading={this.props.loading}>
          <Center>
            <Title>{this.props.notification.title}</Title>
            <Paragraph>{this.props.notification.message}</Paragraph>
            {this.getTaskContent()}
            <Paragraph>
              <GreyLink to="/app/notifications">Go back to notifications</GreyLink>
            </Paragraph>
          </Center>
        </Loader>
      </Page>
    );
  }

  getTaskContent = () => {
    if (_.get(this.props.notification, ['task', 'completed'])) {
      return <p className="green">You have already completed this task</p>;
    } else {
      return <TaskCodeForm onSubmit={this.checkCode}/>;
    }
  }

  checkCode = (code) => {
    this.props.dispatch(taskActions.submit(code)).then(() => {
      this.props.router.push(`/app/tasks/${this.props.notification.task._id}/success`);
    });
  }
}

function mapStateToProps(state) {
  const notification = state.getIn(['notifications', 'data']).toJS();
  return {
    loading: !notification,
    notification: notification
  };
}

export default connect(mapStateToProps)(withRouter(NotificationPage));
