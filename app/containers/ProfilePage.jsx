import React from 'react';
import {Page, PaddedContainer} from 'components/Page';
import Title from 'components/Title';
import PrimaryButton from 'components/PrimaryButton';
import Paragraph from 'components/Paragraph';
import {Divider} from 'material-ui';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import Center from 'components/Center';
import UserAvatar from 'components/UserAvatar';
import Fieldset from 'components/Fieldset';
import {TextField, RaisedButton} from 'material-ui';
import {reduxForm} from 'redux-form';
import {getFormState} from 'lib/immutableForm';
import {update as updateUser} from 'actions/userActions';
import store from 'store';

class SettingsPage extends React.Component {
  render() {
    const {fields, submitting, handleSubmit} = this.props;

    return (
      <Page>
        <Center>
          <UserAvatar size={64} user={this.props.user}/>
          <Title>Edit profile</Title>
          <Fieldset>
            <TextField
              floatingLabelFixed={true}
              fullWidth={true}
              floatingLabelText="Username"
              hintText="Min. 3 characters"
              {...fields.name}/>
            <TextField
              floatingLabelFixed={true}
              fullWidth={true}
              floatingLabelText="Email address"
              hintText="e.g. alice@ropecon.fi"
              {...fields.email}/>
          </Fieldset>
          <Fieldset>
            <RaisedButton fullWidth={true} primary={true} label="Save" onClick={handleSubmit} disabled={submitting}/>
          </Fieldset>
        </Center>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  const user = state.get('user');
  return {
    user: user,
    initialValues: user.toJS(),
    onSubmit: (values) => {
      return store.dispatch(updateUser(values));
    }
  };
}

export default reduxForm({
  form: 'profile',
  fields: ['name', 'email'],
  getFormState
}, mapStateToProps)(SettingsPage);
