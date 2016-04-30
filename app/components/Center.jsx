import styles from './Center.scss';

export default class Center extends React.Component {
  render() {
    return (
      <div className={styles.Center}>{this.props.children}</div>
    );
  }
}
