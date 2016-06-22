import styles from './Field.scss';

class Field extends React.Component {
  render() {
    return (
      <div className={styles.Field}>
        {this.props.children}
      </div>
    );
  }
}

export default Field;
