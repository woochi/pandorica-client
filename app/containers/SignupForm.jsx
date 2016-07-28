import {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Fieldset from 'components/Fieldset';
import {getFormState} from 'lib/immutableForm';
import PrimaryButton from 'components/PrimaryButton';

export const fields = ['name', 'email', 'password', 'faction'];

class SignupForm extends React.Component {
  render() {
    const {
      fields: {name, email, password},
      handleSubmit
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Fieldset>
          <TextField ref="name" type="text" hintText="Username" fullWidth={true} {...name}/>
          <TextField type="email" hintText="Email" fullWidth={true} {...email}/>
          <TextField type="password" hintText="Password" fullWidth={true} {...password}/>
        </Fieldset>
        <PrimaryButton>Join the fight!</PrimaryButton>
      </form>
    );
  }

  componentDidMount() {
    this.refs.name.focus();
  }
}

export default reduxForm({
  form: 'signup',
  fields,
  getFormState,
  destroyOnUnmount: false,
  overwriteOnInitialValuesChange: false
})(SignupForm);
