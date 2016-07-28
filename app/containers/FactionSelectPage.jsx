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
import {FontIcon} from 'material-ui';

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = !!md.mobile();

export const fields = ['name', 'email', 'password', 'faction'];

class FactionSelectPage extends React.Component {
  render() {
    return (
      <Page>
        {this.getContent()}
      </Page>
    );
  }

  getContent = () => {
    const orderCard = {value: 'ORDER', image: orderImage, title: "Order", subtitle: "Collect points to maintain order.", buttonLabel: "Maintain order"};
    const neutralCard = {value: 'NEUTRAL', image: neutralImage, title: "Balance", subtitle: "Collect points for fun.", buttonLabel: "Seek balance"};
    const chaosCard = {value: 'CHAOS', image: chaosImage, title: "Chaos", subtitle: "Collect points to cause chaos.", buttonLabel: "Create chaos"};

    const {
      fields: {faction}
    } = this.props;
    const slideDeckState = {horizontal: true, swipe: true};

    if (isMobile) {
      const cards = [
        neutralCard,
        orderCard,
        chaosCard
      ];
      const deckIndex = cards.findIndex((card) => card.value === faction.value);
      const iconStyle = {display: 'block', fontSize: 30, width: 30, height: 30};
      const iconColor = "white";
      return (
        <div className={styles.MobileContainer}>
          <div className={styles.MobileHeader}>
            <div className={styles.MobileHeaderContainer}>
              <Title style={{color: 'white'}}>Pick your side</Title>
              <Subtitle style={{color: '#cdcdcd'}}>You will be contributing points towards the victory of your own team.</Subtitle>
            </div>
          </div>
          <div className={styles.MobileContent}>
            <a className={styles.DeckNavPrev} onClick={() => deckIndex > 0 && faction.onChange(cards[deckIndex - 1].value)}>
              <span className={styles.DeckNavIcon}><FontIcon className="material-icons" style={iconStyle} color={iconColor}>keyboard_arrow_left</FontIcon></span>
            </a>
            <a className={styles.DeckNavNext} onClick={() => deckIndex < cards.length - 1 && faction.onChange(cards[deckIndex + 1].value)}>
              <span className={styles.DeckNavIcon}><FontIcon className="material-icons" style={iconStyle} color={iconColor}>keyboard_arrow_right</FontIcon></span>
            </a>
            <SlideDeck {...slideDeckState} current={deckIndex}>
              {cards.map((card, i) =>
                <SlideDeck.Slide key={i}>
                  <Center>
                    <div className={styles.CardImageContainer}>
                      <img src={card.image} className={styles.CardImage} width="100%"/>
                    </div>
                    <div className={styles.CardTitle}>{card.title}</div>
                    <Subtitle style={{color: '#eee'}} className={styles.CardSubtitle}>{card.subtitle}</Subtitle>
                    <GreenButton onClick={this.props.handleSubmit}>{card.buttonLabel}</GreenButton>
                  </Center>
                </SlideDeck.Slide>
              )}
            </SlideDeck>
          </div>
          <div className={styles.MobileFooter}>
            <div className={styles.Indicators}>
              {cards.map((card, index) => {
                const className = index === deckIndex ? styles.IndicatorActive : styles.IndicatorNormal;
                return <div className={className}></div>;
              })}
            </div>
          </div>
        </div>
      );
    } else {
      const cards = [
        orderCard,
        neutralCard,
        chaosCard
      ];
      const initialOffset = 100;
      const defaultStyles = cards.map(test => {return {offset: 0}});
      const calculateStyle = previousStyles => previousStyles.map((_, i) => {
        return i === 0 ? {offset: spring(initialOffset)} : {offset: spring(previousStyles[i - 1].offset)};
      });

      return (
        <Center>
          <div className={styles.Header}>
            <Title style={{color: 'white'}}>Pick your side</Title>
            <Subtitle style={{color: '#eee'}}>You will be contributing points towards the victory of your own team.</Subtitle>
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
                    onSelect={this.props.handleSubmit}
                    {...faction}
                    value={card.value}
                    onMouseOver={() => this.select(card.value)}
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
    if (this.props.fields.faction.value !== value) {
      this.props.fields.faction.onChange(value);
    }
  }
}

export default withRouter(reduxForm({
  form: 'signup',
  fields,
  getFormState,
  destroyOnUnmount: false,
  initialValues: {
    faction: 'NEUTRAL'
  },
  overwriteOnInitialValuesChange: false
}, null, null, (state, dispatch, props) => {
  return {...state, ...dispatch, ...props, onSubmit: (values) => {
    props.router.push({
      pathname: '/signup/complete',
      query: {faction: values.faction}
    });
  }};
})(FactionSelectPage));
