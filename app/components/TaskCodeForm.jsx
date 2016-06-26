import TextField from 'components/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Fieldset from 'components/Fieldset';
import GreenButton from 'components/GreenButton';

class TaskCodeForm extends React.Component {
  constructor() {
    super();
    this.state = {value: ''};
  }

  render() {
    return (
      <div>
        <Fieldset>
          <TextField
            fullWidth={true}
            autoFocus={true}
            placeholder="Type in the quest code"
            type="text"
            value={this.state.value}
            onChange={this.onInput}
            maxLength={6}/>
        </Fieldset>
        <Fieldset>
          <GreenButton fullWidth={true} onClick={this.onSubmit} disabled={this.props.loading}>Check code</GreenButton>
        </Fieldset>
      </div>
    );
  }

  onInput = (e) => {
    this.setState({value: e.target.value});
  }

  onSubmit = () => {
    this.props.onSubmit(this.state.value);
  }
}

export default TaskCodeForm;
