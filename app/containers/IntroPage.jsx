import Page from 'components/Page';
import Title from 'components/Title';
import Paragraph from 'components/Paragraph';
import Center from 'components/Center';
import {Link} from 'react-router';
import SuperTitle from 'components/SuperTitle';
import HeroTitle from 'components/HeroTitle';
import PrimaryButton from 'components/PrimaryButton';
import Logo from 'components/Logo';
import GreyLink from 'components/GreyLink';

class IntroPage extends React.Component {
  render() {
    return (
      <Page>
        <Center>
          <Logo/>
          <SuperTitle>Ropecon treasure hunt</SuperTitle>
          <HeroTitle>Join the fight for order or chaos!</HeroTitle>
          <Paragraph>
            Complete quests, collect points and lead your faction to a glorious victory.
            The winning faction will be crowned and rewarded in the Ropecon closing ceremony.
          </Paragraph>
          <Link to="signup/faction"><PrimaryButton>
            Join the game
          </PrimaryButton></Link>
          <Paragraph><GreyLink to="login">Already have an account? Sign in.</GreyLink></Paragraph>
        </Center>
      </Page>
    );
  }
}

export default IntroPage;
