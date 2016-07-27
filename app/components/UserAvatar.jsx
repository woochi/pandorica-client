import React from 'react';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

class UserAvatar extends React.Component {
  static defaultProps = {
    size: 40,
    color: 'rgba(0,0,0,0.5)'
  }

  render() {
    if (this.props.user.avatar) {
      return <Avatar size={this.props.size} {...this.props}/>;
    } else {
      const iconStyle = {...this.props.style, fontSize: this.props.size, color: this.props.color};
      return <FontIcon {...this.props} className="material-icons" style={iconStyle}>account_circle</FontIcon>;
    }
  }
}

export default UserAvatar;
