import React from 'react';
import styles from './Message.scss';
import UserAvatar from 'components/UserAvatar';
import {connect} from 'react-redux';

class Message extends React.Component {
  render() {
    const {message, user} = this.props;
    return (
      <div className={styles.message}>
        <div className={styles.avatarContainer}>
          <UserAvatar user={user} size={38} color="#ccc"/>
        </div>
        <div className={styles.bubbleContainer}>
          <div className={styles.bubble}>
            <div className={styles.author}>{user.get('name')}:</div>
            <div className={styles.content}>{message.get('content')}</div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.getIn(['entities', 'users', props.message.get('user')])
  };
}

export default connect(mapStateToProps)(Message);
