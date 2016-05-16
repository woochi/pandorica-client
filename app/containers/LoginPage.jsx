import Title from 'components/Title';
import LoginForm from 'containers/LoginForm';
import Page from 'components/Page';
import FooterLink from 'components/FooterLink';
import api from 'lib/api';
import Center from 'components/Center';
import Subtitle from 'components/Subtitle';
import Logo from 'components/Logo';

class LoginPage extends React.Component {
  render() {
    return (
      <Page>
        <Center>
          <Logo/>
          <Title>Welcome back</Title>
          <Subtitle>The fight still continues. Log in and get back to your quests.</Subtitle>
          <LoginForm onSubmit={this.onSubmit}></LoginForm>
        </Center>
        <FooterLink to="/signup">Don't have an account yet?</FooterLink>
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
