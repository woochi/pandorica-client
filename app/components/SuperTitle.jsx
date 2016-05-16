import styles from './SuperTitle.scss';

class SuperTitle extends React.Component {
  render() {
    return <div className={styles.SuperTitle}>{this.props.children}</div>;
  }
}

export default SuperTitle;
