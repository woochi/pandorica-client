import React from "react";
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Page from 'components/Page';

export default class NotificationsPage extends React.Component {
  render() {
    const items = [];
    for (let i = 0; i < 10; i++) {
      items.push(<ListItem
        disabled={true}
        leftAvatar={<Avatar/>}
        primaryText="New task available"
        secondaryText={<p>Points contributed: 1000</p>}>
      </ListItem>);
      items.push(<Divider inset={true}/>);
    }
    return (
      <Page>
        <List>
          {items}
        </List>
      </Page>
    )
  }
}
