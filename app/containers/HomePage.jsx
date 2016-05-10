import React from "react";
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Page from 'components/Page';
import GameStatus from 'components/GameStatus';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Paper from 'material-ui/lib/paper';
import SwipeableViews from 'react-swipeable-views';

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
          <GameStatus></GameStatus>
          <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
            <Tab label="All" value={0}/>
            <Tab label="Order" value={1}/>
            <Tab label="Chaos" value={2}/>
          </Tabs>
          <SwipeableViews index={this.state.slideIndex} disabled={true}>
            <List>{items}</List>
            <List>{items}</List>
            <List>{items}</List>
          </SwipeableViews>
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
