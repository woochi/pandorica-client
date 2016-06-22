import React from 'react';
import Page from 'components/Page';
import Center from 'components/Center';
import Title from 'components/Title';
import Carousel from 'nuka-carousel';
import Paragraph from 'components/Paragraph';
import Card from 'components/Card';
import Deck from 'components/Deck';
import neutralImage from 'images/scales.png';
import orderImage from 'images/shield.png';
import chaosImage from 'images/swords.png';
import {reduxForm} from 'redux-form';
import SuperTitle from 'components/SuperTitle';
import {StaggeredMotion, spring} from 'react-motion';
import {getFormState} from 'lib/immutableForm';
import styles from './FactionSelectPage.scss';
import {withRouter} from 'react-router';
import MobileDetect from 'mobile-detect';
import SlideDeck from 'react-slide-deck';
import GreenButton from 'components/GreenButton';
import Subtitle from 'components/Subtitle';

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = !!md.mobile();

export const fields = ['faction'];

class FactionSelectPage extends React.Component {
  render() {
    return (
      <Page>
        {this.getContent()}
      </Page>
    );
  }

  getContent = () => {
    const cards = [
      {value: 'ORDER', image: orderImage, title: "Order", subtitle: "Collect points to maintain order.", buttonLabel: "Maintain order"},
      {value: 'NEUTRAL', image: neutralImage, title: "Balance", subtitle: "Collect points for fun.", buttonLabel: "Seek balance"},
      {value: 'CHAOS', image: chaosImage, title: "Chaos", subtitle: "Collect points to cause chaos.", buttonLabel: "Create chaos"}
    ];
    const {
      fields: {faction}
    } = this.props;
    const slideDeckState = {current: 0, horizontal: true, swipe: true};

    if (isMobile) {
      return (
        <div className={styles.MobileContainer}>
          <SlideDeck {...slideDeckState}>
            {cards.map((card, i) =>
              <SlideDeck.Slide key={i}>
                <Center>
                  <div className={styles.MobileHeader}>
                    <Title>Pick your side</Title>
                    <Subtitle>You will be contributing points towards the victory of your own team.</Subtitle>
                  </div>
                  <div className={styles.CardImageContainer}>
                    <img src={card.image} className={styles.CardImage} width="100%"/>
                  </div>
                  <div className={styles.CardTitle}>{card.title}</div>
                  <Subtitle className={styles.CardSubtitle}>{card.subtitle}</Subtitle>
                  <GreenButton onClick={this.submitMobile.bind(card.value)}>{card.buttonLabel}</GreenButton>
                </Center>
              </SlideDeck.Slide>
            )}
          </SlideDeck>
        </div>
      );
    } else {
      const initialOffset = 100;
      const defaultStyles = cards.map(test => {return {offset: 0}});
      const calculateStyle = previousStyles => previousStyles.map((_, i) => {
        return i === 0 ? {offset: spring(initialOffset)} : {offset: spring(previousStyles[i - 1].offset)};
      });
      return (
        <Center>
          <div className={styles.Header}>
            <Title>Pick your side</Title>
            <Subtitle>You will be contributing points towards the victory of your own team.</Subtitle>
          </div>
          <StaggeredMotion defaultStyles={defaultStyles} styles={calculateStyle}>
            {interpolatingStyles =>
              <Deck>
                {interpolatingStyles.map((style, i) => {
                  const card = cards[i];
                  return <Card
                    key={i}
                    image={card.image}
                    selected={card.value === faction.value}
                    onSelect={this.submit}
                    {...faction}
                    value={card.value}
                    onMouseEnter={this.select.bind(this, card.value)}
                    title={card.title} subtitle={card.subtitle}
                    buttonLabel={card.buttonLabel}
                    style={{opacity: 0.01 * style.offset, transform: `translateY(${initialOffset - style.offset}px)`}}/>
                })}
              </Deck>
            }
          </StaggeredMotion>
        </Center>
      );
    }
  }

  select = (value) => {
    this.props.fields.faction.onChange(value);
  }

  submit = () => {
    this.props.router.push('/signup/complete');
  }

  submitMobile = (value) => {
    this.select(value);
    this.submit();
  }
}

export default reduxForm({
  form: 'signup',
  fields,
  getFormState,
  destroyOnUnmount: false
}, (state) => {
  return {
    initialValues: {
      faction: 'NEUTRAL'
    }
  };
})(withRouter(FactionSelectPage));
