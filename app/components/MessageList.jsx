import React from 'react';
import Message from 'components/Message';
import styles from './MessageList.scss';
import Title from 'components/Title';
import Center from 'components/Center';
import Paragraph from 'components/Paragraph';
import {FontIcon} from 'material-ui';

class MessageList extends React.Component {
  componentDidMount() {
    this.scrollDown();
  }

  componentDidUpdate() {
    const scrollThreshold = 20;
    if (this.node.scrollTop + this.node.clientHeight < this.node.scrollHeight - scrollThreshold) {
      this.scrollDown();
    }
    this.scrollDown();
  }

  render() {
    return (
      <div className={styles.messageList} ref={(node) => {console.log(node); this.node = node;}}>
        {this.props.messages.map((message) => (
          <div key={message.get('_id')} className={styles.messageContainer}>
            <Message message={message}/>
          </div>
        ))}
      </div>
    );
  }

  scrollDown() {
    this.node.scrollTop = this.node.scrollHeight;
  }
}

export default MessageList;
