import React from 'react';
import Page from 'components/Page';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Site extends React.Component {
  render() {
    return (
      <ReactCSSTransitionGroup transitionName="fade"
        transitionAppearTimeout={1500}
        transitionEnterTimeout={1500}
        transitionLeaveTimeout={1500}>
        {React.cloneElement(this.props.children, {
          key: this.props.location.pathname
        })}
      </ReactCSSTransitionGroup>
    );
  }
}

export default Site;
