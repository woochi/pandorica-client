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
import store from 'store';
import {humanizeFaction} from 'lib/factions';

class SignupPage extends React.Component {
  render() {
    const faction = store.getState().getIn(['form', 'signup', 'faction', 'value']);
    return (
      <Page>
        <Center>
          <Logo/>
          <Title>You are joining the ranks of <Link to="/signup/faction">{humanizeFaction(faction)}</Link></Title>
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
