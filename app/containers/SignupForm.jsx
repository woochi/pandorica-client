import {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Fieldset from 'components/Fieldset';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import {getFormState} from 'lib/immutableForm';

export const fields = ['name', 'email', 'password', 'alignment'];

class SignupForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const {
      fields: {name, email, password, alignment},
      handleSubmit
    } = this.props;

    return (
      <form>
        <Fieldset>
          <TextField type="text" placeholder="Name" {...name}/>
          <TextField name="email" placeholder="Email" {...email}/>
          <TextField name="password" placeholder="Password" {...password}/>
          <SelectField name="alignment" {...alignment} onChange={this.handleChange}>
            <MenuItem value={"neutral"} primaryText="Neutral" />
            <MenuItem value={"order"} primaryText="Order" />
            <MenuItem value={"chaos"} primaryText="Chaos" />
          </SelectField>
          <RaisedButton primary={true} label="Create account" fullWidth={true} onClick={handleSubmit}/>
        </Fieldset>
      </form>
    );
  }

  handleChange = (event, index, value) => {
    this.props.fields.alignment.onChange(value);
  }
}

export default reduxForm({
  form: 'signup',
  fields,
  getFormState
}, (state) => {
  return {
    initialValues: {
      alignment: 'neutral'
    }
  };
})(SignupForm);
