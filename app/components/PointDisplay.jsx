import CircularProgress from 'material-ui/lib/circular-progress';
import styles from './PointDisplay.scss';
import Counter from 'components/Counter';
import classnames from 'classnames';

export default class PointDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      run: false
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.run()
    }, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const counterClassName = classnames({
      'invisible': this.props.run,
      [styles.counter]: true
    });
    const progressClassName = classnames({
      'invisible': this.props.run,
      [styles.Progress]: true
    });
    const progressValue = this.state.run ? 100: 0;
    return (
      <div className={styles.PointDisplay}>
        <div className={styles.counterWrapper}>
          <Counter className={counterClassName} to={this.props.points} duration={2000} delay={500}/>
          <div className={styles.suffix}>Points</div>
        </div>
        <CircularProgress className={progressClassName} mode="determinate" value={progressValue} size={3}/>
        <CircularProgress className={styles.Base} mode="determinate" value={100} size={3}/>
      </div>
    );
  }

  run = () => {
    this.setState({run: true});
  }
}