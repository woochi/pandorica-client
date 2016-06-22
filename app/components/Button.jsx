import React from 'react';
import styles from './Button.scss';
import classnames from 'classnames';

class GreenButton extends React.Component {
  render() {
    const className = classnames(styles.normal, this.props.className, {
      [styles.fullWidth]: this.props.fullWidth
    });
    return <button {...this.props} className={className}>{this.props.children}</button>;
  }
}

export default GreenButton;

