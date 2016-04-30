import Page from 'components/Page';
import SignupForm from 'containers/SignupForm';
import {Link} from 'react-router';
import Title from 'components/Title';
import api from 'lib/api';
import { browserHistory } from 'react-router'
import {PropTypes} from 'react';
import FooterLink from 'components/FooterLink';
import Center from 'components/Center';

class SignupPage extends React.Component {
  render() {
    return (
      <Page>
        <Center>
          <Title>Create an account</Title>
          <SignupForm onSubmit={this.onSubmit}></SignupForm>
        </Center>
        <FooterLink to="login">Already have an account?</FooterLink>
      </Page>
    );
  }

  onSubmit = (values) => {
    return api.signUp(values).then((response) => {
      this.props.history.replace('/');
    }).catch((error) => {
      console.log(error);
    });
  }
}

export default SignupPage;
