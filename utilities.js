export const deck = {
  decklist: [
    1,2,3,4,5,6,7,8,9,10,11,12,13,
    14,15,16,17,18,19,20,21,22,23,24,25,26,
    27,28,29,30,31,32,33,34,35,36,37,38,39,
    40,41,42,43,44,45,46,47,48,49,50,51,52
  ],
  cards: [],
  shuffle: function( array ){
    let result = array.map(x => x);
    let newIndex = 0;
    let shuffle_count = 0;
    do{
      let shuffled = [];
      for( let count = 0; count < array.length; count ++){
        newIndex = Math.round(Math.random() * (result.length - 1))
        shuffled.push(result[newIndex]);
        result.splice(newIndex, 1);
      }
      result = shuffled.map(x => x);
      shuffle_count++;
    } while( shuffle_count < 7 )
    return result;
  },
}

export const players = [
  {
    name: 'Human',
    hand: []
  },
  {
    name: "Computer",
    hand: []
  }
];

export class Player {
  constructor(name, hand){
    this.name = name;
    this.hand = hand;
  }

}