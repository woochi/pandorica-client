import TextField from 'components/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Fieldset from 'components/Fieldset';
import GreenButton from 'components/GreenButton';

class TaskCodeForm extends React.Component {
  render() {
    return (
      <div>
        <Fieldset>
          <TextField
            fullWidth={true}
            autoFocus={true}
            placeholder="Type in the quest code"
            type="text"
            value={this.props.value}
            onChange={this.props.onChange}
            maxLength={6}/>
        </Fieldset>
        <Fieldset>
          <GreenButton fullWidth={true} onClick={this.onSubmit} disabled={this.props.loading}>Check code</GreenButton>
        </Fieldset>
      </div>
    );
  }

  onSubmit = () => {
    this.props.onSubmit(this.props.value);
  }
}

export default TaskCodeForm;
