import styles from './Placeholder.scss';
import Center from 'components/Center';

export default class Placeholder extends React.Component {
  render() {
    return (
      <Center>
        <div className={styles.Placeholder}>{this.props.children}</div>
      </Center>
    );
  }
}
