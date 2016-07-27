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

class SettingsPage extends React.Component {
  render() {
    return (
      <Page>
        <Center>
          <UserAvatar size={64} user={this.props.user} color={'white'}/>
          <Title>{this.props.user.get('name')}</Title>
        </Center>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: Immutable.fromJS({name: 'Mikko'})
  };
}

export default connect(mapStateToProps)(SettingsPage);
