import React from 'react';
import styles from './GreenButton.scss';
import classnames from 'classnames';
import Button from 'components/Button';

class GreenButton extends React.Component {
  render() {
    const className = classnames(styles.normal, this.props.className);
    return <Button {...this.props} className={className}>{this.props.children}</Button>;
  }
}

export default GreenButton;
