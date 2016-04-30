import Title from 'components/Title';
import LoginForm from 'containers/LoginForm';
import Page from 'components/Page';
import FooterLink from 'components/FooterLink';
import api from 'lib/api';
import Center from 'components/Center';

class LoginPage extends React.Component {
  render() {
    return (
      <Page>
        <Center>
          <Title>Log In</Title>
          <LoginForm onSubmit={this.onSubmit}></LoginForm>
        </Center>
        <FooterLink to="signup">Don't have an account yet?</FooterLink>
      </Page>
    );
  }

  onSubmit = (values) => {
    api.logIn(values).then(() => {
      this.props.history.replace('/app');
    }).catch((error) => {
      // TODO: Error handling
      console.log(error);
    });
  }
}

export default LoginPage;
