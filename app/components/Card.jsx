import React from 'react';
import styles from './Card.scss';
import GreenButton from 'components/GreenButton';
import classnames from 'classnames';

class Card extends React.Component {
  render() {
    const className = classnames({
      [styles.Card]: true,
      [styles.CardSelected]: this.props.selected
    });
    return (
      <div className={className} onClick={this.props.onSelect} {...this.props}>
        <div className={styles.CardImage} style={{backgroundImage: `url(${this.props.image})`}}></div>
        <div className={styles.CardFooter}>
          <div className={styles.CardTitle}>{this.props.title}</div>
          <div className={styles.CardSubtitle}>{this.props.subtitle}</div>
          <GreenButton>{this.props.buttonLabel}</GreenButton>
        </div>
      </div>
    );
  }
}

export default Card;
