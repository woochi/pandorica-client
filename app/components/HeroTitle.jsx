import styles from './HeroTitle.scss';

class HeroTitle extends React.Component {
  render() {
    return <div className={styles.HeroTitle} {...this.props}>{this.props.children}</div>;
  }
}

export default HeroTitle;
