import React from 'react';
import styles from './Message.scss';
import UserAvatar from 'components/UserAvatar';

class Message extends React.Component {
  render() {
    const {message} = this.props;
    return (
      <div className={styles.message}>
        <div className={styles.avatarContainer}>
          <UserAvatar user={message.get('user')} size={38} color="#ccc"/>
        </div>
        <div className={styles.bubbleContainer}>
          <div className={styles.bubble}>
            <div className={styles.author}>{message.getIn(['user', 'name'])}:</div>
            <div className={styles.content}>{message.get('content')}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
