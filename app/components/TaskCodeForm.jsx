import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Fieldset from 'components/Fieldset';

class TaskCodeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  render() {
    return (
      <Fieldset>
        <TextField fullWidth={true} hintText="Insert task code" type="text" value={this.state.value} onChange={this.onChange}></TextField>
        <RaisedButton label="Check code" primary={true} fullWidth={true} onClick={this.onSubmit} disabled={this.props.loading}/>
      </Fieldset>
    );
  }

  onChange = (event) => {
    this.setState({value: event.target.value});
  }

  onSubmit = () => {
    this.props.onSubmit(this.state.value);
  }
}

export default TaskCodeForm;
