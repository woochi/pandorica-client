import styles from './Subtitle.scss';

class Subtitle extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Subtitle';
  }

  render() {
    return <div className={styles.Subtitle}>{this.props.children}</div>;
  }
}

export default Subtitle;

