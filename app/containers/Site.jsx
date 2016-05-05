import React from 'react';
import Page from 'components/Page';

class Site extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Site';
  }

  render() {
    return this.props.children;
  }
}

export default Site;
