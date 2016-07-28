import styles from './Subtitle.scss';

class Subtitle extends React.Component {
  render() {
    console.log('PROPS', this.props);
    return <div className={styles.Subtitle} {...this.props}>{this.props.children}</div>;
  }
}

export default Subtitle;
