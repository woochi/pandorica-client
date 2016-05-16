import React from 'react';
import styles from './Deck.scss';

class Deck extends React.Component {
  render() {
    return (
      <div className={styles.Deck}>
        {this.props.children}
      </div>
    );
  }
}

export default Deck;
