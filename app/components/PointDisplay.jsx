import CircularProgress from 'material-ui/lib/circular-progress';
import styles from './PointDisplay.scss';
import Counter from 'components/Counter';

export default class PointDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0
    };
  }

  componentDidUpdate() {
    this.timer = setTimeout(() => this.progress(100), 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <div className={styles.PointDisplay}>
        <div className={styles.CounterWrapper}>
          <Counter className={styles.Counter} to={4000} duration={2000} delay={500}/>
        </div>
        <CircularProgress className={styles.Progress} mode="determinate" value={this.state.completed} size={3}/>
        <CircularProgress className={styles.Base} mode="determinate" value={100} size={3}/>
      </div>
    );
  }

  progress = (completed) => {
    this.setState({completed: completed});
  }
}