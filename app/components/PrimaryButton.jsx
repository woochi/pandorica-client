import React from 'react';
import styles from './PrimaryButton.scss';
import classnames from 'classnames';

class PrimaryButton extends React.Component {
  render() {
    const className = classnames(styles.PrimaryButton, this.props.className);
    return <div {...this.props} className={className}>{this.props.children}</div>;
  }
}

export default PrimaryButton;
