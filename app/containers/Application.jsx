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
import api from 'lib/api';

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = !!md.mobile();

const sidebarWidth = 260;

const menuItemStyle = {
  fontFamily: 'Avenir'
};

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
      contentStyle['left'] = sidebarWidth;
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
          <Tab label="Notifications" style={tabStyles} icon={<FontIcon className="material-icons">notifications</FontIcon>}/>
          <Tab label="Tasks" style={tabStyles} icon={<FontIcon className="material-icons">assignment_turned_in</FontIcon>}/>
          <Tab label="Home" style={tabStyles} icon={<FontIcon className="material-icons">whatshot</FontIcon>}/>
        </Tabs>
      );
    } else {
      const leftNavProps = {
        docked: !isMobile,
        width: sidebarWidth,
        swipeAreaWidth: null,
        open: this.state.open
      };
      return (
        <LeftNav {...leftNavProps}>
          <List><ListItem leftAvatar={<Avatar/>} primaryText="Mikko" disabled={true} style={menuItemStyle}></ListItem></List>
          <Divider/>
          <MenuItem onTouchTap={this.onNavigate.bind(this, '/app/notifications')} style={menuItemStyle} leftIcon={<FontIcon className="material-icons">notifications</FontIcon>}>Notifications</MenuItem>
          <MenuItem onTouchTap={this.onNavigate.bind(this, '/app/home')} style={menuItemStyle} leftIcon={<FontIcon className="material-icons">whatshot</FontIcon>}>Leaderboard</MenuItem>
          <MenuItem onTouchTap={this.onNavigate.bind(this, '/app/tasks')} style={menuItemStyle} leftIcon={<FontIcon className="material-icons">assignment_turned_in</FontIcon>}>Tasks</MenuItem>
          <Divider/>
          <MenuItem onTouchTap={this.logout} style={menuItemStyle} leftIcon={<FontIcon className="material-icons">lock</FontIcon>}>Sign out</MenuItem>
        </LeftNav>
      );
    }
  }

  logout = () => {
    api.logOut().then(() => {
      this.props.router.push('/');
    });
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
