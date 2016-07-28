import React from "react";
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Page from 'components/Page';
import GameStatus from 'components/GameStatus';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Center from 'components/Center';
import Title from 'components/Title';
import Subtitle from 'components/Subtitle';
import Paragraph from 'components/Paragraph';
import Countdown from 'components/Countdown';
import {getNormalized} from 'actions/apiActions';
import Faction from 'models/faction';
import {arrayOf} from 'normalizr';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import Loader from 'components/Loader';
import {CircularProgress, Divider} from 'material-ui';
import styles from './HomePage.scss';
import numeral from 'numeral';

function formatPoints(points) {
  const number = numeral(points);
  if (points > 100000000) {
    return number.format('0.0a');
  }
  return number.format();
}

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(getNormalized('/factions', arrayOf(Faction)));
  }

	render() {
		return (
			<Page>
        <Center>
          <Loader loading={this.props.loading}>
            {this.renderContent()}
          </Loader>
        </Center>
			</Page>
		);
	}

  renderContent() {
    const {factions} = this.props;

    if (!factions.size) {
      return <div></div>;
    } else {
      const chaos = factions.get('CHAOS');
      const order = factions.get('ORDER');
      const orderPoints = order.get('points');
      const chaosPoints =  chaos.get('points');
      const totalPoints = orderPoints + chaosPoints

      const ratio = orderPoints / totalPoints;

      console.log('RATIO', orderPoints, totalPoints, ratio);
      return <div>
        <div className={styles.statusDisplay}>
          <div className={styles.progressContainer}>
            <div className={styles.orderProgress}><CircularProgress mode="determinate" size={3.5} value={100}/></div>
            <div className={styles.chaosProgress}><CircularProgress mode="determinate" size={3.5} value={100 * (1 - ratio)}/></div>
          </div>
          <div className={styles.pointsContainer}>
            <div className={styles.orderPoints}>{formatPoints(orderPoints)}<div className={styles.pointsLabel}>Order</div></div>
            <Divider/>
            <div className={styles.chaosPoints}>{formatPoints(chaosPoints)}<div className={styles.pointsLabel}>Chaos</div></div>
          </div>
        </div>
        <Title>{this.renderTitle()}</Title>
        <Subtitle>{this.renderSubtitle()}</Subtitle>
      </div>;
    }
  }

  getWinningFaction() {
    return this.props.factions
      .filter((faction) => faction.get('name') !== 'NEUTRAL')
      .sort((a, b) => b.get('points') - a.get('points')).first();
  }

  belongsToWinningFaction() {
    return this.props.user.get('faction') === this.getWinningFaction().get('name');
  }

  renderTitle() {
    if (this.getWinningFaction().get('name') === 'CHAOS') {
      return 'Chaos reigns supreme!';
    } else {
      return 'Order has been restored!';
    }
  }

  renderSubtitle() {
    if (this.belongsToWinningFaction()) {
      return 'Continue supporting your faction by completing quests.';
    } else {
      return 'Help your faction back to the top by completing more quests.'
    }
  }
}

function mapStateToProps(state) {
  const factions = state.getIn(['entities', 'factions'], new Map());
  return {
    factions: factions,
    loading: !factions.size,
    user: state.get('user')
  };
}

export default connect(mapStateToProps)(HomePage);
