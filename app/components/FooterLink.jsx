import React from 'react';
import {Link} from 'react-router';
import styles from './FooterLink.scss';
import GreyLink from 'components/GreyLink';

class FooterLink extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'FooterLink';
  }

  render() {
    return (
      <div className={styles.FooterLinkWrapper}>
        <GreyLink {...this.props}>{this.props.children}</GreyLink>
      </div>
    );
  }
}

export default FooterLink;
