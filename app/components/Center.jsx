import styles from './Center.scss';

export default class Center extends React.Component {
  render() {
    return (
      <div className={styles.Center}>
        <div className={styles.CenterPadding}>
          <div className={styles.CenterContent}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
