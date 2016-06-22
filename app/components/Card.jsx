import React from 'react';
import styles from './Card.scss';
import GreenButton from 'components/GreenButton';
import PrimaryButton from 'components/PrimaryButton';
import classnames from 'classnames';
import Paragraph from 'components/Paragraph';

class Card extends React.Component {
  render() {
    const className = classnames({
      [styles.Card]: true,
      [styles.CardSelected]: this.props.selected
    });
    return (
      <div className={className} onClick={this.props.onSelect} {...this.props}>
        <div className={styles.image}>
          <img src={this.props.image} width="100%"/>
        </div>
        <div className={styles.footer}>
          <div className={styles.title}>{this.props.title}</div>
          <div className={styles.subtitle}>{this.props.subtitle}</div>
          <Paragraph><GreenButton>{this.props.buttonLabel}</GreenButton></Paragraph>
        </div>
      </div>
    );
  }
}

export default Card;
