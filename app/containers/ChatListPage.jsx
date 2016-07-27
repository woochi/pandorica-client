import React from 'react';
import Page from 'components/Page';
import {List, ListItem} from 'material-ui/List';
import {FontIcon, Divider} from 'material-ui';
import _ from 'lodash';
import {withRouter} from 'react-router';

class ChatListPage extends React.Component {
  render() {
    const chats = [
      {label: 'Global', url: '/app/chats/neutral', description: 'Discussion for all the players', icon: 'public'},
      {label: 'Order', url: '/app/chats/order', description: 'Discussion for the players of order', icon: 'security'},
      {label: 'Chaos', url: '/app/chats/chaos', description: 'Discussion for the players of chaos', icon: 'flare'}
    ];
    return <Page>
      <List>
        {_.flatten(chats.map((chat) => (
          [
            <ListItem
              primaryText={chat.label}
              secondaryText={chat.description}
              onClick={() => this.props.router.push(chat.url)}
              rightIcon={<FontIcon className="material-icons">keyboard_arrow_right</FontIcon>}
              leftIcon={<FontIcon className="material-icons">{chat.icon}</FontIcon>}/>,
            <Divider/>
          ]
        )))}
      </List>
    </Page>;
  }
};

export default withRouter(ChatListPage);
