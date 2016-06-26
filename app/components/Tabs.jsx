import React from "react";
import {Tabs as MaterialTabs, Tab} from 'material-ui/Tabs';
import styles from './Tabs.scss';
import classnames from 'classnames';

export class Tabs extends React.Component {
  render() {
    const inkBarStyle = {
      display: 'none'
    };
    const className = classnames(styles.Tabs, this.props.className);
    return (
      <MaterialTabs {...this.props} inkBarStyle={inkBarStyle} className={className}/>
    );
  }
}

export Tab from 'material-ui/Tabs';
