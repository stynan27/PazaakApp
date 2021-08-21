// doubles card value if type is correct
export function doubleCardValue(card) {
  let doubledCard = Object.assign({ cardType: 'basic', cardValue: '1' }, card);
  if (['basic', 'plus', 'minus', '+/- plus', '+/- minus'].includes(card.cardType)) {
    doubledCard.cardValue = doubledCard.cardValue * 2;
  }
  return doubledCard;
}

// flips card type if value in valuesToFlip
export function flipCardTypeByValue(card, valuesToFlip) {
  let flippedCard = Object.assign({ cardType: 'basic', cardValue: '1' }, card);
  if (valuesToFlip.includes(card.cardValue)) {
    if (card.cardType.contains('basic' || 'plus')) {
      flippedCard.cardType = 'minus';
    } else if (card.cardType.contains('minus')){
      flippedCard.cardType = 'plus';
    } else {
      console.error('Wrong cardType for cardValue to be flipped!');
    }
  } else if (card.cardType === 'flip' && !card.previouslyPlayed) {
    // prevent infinite loop
    flippedCard['previouslyPlayed'] = true;
  }

  return flippedCard;
}

// Calculates cumulative score based on cardType/cardValue
export function interpretArrayScore(cardArray) {
  let updatedCardArray = [];
  let score = 0;
  cardArray.map((card, currentIndex, cardArray) => {
    switch(card.cardType) {
      case 'basic':
      case 'plus':
      case '+/- plus':
        return score += parseInt(card.cardValue, 10);
      case 'minus':
      case '+/- minus':
        return score -= parseInt(card.cardValue, 10);
      case 'flip':
        if (!card.previouslyPlayed) {
          const valuesToFlip = card.cardValue.split('&');
          updatedCardArray = cardArray.map((oldCard) => flipCardTypeByValue(oldCard, valuesToFlip));
        }
        return score;
      case 'double':
        // TODO: function to return updated array which doubles previously played card
        updatedCardArray = cardArray.map((oldCard, index) => {
          if (index-1 >= 0) {
            if  (index === currentIndex-1){
              // double previous card value
              return doubleCardValue(oldCard);
            } else {
              return oldCard;
            }
          }
        });
        return score;
      // TODO: tiebreaker acts similarly to +/-1 in terms of score, wins on ties
      // case 'tiebreaker':
      //   return score += parseInt(card.cardValue, 10);
      default:
        return score;
    }
  });
  updatedCardArray.push(score);
  return updatedCardArray;
}

// Fisher-Yates (Knuth) Shuffle
export function shuffleDeck(cardDeck) {
  let currentIndex = cardDeck.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [cardDeck[currentIndex], cardDeck[randomIndex]] = [
      cardDeck[randomIndex], cardDeck[currentIndex]];
  }

  return cardDeck;
}