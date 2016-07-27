import React from "react";
import { RouteHandler } from "react-router";
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import { Link, withRouter } from 'react-router';
import UserAvatar from 'components/UserAvatar';
import Avatar from 'material-ui/Avatar';
import styles from "./Application.scss";
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {Divider as MaterialDivider, Toolbar, ToolbarTitle, ToolbarGroup} from 'material-ui';
import {connect} from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import {error} from 'actions/errorActions';
import Page from 'components/Page';
import NavTabs from 'containers/NavTabs';
import {Tabs} from 'components/Tabs';
import {Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import api from 'lib/api';
import Toggle from 'material-ui/Toggle';
import { reduxForm } from 'redux-form';
import {getFormState} from 'lib/immutableForm';
import {connect as connectSocket} from 'lib/socket';
import {isMobile} from 'lib/isMobile';

connectSocket();

const SelectableList = MakeSelectable(List);

const sidebarWidth = 260;

const Divider = () => (
  <MaterialDivider style={{backgroundColor: 'rgba(255,255,255,0.2)'}}/>
);

const menuItemStyle = {
  fontFamily: 'Avenir',
  fontSize: 15,
  color: 'rgba(255, 255, 255, 1)'
};
const menuIconStyle = {
  color: 'rgba(255,255,255,1)'
};

const profileLink = {
  name: 'Profile',
  url: '/app/profile',
  icon: 'account_circle'
}
const pageLinks = [
  {name: 'Leaderboard', url: '/app/home', icon: 'whatshot'},
  {name: 'Notifications', url: '/app/notifications', icon: 'notifications'},
  {name: 'Quests', url: '/app/tasks', icon: 'assignment_turned_in'}
];
const chatLinks = [
  {name: 'Global', url: '/app/chats/neutral', icon: 'public'},
  {name: 'Order', url: '/app/chats/order', icon: 'security'},
  {name: 'Chaos', url: '/app/chats/chaos', icon: 'flare'}
];

export default class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      administrate: false
    };
  }

  componentDidMount() {
    api.get('/me').then((user) => {
      this.setState({user: user});
    });
  }

	render() {
    console.log(this.props);
    const isMobileDevice = isMobile();
    const contentStyle = {};
    if (isMobileDevice && this.isInChat()) {
      contentStyle['top'] = 49;
    } else if (isMobileDevice) {
      contentStyle['bottom'] = 49;
    } else {
      contentStyle['left'] = sidebarWidth;
    }
    const toolbarStyle = {
      background: 'linear-gradient(to right, #4cb970, #5fa694)'
    };
    console.log('RENDER', this.props.test);
		return (
			<div className={styles.Application}>
        {this.renderNav()}
        <div className={styles.Header}>
          {isMobileDevice && this.props.location.pathname.includes('chats/') &&
            <Toolbar style={toolbarStyle}>
              <ToolbarGroup firstChild={true}>
                <FontIcon className="material-icons" onClick={() => this.props.router.push('/app/chats')}>keyboard_arrow_left</FontIcon>
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarTitle text={_.upperFirst(_.last(this.props.location.pathname.split('/')))}/>
              </ToolbarGroup>
            </Toolbar>}
          <div className={styles.Content} style={contentStyle}>
            {this.props.children}
          </div>
          {this.props.appError &&
            <Snackbar
              style={this.getSnackbarStyle()}
              open={!!this.props.appError}
              message={this.props.appError}
              autoHideDuration={3000}
              onRequestClose={this.onCloseSnackbar}
              />
          }
        </div>
			</div>
		);
	}

  getSnackbarStyle() {
    if (isMobile()) {
      return {bottom: 49};
    } else {
      return {left: sidebarWidth};
    }
  }

  renderNavLink = (link) => {
    if (isMobile()) {
      return this.renderMobileNavLink(link);
    } else {
      return this.renderDesktopNavLink(link)
    }
  }

  renderDesktopNavLink = (link) => {
    return <ListItem
      key={link.name}
      value={link.url}
      style={menuItemStyle}
      leftIcon={<FontIcon className="material-icons" style={menuIconStyle}>{link.icon}</FontIcon>}
      onClick={this.onNavigate.bind(this, link.url)}>
        {link.name}
    </ListItem>;
  }

  renderMobileNavLink = (link) => {
    return <Tab
      key={link.url}
      value={link.url}
      icon={<FontIcon className="material-icons">{link.icon}</FontIcon>}
      className={this.props.location.pathname.includes(link.url) ? styles.NavTabActive : styles.NavTab}/>;
  }

  renderNav = () => {
    if (isMobile()) {
      return this.renderMobileNav();
    } else {
      return this.renderDesktopNav();
    }
  }

  renderMobileNav = () => {
    if (!this.isInChat()) {
      const discussionsLink = {
        name: 'Discussions',
        url: '/app/chats',
        icon: 'chat'
      };
      const tabs = pageLinks.map(this.renderMobileNavLink)
        .concat(this.renderMobileNavLink(profileLink))
        .concat(this.renderMobileNavLink(discussionsLink));

      return (
        <Tabs value={this.props.location.pathname} className={styles.NavTabs} onChange={this.onNavigateMobile}>
          {tabs}
        </Tabs>
      );
    }
    return [];
  }

  renderDesktopNav() {
    const {fields} = this.props;
    const subheaderStyle = {
      ...menuItemStyle,
      fontSize: 14,
      color: 'rgba(255,255,255,1)'
    };
    const leftNavProps = {
      docked: !isMobile(),
      width: sidebarWidth,
      swipeAreaWidth: null,
      containerClassName: styles.Drawer
    };
    const pathName = this.props.location.pathname;
    let currentValue;
    if (this.isInChat()) {
      currentValue = pathName;
    } else {
      currentValue = this.props.location.pathname.split('/').slice(0, 3).join('/');
    }
    let links = [];
    links = links.concat(pageLinks.map(this.renderDesktopNavLink));
    links = links.concat([<Divider/>, <Subheader style={subheaderStyle}>Discussions</Subheader>]);
    links = links.concat(chatLinks.map(this.renderDesktopNavLink));
    return (
      <Drawer {...leftNavProps}>
        <SelectableList value={currentValue}>
          <ListItem
            leftAvatar={<UserAvatar color="white" user={this.state.user}/>}
            primaryText={this.state.user.name}
            style={menuItemStyle}
            onClick={this.onNavigate.bind(this, '/app/profile')}/>
        </SelectableList>
        <Divider/>
        <SelectableList value={currentValue}>
          {links}
        </SelectableList>
        <div className={styles.DrawerFooter}>
          <Divider/>
          <ListItem onTouchTap={this.logout} style={menuItemStyle} leftIcon={<FontIcon className="material-icons" style={menuIconStyle}>lock</FontIcon>}>Sign out</ListItem>
        </div>
      </Drawer>
    );
  }

  isInChat() {
    return this.props.location.pathname.includes('/chats/');
  }

  logout = () => {
    api.logOut().then(() => {
      this.props.router.push('/');
    });
  }

  onCloseSnackbar = () => {
    this.props.dispatch(error(false));
  }

  onNavigate = (path, event) => {
    event.stopPropagation();
    this.onNavigateMobile(path);
  };

  onNavigateMobile = (path) => {
    this.props.router.push(path);
  }
}

export default withRouter(reduxForm({
  form: 'settings',
  fields: ['administrate'],
  getFormState
}, (state) => {
  console.log(state.get('error'));
  return {
    appError: state.get('error'),
    initialValues: {
      administrate: false
    }
  };
})(Application));
