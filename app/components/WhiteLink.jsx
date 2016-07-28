import {Link} from 'react-router';
import styles from './WhiteLink.scss';

class WhiteLink extends React.Component {
  render() {
    return <Link {...this.props} className={styles.WhiteLink}>{this.props.children}</Link>
  }
}

export default WhiteLink;
