import Page from 'components/Page';
import Title from 'components/Title';
import Paragraph from 'components/Paragraph';
import Center from 'components/Center';
import RaisedButton from 'material-ui/lib/raised-button';
import {Link} from 'react-router';
import SuperTitle from 'components/SuperTitle';
import HeroTitle from 'components/HeroTitle';
import PrimaryButton from 'components/PrimaryButton';
import Logo from 'components/Logo';

class IntroPage extends React.Component {
  render() {
    return (
      <Page>
        <Center>
          <Logo/>
          <SuperTitle>Ropecon treasure hunt</SuperTitle>
          <HeroTitle>Join the fight for order or chaos!</HeroTitle>
          <Paragraph>
            Complete quests to lead your faction to a glorious victory.
            The winning faction will be crowned and rewarded in the Ropecon closing ceremony.
          </Paragraph>
          <Link to="signup/faction"><PrimaryButton>
            Join a faction
          </PrimaryButton></Link>
        </Center>
      </Page>
    );
  }
}

export default IntroPage;
