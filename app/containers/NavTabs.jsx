import styles from './NavTabs.scss';

class NavTabs extends React.Component {
  render() {
    return (
      <div className={styles.NavTabs}>
        <div className={styles.NavTab}>Notif</div>
        <div className={styles.NavTab}>Leader</div>
        <div className={styles.NavTab}>Task</div>
      </div>
    );
  }
}

export default NavTabs;
