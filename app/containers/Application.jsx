import React from "react";
import { RouteHandler } from "react-router";
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import { Link, withRouter } from 'react-router';
import Avatar from 'material-ui/Avatar';
import styles from "./Application.scss";
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {connect} from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import {error} from 'actions/errorActions';
import MobileDetect from 'mobile-detect';
import Page from 'components/Page';
import NavTabs from 'containers/NavTabs';
import {Tabs} from 'components/Tabs';
import {Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import api from 'lib/api';
import {config} from 'lib/socket';

config();

const SelectableList = MakeSelectable(List);

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = !!md.mobile();

const sidebarWidth = 260;

export default class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    api.get('/me').then((user) => {
      this.setState({user: user});
    });
  }

	render() {
    const contentStyle = {};
    if (isMobile) {
      contentStyle['bottom'] = 49;
    } else {
      contentStyle['left'] = sidebarWidth;
    }
		return (
			<div className={styles.Application}>
        {this.renderNav()}
        <div className={styles.Content} style={contentStyle}>
          {this.props.children}
          <Snackbar
            style={{left: sidebarWidth}}
            open={!!this.props.error}
            message={this.props.error}
            autoHideDuration={3000}
            onRequestClose={this.onCloseSnackbar}
          />
        </div>
			</div>
		);
	}

  renderNav = () => {
    const links = [
      {name: 'Leaderboard', url: '/app/home', icon: 'whatshot'},
      {name: 'Notifications', url: '/app/notifications', icon: 'notifications'},
      {name: 'Quests', url: '/app/tasks', icon: 'assignment_turned_in'},
      //{name: 'Help', url: '/app/settings', icon: 'info'}
    ];

    const tabStyles = {
      fontSize: 10
    };
    if (isMobile) {
      return (
        <Tabs value={this.props.location.pathname} className={styles.NavTabs} onChange={this.onNavigateMobile}>
          {links.map((link) =>
            <Tab
              key={link.url}
              value={link.url}
              icon={<FontIcon className="material-icons">{link.icon}</FontIcon>}
              className={this.props.location.pathname.includes(link.url) ? styles.NavTabActive : styles.NavTab}/>
          )}
        </Tabs>
      );
    } else {
      const menuItemStyle = {
        fontFamily: 'Avenir'
      };
      const leftNavProps = {
        docked: !isMobile,
        width: sidebarWidth,
        swipeAreaWidth: null
      };
      return (
        <Drawer {...leftNavProps}>
          <List><ListItem leftAvatar={<Avatar/>} primaryText={this.state.user.name} disabled={true} style={menuItemStyle}></ListItem></List>
          <Divider/>
          <SelectableList value={this.props.location.pathname.split('/').slice(0, 3).join('/')} onChange={this.onNavigate}>
            {links.map((link) =>
              <ListItem
                key={link.name}
                value={link.url}
                style={menuItemStyle}
                leftIcon={<FontIcon className="material-icons">{link.icon}</FontIcon>}>
                  {link.name}
              </ListItem>
            )}
          </SelectableList>
          <div className={styles.DrawerFooter}>
            <Divider/>
            <ListItem onTouchTap={this.logout} style={menuItemStyle} leftIcon={<FontIcon className="material-icons">lock</FontIcon>}>Sign out</ListItem>
          </div>
        </Drawer>
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

  onNavigate = (event, path) => {
    this.onNavigateMobile(path);
  };

  onNavigateMobile = (path) => {
    this.props.router.push(path);
  }
}

function mapStateToProps(state, props) {
  return {
    error: state.get('error')
  };
}

export default connect(mapStateToProps)(withRouter(Application));
