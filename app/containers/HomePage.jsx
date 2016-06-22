import React from "react";
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Page from 'components/Page';
import GameStatus from 'components/GameStatus';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Center from 'components/Center';
import Title from 'components/Title';
import Subtitle from 'components/Subtitle';
import Paragraph from 'components/Paragraph';
import Countdown from 'components/Countdown';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

	render() {
    const items = [];
    for (let i = 0; i < 10; i++) {
      items.push(<ListItem
        key={i}
        disabled={true}
        leftAvatar={<Avatar/>}
        primaryText="Woochi"
        secondaryText={<p>Points contributed: 1000</p>}>
      </ListItem>);
      items.push(<Divider inset={true} key={i+100}/>);
    }
		return (
			<Page>
        <Center>
          <Title>Preparing for the hunt&hellip;</Title>
          <Paragraph>The Ropecon treasure hunt launches officially on Friday 29.7. at 09:00.<br/>The first quests will be posted when the venue gates open.</Paragraph>
          <Countdown/>
        </Center>
			</Page>
		);
	}

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };
}

export default HomePage;
