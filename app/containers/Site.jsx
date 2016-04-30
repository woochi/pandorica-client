import React from 'react';
import Page from 'components/Page';

class Site extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Site';
  }

  render() {
    return <Page>{this.props.children}</Page>;
  }
}

export default Site;
