import React from "react";
import { RouteHandler } from "react-router";
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { Link, withRouter } from 'react-router';
import Avatar from 'material-ui/lib/avatar';
import styles from "./Application.scss";
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import {connect} from 'react-redux';
import Snackbar from 'material-ui/lib/snackbar';
import {error} from 'actions/errorActions';
import MobileDetect from 'mobile-detect';
import Page from 'components/Page';
import NavTabs from 'containers/NavTabs';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FontIcon from 'material-ui/lib/font-icon';

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = !!md.mobile();

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: !isMobile};
  }

	render() {
    const contentStyle = {};
    if (isMobile) {
      contentStyle['bottom'] = 80;
    } else {
      contentStyle['left'] = 300;
    }
		return (
			<div className={styles.Application}>
        {this.renderNav()}
        <div className={styles.Content} style={contentStyle}>{this.props.children}</div>
        <Snackbar
          open={this.props.error}
          message={this.props.error}
          autoHideDuration={3000}
          onRequestClose={this.onCloseSnackbar}
        />
			</div>
		);
	}

  renderNav = () => {
    const tabStyles = {
      fontSize: 10
    };
    if (isMobile) {
      return (
        <Tabs className={styles.NavTabs}>
          <Tab label="Notifications" style={tabStyles} icon={<FontIcon className="material-icons">add_alert</FontIcon>}/>
          <Tab label="Tasks" style={tabStyles} icon={<FontIcon className="material-icons">grade</FontIcon>}/>
          <Tab label="Home" style={tabStyles} icon={<FontIcon className="material-icons">person_pin</FontIcon>}/>
        </Tabs>
      );
    } else {
      const leftNavProps = {
        docked: !isMobile,
        width: 300,
        swipeAreaWidth: null,
        open: this.state.open
      };
      return (
        <LeftNav {...leftNavProps}>
          <List><ListItem leftAvatar={<Avatar/>} primaryText="Mikko" disabled={true}></ListItem></List>
          <Divider/>
          <MenuItem onTouchTap={this.onNavigate.bind(this, '/app/notifications')}>Notifications</MenuItem>
          <MenuItem onTouchTap={this.onNavigate.bind(this, '/app/home')}>Leaderboard</MenuItem>
          <MenuItem onTouchTap={this.onNavigate.bind(this, '/app/tasks')}>Tasks</MenuItem>
        </LeftNav>
      );
    }
  }

  onCloseSnackbar = () => {
    this.props.dispatch(error(false));
  }

  onNavigate = (path) => {
    this.props.router.push(path);
    if (isMobile) {
      this.setState({open: false});
    }
  };
}

function mapStateToProps(state, props) {
  return {
    error: state.get('error')
  };
}

export default connect(mapStateToProps)(withRouter(Application));
