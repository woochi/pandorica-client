import {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Fieldset from 'components/Fieldset';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import {getFormState} from 'lib/immutableForm';

export const fields = ['name', 'email', 'password', 'faction'];

class SignupForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const {
      fields: {name, email, password, faction},
      handleSubmit
    } = this.props;

    return (
      <form>
        <Fieldset>
          <TextField type="text" placeholder="Name" {...name}/>
          <TextField name="email" placeholder="Email" {...email}/>
          <TextField name="password" placeholder="Password" {...password}/>
          <SelectField name="faction" {...faction} onChange={this.handleChange}>
            <MenuItem value={'NEUTRAL'} primaryText="Neutral" />
            <MenuItem value={'ORDER'} primaryText="Order" />
            <MenuItem value={'CHAOS'} primaryText="Chaos" />
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
      faction: 'NEUTRAL'
    }
  };
})(SignupForm);
