import React from 'react';
import styles from './GreenButton.scss';
import classnames from 'classnames';

class GreenButton extends React.Component {
  render() {
    const className = classnames(styles.GreenButton, this.props.className);
    return <div {...this.props} className={className}>{this.props.children}</div>;
  }
}

export default GreenButton;
