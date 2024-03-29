import {connect} from 'react-redux';
import Page from 'components/Page';
import * as questActions from 'actions/questActions';
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
import Quest from 'models/quest';
import {getNormalized} from 'actions/apiActions';
import {FontIcon} from 'material-ui';
import colors from 'lib/colors';

class QuestPage extends React.Component {

  componentDidMount() {
    const codeParam = this.props.location.query.code;
    if (codeParam) {
      this.checkCode(codeParam);
    } else {
      this.props.dispatch(getNormalized(`/quests/${this.props.params.id}`, Quest));
    }
  }

  render() {
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
      const {quest} = this.props;
      return (
        <Center>
          {quest.get('completed') &&
            <FontIcon className="material-icons" color={colors.green}>check_circle</FontIcon>}
          <Title>{quest.get('title')}</Title>
          <Paragraph>{quest.get('description')}</Paragraph>
          {this.getTaskContent()}
          <Paragraph>
            <GreyLink to="/app/quests">Go back to quests</GreyLink>
          </Paragraph>
        </Center>
      );
    }
  }

  getTaskContent = () => {
    if (this.props.quest.get('completed')) {
      return <div className="green">
        You have already completed this task.
      </div>;
    } else {
      return <TaskCodeForm onSubmit={this.checkCode}/>;
    }
  }

  checkCode = (code) => {
    const questId = this.props.params.id;
    this.props.dispatch(questActions.submit(questId, code)).then(() => {
      this.props.router.push(`/app/quests/${questId}/success`);
    }).catch((err) => {
      this.props.dispatch(error(err));
    });
  }
}

function mapStateToProps(state, props) {
  const quest = state.getIn(['entities', 'quests', props.params.id]);
  return {
    loading: !quest,
    quest: quest
  };
}

export default connect(mapStateToProps)(withRouter(QuestPage));
