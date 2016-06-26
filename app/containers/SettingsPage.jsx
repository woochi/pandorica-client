import React from 'react';
import {Page, PaddedContainer} from 'components/Page';
import Title from 'components/Title';
import PrimaryButton from 'components/PrimaryButton';
import Paragraph from 'components/Paragraph';
import Divider from 'material-ui/Divider';

class SettingsPage extends React.Component {
  render() {
    return (
      <Page>
        <PaddedContainer>
          <Title>Hi, Mikko</Title>
          <Paragraph>
            Ropecon treasure hunt is an online competition for the Ropecon event.
            Complete quests and collect points to fight for order or chaos (or just for fun).
          </Paragraph>
          <Paragraph>
            There are three ways to collect points:
            <ol>
              <li>Attend a lecture and ask for a quest code afterwards from the lecturer</li>
              <li>Follow your notifications list and complete quests according to instructions</li>
              <li>Search and find hidden treasure quests scattered around the event area</li>
            </ol>
          </Paragraph>
          <Divider/>
          <Title>Winners take it all</Title>
          <Paragraph>
            The winning team will be crowned and rewarded in the closing ceremony.
            Follow your team's progress on the leaderboard to make sure you're on top when the competition ends!
          </Paragraph>
          <Divider/>
          <Title>Competition time remaining</Title>
          <Divider/>
          <PrimaryButton>Sign out</PrimaryButton>
        </PaddedContainer>
      </Page>
    );
  }
}

export default SettingsPage;
