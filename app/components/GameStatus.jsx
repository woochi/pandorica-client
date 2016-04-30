import styles from './GameStatus.scss';
import CircularProgress from 'material-ui/lib/circular-progress';

export default class GameStatus extends React.Component {
  render () {
    return (
      <div className={styles.this}>
        <div className={styles.chaosProgress}>
          <CircularProgress mode="determinate" value={100} size={3}/>
        </div>
        <div className={styles.orderProgress}>
          <CircularProgress mode="determinate" value={75} size={3} className={styles.orderProgress}/>
        </div>
      </div>
    );
  }
}
