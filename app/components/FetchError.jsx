import Center from 'components/Center';
import Paragraph from 'components/Paragraph';
import RaisedButton from 'material-ui/lib/raised-button';

export default class FetchError extends React.Component {
  render() {
    return (
      <Center>
        <Paragraph>
          Seems like we're having issues loading some data.
          Try reloading after a moment. If the problem persists, please let the staff know.
        </Paragraph>
        <RaisedButton label="Reload" primary={true}/>
      </Center>
    );
  }
}
