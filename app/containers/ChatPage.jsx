import React from 'react';
import Page from 'components/Page';
import {sendMessage} from 'actions/messageActions';
import {Tabs} from 'components/Tabs';
import {Tab} from 'material-ui/Tabs';
import _ from 'lodash';
import {withRouter} from 'react-router';
import styles from './ChatPage.scss';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {getFormState} from 'lib/immutableForm';
import MessageList from 'components/MessageList';
import {List} from 'immutable';
import {animateScroll as scroll} from 'react-scroll';
import {getNormalized} from 'actions/apiActions';
import Message from 'models/message';
import {arrayOf} from 'normalizr';
import {Map} from 'immutable';
import MobileDetect from 'mobile-detect';
import {FontIcon, Toolbar, ToolbarTitle, ToolbarGroup} from 'material-ui';
import Center from 'components/Center';
import Loader from 'components/Loader';
import Title from 'components/Title';
import Paragraph from 'components/Paragraph';

function getChannelFromProps(props) {
  const pathName = props.location.pathname.replace(/\/app\/chats\//, '');
  if (pathName === 'global') {
    return 'neutral';
  } else {
    return pathName;
  }
}

class ChatPage extends React.Component {
  static defaultProps = {
    messages: new Map()
  }

  constructor() {
    super();
    this.state = {
      loading: true,
      error: false
    };
  }

  componentDidMount() {
    this.reloadMessages();
  }

  componentDidUpdate(prevProps) {
    if (getChannelFromProps(prevProps) !== getChannelFromProps(this.props)) {
      this.reloadMessages()
    }
  }

  render() {
    const md = new MobileDetect(window.navigator.userAgent);
    const isMobile = !!md.mobile();
    const currentChannel = getChannelFromProps(this.props);
    const {fields} = this.props;

    return (
      <Page>
        <div className={styles.Chat}>
          <div className={styles.Content} id="chatContent">
            <Loader loading={this.state.loading}>{this.renderContent()}</Loader>
          </div>
          <div className={styles.Footer}>
            <input
              type="text"
              placeholder="Write a message..."
              className={styles.Input}
              autoFocus={!isMobile}
              onKeyPress={this.onSendMessage}
              {...fields.message}/>
          </div>
        </div>
      </Page>
    );
  }

  renderContent() {
    if (this.state.error) {
      return (
        <Center>
          <FontIcon className="material-icons" style={{fontSize: 80, color: '#4cb970'}}>lock_outline</FontIcon>
          <Title>You do not have access to this discussion</Title>
          <Paragraph>You can only participate to discussions in the global chat or on your own team channel.</Paragraph>
        </Center>
      );
    } else if (!this.props.messages.size) {
      return <Center>
        <FontIcon className="material-icons">chat</FontIcon>
        <Title>Break the silence!</Title>
        <Paragraph>Use the chat to discuss tactics with your team, share quest tips and plan meetups.<br/> Always remember proper manners towards your fellow players.</Paragraph>
      </Center>;
    } else {
      return <MessageList messages={this.props.messages}/>;
    }
  }

  reloadMessages() {
    this.setState({loading: true, error: false});
    const channel = getChannelFromProps(this.props);
    this.props.dispatch(getNormalized(`/factions/${channel}/messages`, arrayOf(Message)))
      .then(() => {
        this.setState({loading: false})
      })
      .catch(() => {
        this.setState({loading: false, error: true});
      });
  }

  onSendMessage = (event) => {
    if (event.which === 13) {
      const channel = getChannelFromProps(this.props);
      const messageContent = this.props.fields.message.value;
      this.props.dispatch(sendMessage(messageContent, getChannelFromProps(this.props)));
      this.props.resetForm();
    }
  }
}

function mapStateToProps(state, props) {
  const channel = getChannelFromProps(props);
  const messages = state.getIn(['entities', 'messages'], new Map()).filter((message) => {
    return message.get('faction') === channel.toUpperCase();
  }).sort((a, b) => {
    return new Date(a.get('createdAt')) - new Date(b.get('createdAt'));
  }).toList();

  return {
    messages
  };
}

export default connect(mapStateToProps)(reduxForm({
  form: 'chat',
  fields: ['message'],
  getFormState
})(withRouter(ChatPage)));
