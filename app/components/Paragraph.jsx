import styles from './Paragraph.scss';

export default class Paragraph extends React.Component {
  render() {
    return (
      <div className={styles.Paragraph}>{this.props.children}</div>
    )
  }
}
