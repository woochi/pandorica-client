import React from 'react';
import Message from 'components/Message';
import styles from './MessageList.scss';
import Title from 'components/Title';
import Center from 'components/Center';
import Paragraph from 'components/Paragraph';
import {FontIcon} from 'material-ui';

class MessageList extends React.Component {
  render() {
    return (
      <div className={styles.messageList}>
        {this.props.messages.map((message) => (
          <div key={message.get('_id')} className={styles.messageContainer}>
            <Message message={message}/>
          </div>
        ))}
      </div>
    );
  }
}

export default MessageList;
