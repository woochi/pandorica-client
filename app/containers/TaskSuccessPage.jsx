import Page from 'components/Page';
import Center from 'components/Center';
import Paragraph from 'components/Paragraph';
import PointDisplay from 'components/PointDisplay';
import Title from 'components/Title';
import RaisedButton from 'material-ui/RaisedButton';
import * as taskActions from 'actions/taskActions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Loader from 'components/Loader';
import GreenButton from 'components/GreenButton';

class TaskSuccessPage extends React.Component {
  componentWillMount() {
    if (!this.props.task) {
      this.props.router.push('/app/notifications');
    }
  }

  render() {
    return (
      <Page>
        <Loader loading={this.props.loading}>
          <Center>
            <PointDisplay points={this.props.task.points}/>
            <Title>Magnificent!</Title>
            <Paragraph>You have successfully completed the quest <strong>&ldquo;{this.props.task.name}&rdquo;</strong>!</Paragraph>
            <GreenButton primary={true} onClick={this.continue}>Get the next quest</GreenButton>
          </Center>
        </Loader>
      </Page>
    );
  }

  continue = () => {
    const nextPathname = _.get(this.props, ['location', 'state', 'nextPathName']) || '/app/notifications';
    this.props.router.push(nextPathname);
  }
}

function mapStateToProps(state, router) {
  const task = state.getIn(['tasks', 'entities', router.params.id]);
  return {
    loading: !task,
    task: task
  };
}

export default connect(mapStateToProps)(withRouter(TaskSuccessPage));
