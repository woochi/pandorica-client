import React from 'react';
import styles from './Logo.scss';
import image from 'images/logo.png';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link} from 'react-router';

class Logo extends React.Component {
  render() {
    return (
      <ReactCSSTransitionGroup transitionName="logo" transitionAppear={true}>
        <div className={styles.Logo}>
          <Link to="/"><img src={image} width="100%"/></Link>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default Logo;
