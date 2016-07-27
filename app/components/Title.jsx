import styles from './Title.scss';

class Title extends React.Component {
  render() {
    return <div className={styles.Title} {...this.props}>{this.props.children}</div>;
  }
}

export default Title;

