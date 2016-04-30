import styles from './Title.scss';

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Title';
  }

  render() {
    return <div className={styles.Title}>{this.props.children}</div>;
  }
}

export default Title;

