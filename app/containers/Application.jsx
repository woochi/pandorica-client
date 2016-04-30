import React from "react";
import { RouteHandler } from "react-router";
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { Link, browserHistory } from 'react-router';
import Avatar from 'material-ui/lib/avatar';
import styles from "./Application.scss";
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import {connect} from 'react-redux';
import Snackbar from 'material-ui/lib/snackbar';
import {error} from 'actions/errorActions';

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

	render() {
		return (
			<div className={styles.this}>
        <LeftNav
          docked={false}
          width={300}
          swipeAreaWidth={null}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}>
          <List><ListItem leftAvatar={<Avatar/>} primaryText="Mikko" disabled={true}></ListItem></List>
          <Divider/>
          <MenuItem onTouchTap={this.onNavigate.bind(this, 'app/notifications')}>Notifications</MenuItem>
          <MenuItem onTouchTap={this.onNavigate.bind(this, 'app/home')}>Leaderboard</MenuItem>
          <MenuItem onTouchTap={this.onNavigate.bind(this, 'app/tasks')}>Tasks</MenuItem>
        </LeftNav>
				{this.props.children}
        <Snackbar
          open={this.props.error}
          message={this.props.error}
          autoHideDuration={3000}
          onRequestClose={this.onCloseSnackbar}
        />
			</div>
		);
	}

  onCloseSnackbar = () => {
    this.props.dispatch(error(false));
  }

  onNavigate = (path) => {
    this.props.history.push(path);
    this.setState({open: false});
  };
}

function mapStateToProps(state, props) {
  return {
    error: state.get('error')
  };
}

export default connect(mapStateToProps)(Application);
