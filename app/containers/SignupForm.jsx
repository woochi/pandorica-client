import {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Fieldset from 'components/Fieldset';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import {getFormState} from 'lib/immutableForm';
import PrimaryButton from 'components/PrimaryButton';

export const fields = ['name', 'email', 'password'];

class SignupForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const {
      fields: {name, email, password},
      handleSubmit
    } = this.props;

    return (
      <form>
        <Fieldset>
          <TextField ref="name" type="text" hintText="Username" fullWidth={true} {...name}/>
          <TextField type="email" hintText="Email" fullWidth={true} {...email}/>
          <TextField type="password" hintText="Password" fullWidth={true} {...password}/>
        </Fieldset>
        <PrimaryButton onClick={this.props.handleSubmit}>Join the fight!</PrimaryButton>
      </form>
    );
  }

  componentDidMount() {
    this.refs.name.focus();
  }

  handleChange = (event, index, value) => {
    this.props.fields.faction.onChange(value);
  }
}

export default reduxForm({
  form: 'signup',
  fields,
  getFormState,
  destroyOnUnmount: false
})(SignupForm);
