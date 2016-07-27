import React from 'react';
import Page from 'components/Page';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './Site.scss';

class Site extends React.Component {
  render() {
    return (
      <div className={styles.Site}>
        <ReactCSSTransitionGroup transitionName="fade"
          transitionAppearTimeout={1500}
          transitionEnterTimeout={1500}
          transitionLeaveTimeout={1500}>
            {React.cloneElement(this.props.children, {
              key: this.props.location.pathname
            })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Site;
