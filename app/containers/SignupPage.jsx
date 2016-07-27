import Page from 'components/Page';
import SignupForm from 'containers/SignupForm';
import {Link} from 'react-router';
import Title from 'components/Title';
import api from 'lib/api';
import { browserHistory } from 'react-router'
import {PropTypes} from 'react';
import GreyLink from 'components/GreyLink';
import Center from 'components/Center';
import Subtitle from 'components/Subtitle';
import Logo from 'components/Logo';
import store from 'store';
import {humanizeFaction} from 'lib/factions';
import Paragraph from 'components/Paragraph';

class SignupPage extends React.Component {
  render() {
    const faction = store.getState().getIn(['form', 'signup', 'faction', 'value']);
    console.log('SIGNUP PAGE', faction);
    return (
      <Page>
        <Center>
          <Logo/>
          <Title style={{color: 'white'}}>You are joining the ranks of {humanizeFaction(faction)}</Title>
          <Subtitle>Your email will only be used for identification. It will not be visible to other users or staff.</Subtitle>
          <SignupForm onSubmit={this.onSubmit}></SignupForm>
          <Paragraph><GreyLink to="/login">Already have an account? Log in.</GreyLink></Paragraph>
        </Center>
      </Page>
    );
  }

  onSubmit = (values) => {
    return api.signUp(values).then((response) => {
      this.props.history.replace('/app');
    }).catch((error) => {
      console.log(error);
    });
  }
}

export default SignupPage;
