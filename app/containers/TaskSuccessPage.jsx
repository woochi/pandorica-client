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
import {Map} from 'immutable';

class TaskSuccessPage extends React.Component {
  render() {
    return (
      <Page>
        <Loader loading={this.props.loading}>
          <Center>
            <PointDisplay points={this.props.task.get('points')}/>
            <Title>Magnificent!</Title>
            <Paragraph>You have successfully completed the quest!</Paragraph>
            <GreenButton primary={true} onClick={this.continue}>Get the next quest</GreenButton>
          </Center>
        </Loader>
      </Page>
    );
  }

  continue = () => {
    const nextPathname = _.get(this.props, ['location', 'state', 'nextPathName']) || '/app/quests';
    this.props.router.push(nextPathname);
  }
}

function mapStateToProps(state, router) {
  const mission = state.getIn(['entities', 'tasks', router.params.id]) || state.getIn(['entities', 'quests', router.params.id]) || new Map();
  return {
    loading: !mission,
    task: mission
  };
}

export default connect(mapStateToProps)(withRouter(TaskSuccessPage));
