import CountdownTimer from 'react-countdown-timer';
import moment from 'moment';
import styles from './Countdown.scss';

const TimeSection = (props) => {
  return (
    <div className={styles.section}>
      <div className={styles.value}>{props.value}</div>
      <div className={styles.label}>{props.label}</div>
    </div>
  );
};

class Countdown extends React.Component {
  static defaultProps = {
    endTime: Date.parse('Fri, 29 Jul 2016 09:00:00 GMT+2'),
    interval: 1000
  }

  componentWillMount() {
    this.update = setInterval(this.forceUpdate.bind(this), this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.update);
  }

  render() {
    const currentTime = Date.now();
    const timeRemaining = moment.duration(this.props.endTime - currentTime);

    return (
      <div className={styles.normal}>
        <TimeSection value={Math.floor(timeRemaining.asDays())} label="days"/>
        <TimeSection value={timeRemaining.hours()} label="hours"/>
        <TimeSection value={timeRemaining.minutes()} label="minutes"/>
        <TimeSection value={timeRemaining.seconds()} label="seconds"/>
      </div>
    )
  }
}

export default Countdown;
