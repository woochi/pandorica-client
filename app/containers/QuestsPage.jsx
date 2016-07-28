import React from "react";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {Page, PaddedContainer} from 'components/Page';
import * as questActions from 'actions/questActions';
import {connect} from 'react-redux';
import Placeholder from 'components/Placeholder';
import Loader from 'components/Loader';
import {withRouter} from 'react-router';
import Paper from 'material-ui/Paper';
import styles from './QuestsPage.scss';
import PullToRefresh from 'react-pull-to-refresh';
import 'styles/pull-to-refresh.scss';
import Center from 'components/Center';
import Title from 'components/Title';
import Paragraph from 'components/Paragraph';
import PrimaryButton from 'components/PrimaryButton';

class QuestsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false
    };
  }

  componentDidMount() {
    this.props.dispatch(questActions.fetch())
      .catch(() => {
        this.setState({error: true})
      });
  }

  render() {
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
    if (this.props.quests.size) {
      return (
        <PaddedContainer>
          <List>
            {this.renderQuests()}
          </List>
        </PaddedContainer>
      );
    } else {
      return <Center>
        <Title>No quests have been published yet.</Title>
        <Paragraph>Stay on the lookout closer to the event start time.</Paragraph>
      </Center>;
    }
  }

  renderQuests() {
    const items = [];
    const {quests} = this.props;
    let quest;
    quests.forEach((quest, id) => {
      items.push(<ListItem
        key={id}
        leftAvatar={<Avatar/>}
        primaryText={`${quest.get('title')}`}
        secondaryText={quest.get('description')}
        onClick={this.openQuest.bind(this, quest)}>
      </ListItem>);
      items.push(<Divider key={id + 'd'} inset={true}/>);
    });
    return items;
  }

  openQuest(quest) {
    this.props.router.push(`/app/quests/${quest.get('_id')}`);
  }

  onRefresh = (resolve, reject) => {
    this.props.dispatch(questActions.fetch()).then(resolve).catch(reject);
  }
}

function mapStateToProps(state) {
  return {
    loading: state.getIn(['loading', 'quests']),
    quests: state.getIn(['entities', 'quests']),
    administrate: state.getIn(['form', 'settings', 'administrate', 'value'])
  };
}

export default connect(mapStateToProps)(withRouter(QuestsPage));
