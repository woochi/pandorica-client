import React from 'react';
import Message from 'components/Message';
import styles from './MessageList.scss';
import Title from 'components/Title';
import Center from 'components/Center';
import Paragraph from 'components/Paragraph';
import {FontIcon} from 'material-ui';

class MessageList extends React.Component {
  render() {
    if (this.props.messages.size) {
      return (
        <div className={styles.messageList}>
          {this.props.messages.map((message) => (
            <div key={message.get('_id')} className={styles.messageContainer}>
              <Message message={message}/>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <Center>
          <FontIcon className="material-icons"></FontIcon>
          <Title>Break the silence!</Title>
          <Paragraph>Use the chat to discuss tactics with your team, share quest tips and plan meetups.<br/> Always remember proper manners towards your fellow players.</Paragraph>
        </Center>
      );
    }
  }
}

export default MessageList;
