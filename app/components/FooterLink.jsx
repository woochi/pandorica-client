import React from 'react';
import {Link} from 'react-router';
import styles from './FooterLink.scss';

class FooterLink extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'FooterLink';
  }

  render() {
    return (
      <div className={styles.FooterLinkWrapper}>
        <Link {...this.props} className={styles.FooterLink}>{this.props.children}</Link>
      </div>
    );
  }
}

export default FooterLink;
