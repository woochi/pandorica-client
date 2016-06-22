import CircularProgress from 'material-ui/CircularProgress';
import Center from 'components/Center';

class Loader extends React.Component {
  render() {
    return this.renderContent(this.props.loading);
  }

  renderContent() {
    if (this.props.loading) {
      return (<Center><CircularProgress/></Center>);
    } else {
      return this.props.children;
    }
  }
}

export default Loader;
