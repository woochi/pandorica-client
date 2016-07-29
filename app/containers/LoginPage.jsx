import Title from 'components/Title';
import LoginForm from 'containers/LoginForm';
import Page from 'components/Page';
import FooterLink from 'components/FooterLink';
import api from 'lib/api';
import Center from 'components/Center';
import Subtitle from 'components/Subtitle';
import Logo from 'components/Logo';
import Paragraph from 'components/Paragraph';
import WhiteLink from 'components/WhiteLink';
import {withRouter} from 'react-router';

class LoginPage extends React.Component {
  render() {
    return (
      <Page>
        <Center>
          <Logo/>
          <Title style={{color: 'white'}}>Welcome back</Title>
          <Subtitle style={{color: '#eee'}}>The fight still continues. Log in and get back to your quests.</Subtitle>
          <LoginForm onSubmit={this.onSubmit}></LoginForm>
          <Paragraph><WhiteLink to="/signup">Don't have an account yet? Sign up.</WhiteLink></Paragraph>
        </Center>
        <FooterLink to="/signup"></FooterLink>
      </Page>
    );
  }

  onSubmit = (values) => {
    api.logIn(values).then(() => {
      const routerState = this.props.location.state;
      const nextPathname = _.get(routerState, 'nextPathname');
      const nextQuery = _.get(routerState, 'nextQuery');

      if (nextPathname) {
        this.props.router.replace({
          pathname: nextPathname,
          query: nextQuery
        });
        return;
      }
      this.props.router.replace('/app');
    }).catch((error) => {
      // TODO: Error handling
      console.log(error);
    });
  }
}

export default withRouter(LoginPage);
