import {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Fieldset from 'components/Fieldset';
import {getFormState} from 'lib/immutableForm';
import PrimaryButton from 'components/PrimaryButton';

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
      <form onSubmit={handleSubmit}>
        <Fieldset>
          <TextField ref="email" type="email" hintText="Email" fullWidth={true} {...email}/>
          <TextField type="password" hintText="Password" fullWidth={true} {...password}/>
        </Fieldset>
        <PrimaryButton type="submit">Log in</PrimaryButton>
      </form>
    )
  }

  componentDidMount() {
    this.refs.email.focus();
  }
}

export default reduxForm({
  form: 'login',
  fields,
  getFormState
})(LoginForm);
