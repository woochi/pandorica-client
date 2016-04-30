import React from "react";
import Page from 'components/page';

export default class NotFoundPage extends React.Component {
	render() {
		return (
      <Page>
        <h2>Not found</h2>
        <p>The page you requested was not found.</p>
		  </Page>
    );
	}
}
