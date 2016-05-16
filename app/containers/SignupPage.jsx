import Page from 'components/Page';
import SignupForm from 'containers/SignupForm';
import {Link} from 'react-router';
import Title from 'components/Title';
import api from 'lib/api';
import { browserHistory } from 'react-router'
import {PropTypes} from 'react';
import FooterLink from 'components/FooterLink';
import Center from 'components/Center';
import Subtitle from 'components/Subtitle';
import Logo from 'components/Logo';

class SignupPage extends React.Component {
  render() {
    return (
      <Page>
        <Center>
          <Logo/>
          <Title>Finishing touches</Title>
          <Subtitle>Your email will only be used for identification. It will not be visible to other users or staff.</Subtitle>
          <SignupForm onSubmit={this.onSubmit}></SignupForm>
        </Center>
        <FooterLink to="/login">Already have an account?</FooterLink>
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
