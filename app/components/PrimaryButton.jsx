import React from 'react';
import styles from './PrimaryButton.scss';
import classnames from 'classnames';
import Button from 'components/Button';

class PrimaryButton extends React.Component {
  render() {
    const className = classnames(styles.PrimaryButton, this.props.className);
    return <Button {...this.props} className={className}>{this.props.children}</Button>;
  }
}

export default PrimaryButton;
