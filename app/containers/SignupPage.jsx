import Page from 'components/Page';
import SignupForm from 'containers/SignupForm';
import {Link} from 'react-router';
import Title from 'components/Title';
import api from 'lib/api';
import { browserHistory, withRouter } from 'react-router'
import {PropTypes} from 'react';
import WhiteLink from 'components/WhiteLink';
import Center from 'components/Center';
import Subtitle from 'components/Subtitle';
import Logo from 'components/Logo';
import store from 'store';
import {humanizeFaction} from 'lib/factions';
import Paragraph from 'components/Paragraph';

class SignupPage extends React.Component {
  render() {
    return (
      <Page>
        <Center>
          <Logo/>
          <Title style={{color: 'white'}}>You are joining the ranks of {humanizeFaction(this.props.location.query.faction)}</Title>
          <Subtitle style={{color: '#eee'}}>Your email will only be used for identification. It will not be visible to other users or staff.</Subtitle>
          <SignupForm onSubmit={this.onSubmit}></SignupForm>
          <Paragraph><WhiteLink to="/login">Already have an account? Log in.</WhiteLink></Paragraph>
        </Center>
      </Page>
    );
  }

  onSubmit = (values) => {
    const faction = this.props.location.query.faction;
    return api.signUp({...values, faction}).then((response) => {
      this.props.history.replace('/app');
    }).catch((error) => {
      console.log(error);
    });
  }
}

export default withRouter(SignupPage);
