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

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = !!md.mobile();

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: !isMobile};
  }

	render() {
    const leftNavWidth = 300;
    const leftNavProps = {
      docked: !isMobile,
      width: 300,
      swipeAreaWidth: null,
      open: this.state.open
    };
    const contentStyle = {};
    if (isMobile) {
      leftNavProps['onRequestChange'] = open => this.setState({open});
    } else {
      contentStyle['paddingLeft'] = leftNavWidth;
    }
		return (
			<div className={styles.Application}>
        <LeftNav {...leftNavProps}>
          <List><ListItem leftAvatar={<Avatar/>} primaryText="Mikko" disabled={true}></ListItem></List>
          <Divider/>
          <MenuItem onTouchTap={this.onNavigate.bind(this, '/app/notifications')}>Notifications</MenuItem>
          <MenuItem onTouchTap={this.onNavigate.bind(this, '/app/home')}>Leaderboard</MenuItem>
          <MenuItem onTouchTap={this.onNavigate.bind(this, '/app/tasks')}>Tasks</MenuItem>
        </LeftNav>
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
