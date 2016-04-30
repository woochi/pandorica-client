import {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Fieldset from 'components/Fieldset';
import {getFormState} from 'lib/immutableForm';

export const fields = ['email', 'password'];

class LoginForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const {
      fields: {email, password},
      handleSubmit
    } = this.props;

    return (
      <form>
        <Fieldset>
          <TextField type="email" hintText="Email" {...email}/>
          <TextField type="password" hintText="Password" {...password}/>
          <RaisedButton primary={true} label="Log in" fullWidth={true} onClick={handleSubmit}/>
        </Fieldset>
      </form>
    )
  }
}

export default reduxForm({
  form: 'login',
  fields,
  getFormState
})(LoginForm);
