import classnames from 'classnames';
import styles from './Page.scss';

export class Page extends React.Component {
  render() {
    const className = classnames(styles.Page, this.props.className);
    return (
      <div className={className} {...this.props}>{this.props.children}</div>
    );
  }
};

export class PageSlider extends React.Component {
  render() {
    return (
      this.props.children[this.props.index]
    );
  }
}

export class PaddedContainer extends React.Component {
  render() {
    return <div className={styles.PaddedContainer}>{this.props.children}</div>
  }
}

export default Page;
