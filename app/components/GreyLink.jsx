import {Link} from 'react-router';
import styles from './GreyLink.scss';

class GreyLink extends React.Component {
  render() {
    return <Link {...this.props} className={styles.GreyLink}>{this.props.children}</Link>
  }
}

export default GreyLink;
